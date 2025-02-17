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

async function translateFile(filePath, localesDir) {
  const enFilePath = path.join(localesDir, filePath);

  if (!fs.existsSync(enFilePath)) {
    console.error(`Error: File ${enFilePath} not found.`);
    process.exit(1);
  }

  const enData = JSON.parse(fs.readFileSync(enFilePath, "utf8"));

  for (const { code } of languages) {
    if (code === "en") continue;

    console.log(`Translating to ${code}...`);
    const translatedData = await translateObject(enData, code);

    const outputFilePath = path.join(localesDir, `${code}.json`);
    fs.writeFileSync(outputFilePath, JSON.stringify(translatedData, null, 2));
    console.log(`✅ Saved: ${outputFilePath}`);
  }

  console.log("All translations completed!");
}

const args = process.argv.slice(2);
if (args.length !== 2) {
  console.error("Usage: node translate.js <file> <locales_dir>");
  process.exit(1);
}

const [file, localesDir] = args;
translateFile(file, localesDir);
