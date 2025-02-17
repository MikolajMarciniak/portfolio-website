"use client";

import React, { useState, useEffect } from "react";

export const LocaleContext = React.createContext();

export function LocaleProvider({ defaultLocale, translations, children }) {
  const [currentLocale, setCurrentLocale] = useState(defaultLocale);
  const [currentTranslations, setCurrentTranslations] = useState(translations);

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
    setCurrentLocale(newLocale);
  };

  return (
    <LocaleContext.Provider
      value={{ currentLocale, currentTranslations, switchLanguage }}
    >
      {children}
    </LocaleContext.Provider>
  );
}
