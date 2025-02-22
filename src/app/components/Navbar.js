"use client";

import React from "react";
import { Link as ScrollLink } from "react-scroll";
import { LanguageSwitcher } from "./LanguageSwitcher";

const Navbar = ({ translation, toggleTheme, isDarkMode, isScrolled }) => {
  return (
    <nav
      className={`fixed top-0 left-0 w-full z-40  transition-all duration-500 ease-in-out ${
        isScrolled
          ? "shadow-lg py-2 bg-[var(--background-color)]"
          : "py-4 bg-transparent"
      }`}
    >
      <div className="container mx-auto max-w-6xl flex justify-between items-center py-2">
        <ScrollLink
          to="landing"
          smooth={true}
          duration={500}
          className="cursor-pointer "
        >
          <div className=" text-3xl font-bold hover:text-[var(--accent-color)] text-[var(--text-color)]">
            <span className="transition-all duration-500 ease-in-out text-[var(--accent-color)]">
              M
            </span>
            <span className=" transition-all duration-500 ease-in-out ">
              arciniakM
            </span>
          </div>
        </ScrollLink>

        <div className="flex items-center space-x-6 font-semibold">
          <LanguageSwitcher />
          <ScrollLink
            to="about"
            smooth={true}
            offset={-100}
            duration={500}
            className="text-lg text-[var(--text-color)] cursor-pointer relative group hover:text-[var(--about-color)]"
          >
            {translation.about}
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[var(--about-color)] transition-all duration-300 group-hover:w-full"></span>
          </ScrollLink>
          <ScrollLink
            to="projects"
            smooth={true}
            offset={-100}
            duration={500}
            className="text-lg text-[var(--text-color)] cursor-pointer relative group hover:text-[var(--projects-color)]"
          >
            {translation.projects}
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[var(--projects-color)] transition-all duration-300 group-hover:w-full"></span>
          </ScrollLink>
          <ScrollLink
            to="contact"
            smooth={true}
            offset={-76}
            duration={500}
            className="text-lg text-[var(--text-color)] cursor-pointer relative group hover:text-[var(--contact-color)]"
          >
            {translation.contact}
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[var(--contact-color)] transition-all duration-300 group-hover:w-full"></span>
          </ScrollLink>
          <button
            onClick={toggleTheme}
            className={`transition-transform transform hover:scale-125 focus:outline-none relative w-10 h-10 flex items-center justify-center transition-all round dark-mode-button toggle ${
              isDarkMode ? "dark" : "light"
            }`}
          >
            {isDarkMode ? (
              <svg
                className="w-6 h-6"
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="-1 0 19 16"
                height="200px"
                width="200px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"
                  stroke="black"
                  strokeWidth="1"
                ></path>
                <path
                  stroke="black"
                  strokeWidth="1"
                  d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.73 1.73 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.73 1.73 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.73 1.73 0 0 0 1.097-1.097zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z"
                ></path>
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                stroke="currentColor"
                fill="currentColor"
                viewBox="0 0 16 16"
                height="200px"
                width="200px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke="white"
                  strokeWidth="0.05"
                  d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"
                ></path>
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
