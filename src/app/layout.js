import React from "react";
import fs from "fs";
import path from "path";
import { LocaleProvider } from "./components/LocaleProvider";

import "./styles/globals.css";

export const metadata = {
  title: "Mikolaj Marciniak",
  description: "Freelance full stack developer for hire, ",
};

async function getTranslations(locale) {
  try {
    const translationsPath = path.resolve(
      "public",
      "locales",
      `${locale}.json`,
    );
    const translations = JSON.parse(fs.readFileSync(translationsPath, "utf8"));
    return translations;
  } catch (error) {
    console.error(
      `Translation file for ${locale} not found. Falling back to 'en'.`,
    );
    const fallbackTranslationsPath = path.resolve(
      "public",
      "locales",
      "en.json",
    );
    return JSON.parse(fs.readFileSync(fallbackTranslationsPath, "utf8"));
  }
}

export default async function RootLayout({ children }) {
  const defaultLocale =
    typeof window !== "undefined" ? navigator.language.split("-")[0] : "en";
  const translations = await getTranslations(defaultLocale);

  return (
    <html lang={defaultLocale} suppressHydrationWarning>
      <head>
        <link rel="preload" href="./images/banner.jpg" as="image" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link
          key={defaultLocale}
          rel="preload"
          href={`/icons/flags/${defaultLocale.split("-")[0]}.svg`}
          as="image"
        />
      </head>
      <body>
        <LocaleProvider
          defaultLocale={defaultLocale}
          translations={translations}
        >
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
