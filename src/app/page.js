"use client";

import { useEffect, useRef, useState } from "react";
import ScrollToTopButton from "./components/ScrollToTopButton";
import { ParallaxProvider } from "react-scroll-parallax";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import LandingSection from "./sections/Landing";
import AboutSection from "./sections/About";
import ProjectsSection from "./sections/Projects";
import ContactSection from "./sections/Contact";
// import { useSpotlightEffect } from "./hooks/useSpotlightEffect";

export default function Home() {
  const ref = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  // const { initialAnimationDone } = useSpotlightEffect(ref);
  // const isAnimating = initialAnimationDone ? "" : "animation";

  const landingRef = useRef();
  const aboutRef = useRef();
  const projectsRef = useRef();
  const contactRef = useRef();

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 100);
    updateAccentColor();
  };

  const updateAccentColor = () => {
    const sections = [
      { ref: landingRef, color: "var(--landing-color)" },
      { ref: aboutRef, color: "var(--about-color)" },
      { ref: projectsRef, color: "var(--projects-color)" },
      { ref: contactRef, color: "var(--contact-color)" },
    ];

    sections.forEach(({ ref, color }) => {
      const rect = ref.current.getBoundingClientRect();
      if (rect.top >= 0 && rect.top < window.innerHeight) {
        document.documentElement.style.setProperty("--accent-color", color);
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    updateThemeRefs();
  }, [isDarkMode]);

  const updateThemeRefs = () => {
    document.documentElement.style.setProperty(
      "--background-color",
      isDarkMode ? "#080808" : "#FFFFFF"
    );
    document.documentElement.style.setProperty(
      "--text-color",
      isDarkMode ? "#FFFFFF" : "#000000"
    );
    document.documentElement.style.setProperty(
      "--foreground-color",
      isDarkMode ? "#262626" : "#c7c7c7"
    );
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    updateThemeRefs();
  };

  const themeClass = isDarkMode ? "dark" : "light";

  return (
    <div>
      <main
        ref={ref}
        className={`${themeClass} min-h-screen flex flex-col relative`}
      >
        <Navbar
          isScrolled={isScrolled}
          toggleTheme={toggleTheme}
          isDarkMode={isDarkMode}
        />
        <ParallaxProvider>
          <div className="h-full">
            <LandingSection
              ref={landingRef}
              isDarkMode={isDarkMode}
              isScrolled={isScrolled}
            />
            <AboutSection
              ref={aboutRef}
              isDarkMode={isDarkMode}
              className="snap-start h-screen"
            />
            <ProjectsSection
              ref={projectsRef}
              className="snap-start h-screen"
            />
            <ContactSection ref={contactRef} className="snap-start h-screen" />
          </div>
        </ParallaxProvider>
        {/* <div className={`spotlight ${isAnimating} ${themeClass}`} /> */}
        <ScrollToTopButton isDarkMode={isDarkMode} isScrolled={isScrolled} />
        <Footer isDarkMode={isDarkMode} />
      </main>
    </div>
  );
}
