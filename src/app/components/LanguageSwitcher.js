"use client";

import React, { useContext, useState, useEffect, useRef } from "react";
import { LocaleContext } from "./LocaleProvider";
import languages from "../data/languageData";

export function LanguageSwitcher() {
  const { currentLocale, switchLanguage } = useContext(LocaleContext);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const switcherRef = useRef(null);

  const selectedLanguage = languages.find(
    (lang) => lang.code.split("-")[0] === currentLocale,
  );

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
    <div className="relative text-left" ref={switcherRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 border border-[--text-color] rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 "
      >
        <img
          src={`/icons/flags/${selectedLanguage.code}.svg`}
          alt={selectedLanguage.label}
          className="w-5 h-5"
        />
        <span>{selectedLanguage.label}</span>
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-48 bg-[--foreground-color] border border-[--text-color] rounded-md shadow-lg max-h-60 overflow-y-auto">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search languages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border-b border-[--text-color] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[--foreground-color] placeholder-[--text-color]"
          />

          {/* Language Options */}
          {filteredLanguages
            .sort((a, b) => a.label.localeCompare(b.label))
            .map((language) => (
              <button
                key={language.code}
                onClick={() => {
                  switchLanguage(language.code);
                  setIsOpen(false);
                  setSearchQuery("");
                }}
                className="flex items-center space-x-2 px-4 py-2 w-full text-left hover:bg-gray-500"
              >
                <img
                  src={`/icons/flags/${language.code.split("-")[0]}.svg`}
                  alt={language.label}
                  className="w-5 h-5"
                />
                <span>{language.label}</span>
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
