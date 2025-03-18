import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import languages from "./src/app/data/languageData.js";

async function translateText(text, targetLang) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
  const response = await fetch(url);
  const data = await response.json();
  return data[0].map((item) => item[0]).join("");
}

async function translateObject(obj, targetLang) {
  if (typeof obj === "string") {
    return await translateText(obj, targetLang);
  } else if (Array.isArray(obj)) {
    return await Promise.all(
      obj.map((item) => translateObject(item, targetLang)),
    );
  } else if (typeof obj === "object") {
    const newObj = {};
    for (const key in obj) {
      newObj[key] = await translateObject(obj[key], targetLang);
    }
    return newObj;
  }
  return obj;
}

function syncLocalization(enObj, compareObj) {
  const missingKeys = {};
  const cleanedObj = {};

  function processKeys(source, target, result, path = "") {
    for (const key in source) {
      const currentPath = path ? `${path}.${key}` : key;
      if (key in target) {
        if (typeof source[key] === "object" && !Array.isArray(source[key])) {
          result[key] = {};
          processKeys(source[key], target[key], result[key], currentPath);
        } else {
          result[key] = target[key];
        }
      } else {
        missingKeys[currentPath] = source[key];
      }
    }
  }

  processKeys(enObj, compareObj, cleanedObj);
  return { cleanedObj, missingKeys };
}

async function translateMissingFiles(filePath, localesDir) {
  const enFilePath = path.join(localesDir, filePath);

  if (!fs.existsSync(enFilePath)) {
    console.error(`❌ Error: Source file ${enFilePath} not found.`);
    process.exit(1);
  }

  const enData = JSON.parse(fs.readFileSync(enFilePath, "utf8"));

  const missingLanguages = languages
    .map(({ code }) => code)
    .filter(
      (code) =>
        code !== "en" && !fs.existsSync(path.join(localesDir, `${code}.json`)),
    );

  if (missingLanguages.length === 0) {
    console.log(
      "✅ All translation files are up to date. No missing languages.",
    );
    return;
  }

  console.log(
    `🚀 Missing translations found for: ${missingLanguages.join(", ")}`,
  );

  for (const targetLang of missingLanguages) {
    console.log(`🌍 Translating ${filePath} to ${targetLang}...`);

    const translatedData = await translateObject(enData, targetLang);
    const outputFilePath = path.join(localesDir, `${targetLang}.json`);

    fs.writeFileSync(outputFilePath, JSON.stringify(translatedData, null, 2));
    console.log(`✅ Saved: ${outputFilePath}`);
  }

  console.log("🎉 All missing translations have been generated!");
}

async function translateMissingKeys(filePath, localesDir) {
  const enFilePath = path.join(localesDir, filePath);

  if (!fs.existsSync(enFilePath)) {
    console.error(`❌ Error: Source file ${enFilePath} not found.`);
    process.exit(1);
  }

  const enData = JSON.parse(fs.readFileSync(enFilePath, "utf8"));

  for (const { code } of languages) {
    if (code === "en") continue;

    const outputFilePath = path.join(localesDir, `${code}.json`);
    if (!fs.existsSync(outputFilePath)) {
      console.log(`❌ Skipping ${code}, file is missing.`);
      continue;
    }

    let existingTranslation = JSON.parse(
      fs.readFileSync(outputFilePath, "utf8"),
    );
    const { cleanedObj, missingKeys } = syncLocalization(
      enData,
      existingTranslation,
    );

    if (Object.keys(missingKeys).length === 0) {
      console.log(`✅ No missing keys for ${code}.`);
      continue;
    }

    console.log(`🔄 Translating missing keys for ${code}...`);
    for (const key in missingKeys) {
      const keyPath = key.split(".");
      let tempObj = cleanedObj;
      while (keyPath.length > 1) {
        const part = keyPath.shift();
        tempObj[part] = tempObj[part] || {};
        tempObj = tempObj[part];
      }
      tempObj[keyPath[0]] = await translateText(missingKeys[key], code);
    }

    fs.writeFileSync(outputFilePath, JSON.stringify(cleanedObj, null, 2));
    console.log(`✅ Updated missing keys in: ${outputFilePath}`);
  }

  console.log("🎉 All missing keys have been translated!");
}

const args = process.argv.slice(2);
if (args.length < 2 || args.length > 3) {
  console.error("Usage: node translate.js <file> <locales_dir> [checkMissing]");
  process.exit(1);
}

const [file, localesDir, checkMissingArg] = args;
const checkMissing = checkMissingArg === "true";

if (checkMissing) {
  translateMissingKeys(file, localesDir);
} else {
  translateMissingFiles(file, localesDir);
}
