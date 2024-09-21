"use client";

import { useEffect, useRef, useState } from "react";
import { useSpotlightEffect } from "./hooks/useSpotlightEffect";
import Navbar from "./components/Navbar";
import LandingSection from "./sections/Landing";
import AboutSection from "./sections/About";
import ProjectsSection from "./sections/Projects";
import ContactSection from "./sections/Contact";

export default function Home() {
  const ref = useRef(null);
  const { initialAnimationDone } = useSpotlightEffect(ref);
  const spotlightClass = initialAnimationDone ? "" : "animation";

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      return savedTheme
        ? savedTheme === "dark"
        : window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return true;
  });

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
    const newTheme = !isDarkMode ? "dark" : "light";
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", newTheme);
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
      </main>
    </div>
  );
}
