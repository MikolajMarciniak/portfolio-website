"use client";

import { useEffect, useRef, useState } from "react";
import { useSpotlightEffect } from "./hooks/useSpotlightEffect";

import ScrollToTopButton from "./components/ScrollToTopButton";
import Navbar from "./components/Navbar";
import LandingSection from "./sections/Landing";
import AboutSection from "./sections/About";
import ProjectsSection from "./sections/Projects";
import ContactSection from "./sections/Contact";

export default function Home() {
  const ref = useRef(null);
  const { initialAnimationDone } = useSpotlightEffect(ref);
  const spotlightClass = initialAnimationDone ? "" : "animation";

  // Default to dark mode
  const [isDarkMode, setIsDarkMode] = useState(true);

  const updateThemeRefs = () => {
    document.documentElement.style.setProperty(
      "--background-color",
      isDarkMode ? "#000000" : "#ffffff"
    );
    document.documentElement.style.setProperty(
      "--text-color",
      isDarkMode ? "#ffffff" : "#000000"
    );
  };

  useEffect(() => {
    updateThemeRefs();
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    updateThemeRefs();
  };

  return (
    <div>
      <main
        ref={ref}
        className="min-h-screen flex flex-col relative overflow-hidden"
        data-theme={isDarkMode ? "dark" : "light"}
      >
        <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        <div className="mx-auto w-full max-w-6xl">
          <LandingSection />
          <AboutSection />
          <ProjectsSection />
          <ContactSection />
        </div>
        <div className={`spotlight ${spotlightClass}`} />
        <ScrollToTopButton isDarkMode={isDarkMode} />
      </main>
    </div>
  );
}
