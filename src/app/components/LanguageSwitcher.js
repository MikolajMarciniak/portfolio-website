"use client";

import React, { useContext } from "react";
import { LocaleContext } from "./LocaleProvider";
import languages from "../data/languageData";

export function LanguageSwitcher() {
  const { currentLocale, switchLanguage } = useContext(LocaleContext);

  const handleChange = (event) => {
    switchLanguage(event.target.value);
  };

  return (
    <div className="flex items-center space-x-2">
      <select
        value={currentLocale}
        onChange={handleChange}
        className="px-4 py-2 text-black border border-gray-300 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/*   useEffect(() => {
    icons.forEach((icon) => {
      const img = new Image();
      img.src = `/icons/tech/${icon.name}.svg`;
    });
    
    */
