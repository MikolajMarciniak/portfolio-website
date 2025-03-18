/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useContext, useState, useEffect, useRef } from "react";
import { LocaleContext } from "./LocaleProvider";
import languages from "../data/languageData";

export function LanguageSwitcher({
  translation = { search: "Search...", results: "No results found" },
}) {
  const { currentLocale, switchLanguage } = useContext(LocaleContext);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const switcherRef = useRef(null);

  let shortLocale = "en";

  if (currentLocale) {
    if (currentLocale.startsWith("zh")) {
      shortLocale = currentLocale === "zh-TW" ? "zh-TW" : "zh-CN";
    } else {
      shortLocale = currentLocale.split("-")[0];
    }
  }

  const selectedLanguage = languages.find((lang) => lang.code === shortLocale);
  const filteredLanguages = languages.filter((language) =>
    language.label.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (switcherRef.current && !switcherRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="language-switcher relative text-left" ref={switcherRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group hover:font-bold text-lg font-semibold transition-all duration-300 flex w-36 items-center space-x-2 px-4 py-2 border border-[--text-color] rounded-sm text-sm font-semibold focus:outline-none hover:border-[--accent-color] focus:border-[--accent-color] "
      >
        <img
          width={20}
          height={20}
          src={`/icons/flags/${shortLocale}.svg`}
          alt={selectedLanguage?.label || "Unknown Language"}
          className="w-5 h-5"
        />
        <span>{selectedLanguage?.label || "Unknown"}</span>
      </button>

      {isOpen && (
        <div className="absolute overflow-x-hidden z-50 mt-3 left-1/2 transform -translate-x-1/2 w-48 bg-[--foreground-color] border border-[--text-color] rounded-sm shadow-lg max-h-60 overflow-y-auto">
          <input
            type="text"
            placeholder={translation.search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 mx-2 max-w-[157px] rounded-sm text-black text-sm focus:outline-none bg-white placeholder-gray-500 sticky top-0"
          />
          {filteredLanguages.length > 0 ? (
            filteredLanguages
              .sort((a, b) => a.label.localeCompare(b.label))
              .map((language) => (
                <button
                  key={language.code}
                  onClick={() => {
                    switchLanguage(language.fullCode);
                    setIsOpen(false);
                    setSearchQuery("");
                  }}
                  className="flex items-center space-x-2 px-4 py-2 w-full text-left hover:bg-gray-500"
                >
                  <img
                    src={`/icons/flags/${language.code}.svg`}
                    alt={language.label}
                    className="w-5 h-5"
                  />
                  <span>{language.label}</span>
                </button>
              ))
          ) : (
            <div className="px-4 py-2 text-[--text-color] text-sm text-center">
              {translation.results}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
