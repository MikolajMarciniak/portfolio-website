const fs = require("fs");
const path = require("path");

const compareLocalization = (
  enObj,
  compareObj,
  path = "",
  missingKeys = [],
) => {
  if (!compareObj) {
    missingKeys.push(path);
    return missingKeys;
  }

  Object.keys(enObj).forEach((key) => {
    const currentPath = path ? `${path}.${key}` : key;

    if (typeof enObj[key] === "object" && !Array.isArray(enObj[key])) {
      compareLocalization(
        enObj[key],
        compareObj[key],
        currentPath,
        missingKeys,
      );
    } else if (!(key in compareObj)) {
      missingKeys.push(currentPath);
    }
  });

  return missingKeys;
};

const loadLocalizations = (localesDir) => {
  const absoluteLocalesDir = path.resolve(localesDir);
  const files = fs.readdirSync(absoluteLocalesDir);
  const localizations = {};

  files.forEach((file) => {
    if (file.endsWith(".json")) {
      const fileName = path.basename(file, ".json");
      const filePath = path.join(absoluteLocalesDir, file);
      localizations[fileName] = require(filePath);
    }
  });

  return localizations;
};

const runLocalizationTest = (localesDir) => {
  const localizations = loadLocalizations(localesDir);

  const enLocalization = localizations["en"];
  const missingKeysByLocale = {};

  Object.keys(localizations).forEach((locale) => {
    if (locale !== "en") {
      const missingKeys = compareLocalization(
        enLocalization,
        localizations[locale],
      );
      if (missingKeys.length > 0) {
        missingKeysByLocale[locale] = missingKeys;
      }
    }
  });

  if (Object.keys(missingKeysByLocale).length > 0) {
    console.log("Missing keys in other localizations:");
    Object.keys(missingKeysByLocale).forEach((locale) => {
      console.log(`\nFor locale: ${locale}`);
      missingKeysByLocale[locale].forEach((key) => {
        console.log(`- ${key}`);
      });
    });
  } else {
    console.log("No missing keys in any localization.");
  }
};

const localesDir = process.argv[2] || "./public/locales";

runLocalizationTest(localesDir);
