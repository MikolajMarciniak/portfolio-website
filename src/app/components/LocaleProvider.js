"use client";

import React, { useState, useEffect } from "react";

export const LocaleContext = React.createContext();

export function LocaleProvider({ defaultLocale, translations, children }) {
  const getMappedLocale = (locale) => {
    if (locale.startsWith("zh")) {
      if (locale === "zh-CN") return "zh-CN";
      if (locale === "zh-TW") return "zh-TW";
      return "zh-CN";
    }
    return locale.split("-")[0];
  };

  const [currentLocale, setCurrentLocale] = useState(
    getMappedLocale(defaultLocale),
  );
  const [currentTranslations, setCurrentTranslations] = useState(translations);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (!hydrated) {
      const browserLocale = getMappedLocale(navigator.language || "en");

      if (browserLocale !== currentLocale) {
        setCurrentLocale(browserLocale);
      }

      setHydrated(true);
    }
  }, [hydrated, currentLocale]);

  useEffect(() => {
    if (!currentLocale) return;

    async function fetchTranslations() {
      try {
        const response = await fetch(`/locales/${currentLocale}.json`);
        const data = await response.json();

        setCurrentTranslations(data);
      } catch (error) {
        console.error("Error loading translations:", error);
      }
    }

    fetchTranslations();
  }, [currentLocale]);

  const switchLanguage = (newLocale) => {
    setCurrentLocale(getMappedLocale(newLocale));
  };

  return (
    <LocaleContext.Provider
      value={{ currentLocale, currentTranslations, switchLanguage }}
    >
      {children}
    </LocaleContext.Provider>
  );
}
