"use client";

import { useEffect, useRef, useState, useContext } from "react";
import ScrollToTopButton from "./components/ScrollToTopButton";
import { ParallaxProvider } from "react-scroll-parallax";
import { LocaleContext } from "./components/LocaleProvider";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import LandingSection from "./sections/Landing";
import AboutSection from "./sections/About";
import SkillsSection from "./sections/Skills";
import ProjectsSection from "./sections/Projects";
import ContactSection from "./sections/Contact";
import LoadingSlider from "./components/LoadingSlider";
import { ToastContainer } from "react-toastify";
import CursorShadowEffect from "./hooks/CursorShadowEffect";

export default function Home() {
  const t = useContext(LocaleContext).currentTranslations;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const landingRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  useEffect(() => {
    if (
      !landingRef.current ||
      !aboutRef.current ||
      !skillsRef.current ||
      !projectsRef.current ||
      !contactRef.current
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionColors = {
              landing: "var(--landing-color)",
              about: "var(--about-color)",
              skills: "var(--skills-color)",
              projects: "var(--projects-color)",
              contact: "var(--contact-color)",
            };
            const sectionId = entry.target.id;
            document.documentElement.style.setProperty(
              "--accent-color",
              sectionColors[sectionId],
            );
          }
        });
      },
      { threshold: 0.3 },
    );

    observer.observe(landingRef.current);
    observer.observe(aboutRef.current);
    observer.observe(skillsRef.current);
    observer.observe(projectsRef.current);
    observer.observe(contactRef.current);

    return () => observer.disconnect();
  }, [
    landingRef.current,
    aboutRef.current,
    skillsRef.current,
    projectsRef.current,
    contactRef.current,
  ]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const colors = {
      "--hero-color": isDarkMode
        ? "rgba(0, 0, 0, 0.9)"
        : "rgba(200, 200, 200, 0.6)",
      "--background-color": isDarkMode
        ? "rgba(25, 25, 25, 1)"
        : "rgba(230, 230, 230, 0.95)",
      "--background-color-dark": isDarkMode
        ? "rgba(20, 20, 20, 1)"
        : "rgb(225, 225, 225)",
      "--navbar-color": isDarkMode
        ? "rgba(15, 15, 15, 1)"
        : "rgba(235, 235, 235, 1)",
      "--foreground-color": isDarkMode
        ? "rgb(60, 60, 60)"
        : "rgb(180, 180, 180)",
      "--foreground-color-dark": isDarkMode
        ? "rgb(40, 40, 40)"
        : "rgb(150, 150, 150)",
      "--text-color": isDarkMode
        ? "rgba(225, 225, 225, 1)"
        : "rgba(15, 15, 15, 1)",
    };

    const sectionColors = {
      "--landing-color": isDarkMode
        ? "rgba(239, 68, 68, 1)"
        : "rgba(239, 68, 68, 1)",
      "--about-color": isDarkMode
        ? "rgba(168, 85, 247, 1)"
        : "rgba(168, 85, 247, 1)",
      "--skills-color": isDarkMode
        ? "rgba(0, 155, 160, 1)"
        : "rgba(0, 155, 160, 1)",
      "--projects-color": isDarkMode
        ? "rgba(59, 130, 246, 1)"
        : "rgba(59, 130, 246, 1)",
      "--contact-color": isDarkMode ? "rgb(255, 166, 0)" : "rgb(220, 106, 0)",
    };

    Object.entries({ ...colors, ...sectionColors }).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  return isLoading ? (
    <LoadingSlider />
  ) : (
    <div>
      <main
        className={`${isDarkMode ? "dark" : "light"} home-hero min-h-screen flex flex-col relative`}
      >
        <CursorShadowEffect />
        <Navbar
          translation={t.navbar}
          isScrolled={isScrolled}
          toggleTheme={toggleTheme}
          isDarkMode={isDarkMode}
        />

        <ParallaxProvider>
          <div className="h-full">
            <LandingSection
              ref={landingRef}
              translation={t.landing}
              isDarkMode={isDarkMode}
              isScrolled={isScrolled}
            />
            <AboutSection
              ref={aboutRef}
              translation={t.about}
              isDarkMode={isDarkMode}
            />
            <SkillsSection
              ref={skillsRef}
              translation={t.skills}
              isDarkMode={isDarkMode}
            />
            <ProjectsSection
              ref={projectsRef}
              translation={t.projects}
              isDarkMode={isDarkMode}
            />
            <ContactSection ref={contactRef} translation={t.contact} />
            <Footer translation={t.footer} isDarkMode={isDarkMode} />
          </div>
        </ParallaxProvider>
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
          style={{ color: "var(--text-color)" }}
        />
        <ScrollToTopButton isDarkMode={isDarkMode} isScrolled={isScrolled} />
      </main>
    </div>
  );
}
