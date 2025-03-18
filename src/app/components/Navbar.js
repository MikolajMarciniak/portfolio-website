"use client";

import React, { useState, useEffect, useRef } from "react";
import { Link as ScrollLink } from "react-scroll";
import { LanguageSwitcher } from "./LanguageSwitcher";
import DarkModeSelector from "./DarkModeSelector";

const Navbar = ({ translation, toggleTheme, isDarkMode, isScrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false);
  const focusedIndex = useRef(0);
  const menuRef = useRef(null);

  const handleKeyDown = (event) => {
    if (isMenuOpen) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }

      const focusableElements =
        menuRef.current?.querySelectorAll("a, button  ");

      if (event.key === "Enter") {
        focusableElements[focusedIndex.current]?.click();
        event.preventDefault();
      }

      if (focusableElements?.length) {
        if (
          ["ArrowRight", "ArrowDown"].includes(event.key) ||
          (event.key === "Tab" && !event.shiftKey)
        ) {
          event.preventDefault();
          let nextIndex = focusedIndex.current + 1;
          if (nextIndex >= focusableElements.length) nextIndex = 0;
          if (nextIndex < 0) nextIndex = focusableElements.length - 1;
          focusableElements[nextIndex]?.focus();
          focusedIndex.current = nextIndex;
        }

        if (
          ["ArrowLeft", "ArrowUp"].includes(event.key) ||
          (event.key === "Tab" && event.shiftKey)
        ) {
          event.preventDefault();
          let prevIndexFixed = focusedIndex.current - 1;
          if (prevIndexFixed >= focusableElements.length) prevIndexFixed = 0;
          if (prevIndexFixed < 0) prevIndexFixed = focusableElements.length - 1;
          focusableElements[prevIndexFixed]?.focus();
          focusedIndex.current = prevIndexFixed;
        }
      }
    }
  };

  const handleResize = () => {
    if (window.innerWidth < 1280) {
      setShowHamburger(true);
    } else {
      setShowHamburger(false);
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);
    if (isMenuOpen) {
      const focusableElements = menuRef.current?.querySelectorAll("a, button");
      if (focusableElements?.length) {
        focusedIndex.current = focusableElements.length - 1;
        focusableElements[focusableElements.length - 1]?.focus();
      }
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ease-in-out ${
        isScrolled
          ? "shadow-lg py-2 bg-[var(--navbar-color)]"
          : "py-4 bg-transparent"
      }`}
    >
      <div className=" mx-auto max-w-6xl flex justify-between items-center py-2 px-4">
        <ScrollLink
          to="landing"
          smooth={true}
          duration={500}
          className="cursor-pointer"
        >
          <div className="text-2xl sm:text-3xl font-bold text-[var(--text-color)] hover:text-[var(--accent-color)]">
            <span className="text-[var(--accent-color)] transition-all duration-500 ease-in-out">
              M
            </span>
            <span className="transition-all duration-500 ease-in-out">
              arciniakM
            </span>
          </div>
        </ScrollLink>

        <div className="hidden xl:flex items-center sm:space-x-6 space-x-0 font-semibold">
          <LanguageSwitcher translation={translation.language} />
          <ScrollLink
            to="about"
            smooth={true}
            offset={0}
            duration={500}
            className="text-lg text-[--text-color] cursor-pointer relative group hover:text-[--about-color] transition-all"
          >
            {translation.about}
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[--about-color] transition-all duration-300 group-hover:w-full" />
          </ScrollLink>

          <ScrollLink
            to="skills"
            smooth={true}
            offset={0}
            duration={500}
            className="text-lg text-[--text-color] cursor-pointer relative group hover:text-[--skills-color] transition-all"
          >
            {translation.skills}
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[--skills-color] transition-all duration-300 group-hover:w-full" />
          </ScrollLink>

          <ScrollLink
            to="projects"
            smooth={true}
            offset={-80}
            duration={500}
            className="text-lg text-[--text-color] cursor-pointer relative group hover:text-[--projects-color] transition-all"
          >
            {translation.projects}
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[--projects-color] transition-all duration-300 group-hover:w-full" />
          </ScrollLink>

          <ScrollLink
            to="contact"
            smooth={true}
            offset={330}
            duration={500}
            className="text-lg text-[--text-color] cursor-pointer relative group hover:text-[--contact-color] transition-all"
          >
            {translation.contact}
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[--contact-color] transition-all duration-300 group-hover:w-full" />
          </ScrollLink>

          <DarkModeSelector toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        </div>
        {showHamburger && (
          <div className="sm:block hidden ml-auto mr-6">
            <LanguageSwitcher translation={translation.search} />
          </div>
        )}
        <button
          className={` xl:hidden flex flex-col z-50 items-center justify-center space-y-1 w-10 h-10 mr-1 transition-all duration-500 ease-in-out transform ${
            showHamburger
              ? "translate-x-0 opacity-100"
              : "translate-x-10 opacity-0"
          }`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div
            className={`bg-[--text-color] h-1 w-8 transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <div
            className={`bg-[--text-color] h-1 w-8  transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`}
          />
          <div
            className={`bg-[--text-color] h-1 w-8  transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      <div
        className={`fixed top-0 left-0 w-full h-screen bg-[var(--navbar-color)] flex flex-col items-center justify-center transition-transform duration-500 ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        ref={menuRef}
      >
        <div className="sm:hidden block mb-4">
          <LanguageSwitcher translation={translation.search} tabIndex={0} />
        </div>
        <ScrollLink
          to="landing"
          smooth={true}
          offset={-50}
          duration={500}
          className="text-3xl py-8 font-bold text-[--text-color] w-full text-center py-4 cursor-pointer transition-all 
    hover:text-[--navbar-color] hover:bg-[--landing-color] 
    focus:text-[--navbar-color] focus:bg-[--landing-color] outline-none"
          onClick={() => setIsMenuOpen(false)}
          tabIndex={0}
        >
          {translation.landing}
        </ScrollLink>

        <ScrollLink
          to="about"
          smooth={true}
          offset={-50}
          duration={500}
          className="text-3xl py-8 font-bold text-[--text-color] w-full text-center py-4 cursor-pointer transition-all 
    hover:text-[--navbar-color] hover:bg-[--about-color] 
    focus:text-[--navbar-color] focus:bg-[--about-color] outline-none"
          onClick={() => setIsMenuOpen(false)}
          tabIndex={0}
        >
          {translation.about}
        </ScrollLink>

        <ScrollLink
          to="skills"
          smooth={true}
          offset={-80}
          duration={500}
          className="text-3xl py-8 font-bold text-[--text-color] w-full text-center py-4 cursor-pointer transition-all 
    hover:text-[--navbar-color] hover:bg-[--skills-color] 
    focus:text-[--navbar-color] focus:bg-[--skills-color] outline-none"
          onClick={() => setIsMenuOpen(false)}
          tabIndex={0}
        >
          {translation.skills}
        </ScrollLink>

        <ScrollLink
          to="projects"
          smooth={true}
          offset={-50}
          duration={500}
          className="text-3xl py-8 font-bold text-[--text-color] w-full text-center py-4 cursor-pointer transition-all 
    hover:text-[--navbar-color] hover:bg-[--projects-color] 
    focus:text-[--navbar-color] focus:bg-[--projects-color] outline-none"
          onClick={() => setIsMenuOpen(false)}
          tabIndex={0}
        >
          {translation.projects}
        </ScrollLink>

        <ScrollLink
          to="contact"
          smooth={true}
          offset={330}
          duration={500}
          className="  mb-4  text-3xl py-8 font-bold text-[--text-color] w-full text-center py-4 cursor-pointer transition-all 
    hover:text-[--navbar-color] hover:bg-[--contact-color] 
    focus:text-[--navbar-color] focus:bg-[--contact-color] outline-none"
          onClick={() => setIsMenuOpen(false)}
          tabIndex={0}
        >
          {translation.contact}
        </ScrollLink>

        <DarkModeSelector
          large={true}
          toggleTheme={toggleTheme}
          isDarkMode={isDarkMode}
          tabIndex={0}
        />
      </div>
    </nav>
  );
};

export default Navbar;
