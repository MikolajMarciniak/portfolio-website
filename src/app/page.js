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
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 100);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isAnimating = initialAnimationDone ? "" : "animation";

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
    document.documentElement.style.setProperty(
      "--foreground-color",
      isDarkMode ? "#0000ff" : "#ff0000"
    );
  };

  useEffect(() => {
    updateThemeRefs();
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    updateThemeRefs();
  };
  const themeClass = isDarkMode ? "dark" : "light";

  return (
    <div>
      <main
        ref={ref}
        className={`${themeClass} min-h-screen flex flex-col relative overflow-hidden`}
      >
        <Navbar
          isScrolled={isScrolled}
          toggleTheme={toggleTheme}
          isDarkMode={isDarkMode}
        />

        <div className="mx-auto w-full max-w-6xl scrollbar-thin scrollbar-thumb-custom scrollbar-track-custom-light hover:scrollbar-thumb-[#059669] active:scrollbar-thumb-emerald-500/50 h-full">
          <LandingSection isDarkMode={isDarkMode} />
          <AboutSection className="snap-start h-screen" />
          <ProjectsSection className="snap-start h-screen" />
          <ContactSection className="snap-start h-screen" />
        </div>

        <div className={`spotlight ${isAnimating} ${themeClass}`} />
        <ScrollToTopButton isDarkMode={isDarkMode} isScrolled={isScrolled} />
      </main>
    </div>
  );
}
