"use client"; // Mark this as a client-side component

import React, { useContext } from "react";
import { LocaleContext } from "./LocaleProvider";

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
        <option value="en">English</option>
        <option value="pl">Polski</option>
        {/* Add more languages as needed */}
      </select>
    </div>
  );
}
