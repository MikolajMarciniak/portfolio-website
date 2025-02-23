"use client";

import React, { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { LanguageSwitcher } from "./LanguageSwitcher";
import DarkModeSelector from "./DarkModeSelector";

const Navbar = ({ translation, toggleTheme, isDarkMode, isScrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1280) {
        setShowHamburger(true);
      } else {
        setShowHamburger(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ease-in-out ${
        isScrolled
          ? "shadow-lg py-2 bg-[var(--navbar-color)]"
          : "py-4 bg-transparent"
      }`}
    >
      <div className="container mx-auto max-w-6xl flex justify-between items-center py-2">
        {/* Logo */}
        <ScrollLink
          to="landing"
          smooth={true}
          duration={500}
          className="cursor-pointer"
        >
          <div className="text-3xl font-bold text-[var(--text-color)] hover:text-[var(--accent-color)]">
            <span className="text-[var(--accent-color)] transition-all duration-500 ease-in-out">
              M
            </span>
            <span className="transition-all duration-500 ease-in-out">
              arciniakM
            </span>
          </div>
        </ScrollLink>

        {/* Desktop Menu */}
        <div className="hidden xl:flex items-center space-x-6 font-semibold">
          <LanguageSwitcher />
          {["about", "skills", "projects", "contact"].map((section) => (
            <ScrollLink
              key={section}
              to={section}
              smooth={true}
              offset={section === "contact" ? 330 : -70}
              duration={500}
              className={`text-lg text-[var(--text-color)] cursor-pointer relative group hover:text-[var(--${section}-color)] hover:bg-[var(--${section}-color)] transition-all`}
            >
              {translation[section]}
              <span
                className={`absolute bottom-0 left-0 w-0 h-[2px] bg-[var(--${section}-color)] transition-all duration-300 group-hover:w-full`}
              />
            </ScrollLink>
          ))}
          <DarkModeSelector toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        </div>

        {/* Hamburger Button - Animated Slide-in */}
        <button
          className={`xl:hidden flex flex-col z-50 items-center justify-center space-y-1 w-10 h-10 transition-all duration-500 ease-in-out transform ${
            showHamburger
              ? "translate-x-0 opacity-100"
              : "translate-x-10 opacity-0"
          }`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div
            className={`h-1 w-8 bg-[var(--text-color)] transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <div
            className={`h-1 w-8 bg-[var(--text-color)] transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`}
          />
          <div
            className={`h-1 w-8 bg-[var(--text-color)] transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      <div
        className={`fixed top-0 left-0 w-full h-screen bg-[var(--navbar-color)] flex flex-col items-center justify-center transition-transform duration-500 ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {["landing", "about", "skills", "projects", "contact"].map(
          (section) => (
            <ScrollLink
              key={section}
              to={section}
              smooth={true}
              offset={section === "contact" ? 330 : -70}
              duration={500}
              className={`${section == "contact" ? "mb-4" : ""} text-3xl py-8 font-bold hover:text-[--navbar-color] text-[--text-color] w-full text-center py-4 cursor-pointer hover:bg-[--${section}-color] transition-all`}
              onClick={() => setIsMenuOpen(false)}
            >
              {translation[section]}
            </ScrollLink>
          ),
        )}
        <DarkModeSelector
          large={true}
          toggleTheme={toggleTheme}
          isDarkMode={isDarkMode}
        />
      </div>
    </nav>
  );
};

export default Navbar;
