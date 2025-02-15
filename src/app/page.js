"use client";

import { useEffect, useRef, useState, useContext } from "react";
import ScrollToTopButton from "./components/ScrollToTopButton";
import { ParallaxProvider } from "react-scroll-parallax";
import { LocaleContext } from "./components/LocaleProvider";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import LandingSection from "./sections/Landing";
import AboutSection from "./sections/About";
import ProjectsSection from "./sections/Projects";
import ContactSection from "./sections/Contact";
import LoadingSlider from "./components/LoadingSlider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import { useSpotlightEffect } from "./hooks/useSpotlightEffect";

export default function Home() {
  const t = useContext(LocaleContext).currentTranslations;
  const ref = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setisDarkMode] = useState(true);
  // const { initialAnimationDone } = useSpotlightEffect(ref);
  // const isAnimating = initialAnimationDone ? "" : "animation";

  const landingRef = useRef();
  const aboutRef = useRef();
  const projectsRef = useRef();
  const contactRef = useRef();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 10);
  }, []);

  const handleScroll = () => {
    updateAccentColor();
  };

  const updateAccentColor = () => {
    const offset = 100;
    const sections = [
      { ref: landingRef, color: "var(--landing-color)", offset: offset },
      { ref: aboutRef, color: "var(--about-color)" },
      { ref: projectsRef, color: "var(--projects-color)" },
      { ref: contactRef, color: "var(--contact-color)" },
    ];

    sections.forEach(({ ref, color, offset = 0 }) => {
      const rect = ref.current.getBoundingClientRect();
      if (rect.top >= offset && rect.top < window.innerHeight) {
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
      isDarkMode ? "#080808" : "#FFFFFF",
    );
    document.documentElement.style.setProperty(
      "--text-color",
      isDarkMode ? "#FFFFFF" : "#000000",
    );
    document.documentElement.style.setProperty(
      "--foreground-color",
      isDarkMode ? "#262626" : "#c7c7c7",
    );
  };

  const toggleTheme = () => {
    setisDarkMode((prev) => !prev);
    updateThemeRefs();
  };

  const themeClass = isDarkMode ? "dark" : "light";

  return isLoading ? (
    <LoadingSlider />
  ) : (
    <div>
      <main
        ref={ref}
        className={`${themeClass} min-h-screen flex flex-col relative`}
      >
        <Navbar
          translation={t.navbar}
          isScrolled={isScrolled}
          toggleTheme={toggleTheme}
          isDarkMode={isDarkMode}
        />
        <ParallaxProvider>
          <div className="h-full">
            <LandingSection
              translation={t.landing}
              ref={landingRef}
              isDarkMode={isDarkMode}
              isScrolled={isScrolled}
            />
            <AboutSection
              translation={t.about}
              ref={aboutRef}
              isDarkMode={isDarkMode}
              className="snap-start h-screen"
            />
            <ProjectsSection
              translation={t.projects}
              ref={projectsRef}
              isDarkMode={isDarkMode}
              className="snap-start h-screen"
            />
            <ContactSection
              translation={t.contact}
              ref={contactRef}
              className="snap-start h-screen"
            />
          </div>
        </ParallaxProvider>
        {/* <div className={`spotlight ${isAnimating} ${themeClass}`} /> */}
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          style={{
            backgroundColor: "var(--foreground-color)",
            color: "var(--text-color)",
          }}
        />
        <ScrollToTopButton isDarkMode={isDarkMode} isScrolled={isScrolled} />
        <Footer translation={t.footer} isDarkMode={isDarkMode} />
      </main>
    </div>
  );
}
