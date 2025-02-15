"use client";

import React, { useState, useEffect } from "react";

export const LocaleContext = React.createContext();

export function LocaleProvider({ translations, children }) {
  const [currentLocale, setCurrentLocale] = useState("en");
  const [currentTranslations, setCurrentTranslations] = useState(translations);

  useEffect(() => {
    const savedLocale =
      localStorage.getItem("locale") ||
      navigator.language.split("-")[0] ||
      "en";
    setCurrentLocale(savedLocale);
  }, []);

  useEffect(() => {
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
    localStorage.setItem("locale", newLocale);
  };

  return (
    <LocaleContext.Provider
      value={{ currentLocale, currentTranslations, switchLanguage }}
    >
      {children}
    </LocaleContext.Provider>
  );
}
