import React, { forwardRef, useRef, useEffect } from "react";
import SkillsContainer from "../components/SkillsContainer";
import CertsContainer from "../components/CertsContainer";
import LazyLoad from "../components/LazyLoad";
import "../styles/skills.css";

const SkillsSection = forwardRef(({ translation, isDarkMode }, ref) => {
  return (
    <section
      ref={ref}
      id="skills"
      className="min-h-screen justify-center skills-section bg-[--background-color] flex flex-col relative overflow-hidden"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className={`${isDarkMode ? "dark" : "light"} pointer-events-none skills-video`}
      >
        <source src="/videos/skillsBackground4.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="relative py-20 mx-auto w-full max-w-6xl text-center skills-content">
        <LazyLoad>
          <h2 className="text-4xl xl:text-5xl 2xl:text-6xl font-bold">
            <span className="shadow skills text-[--skills-color]">
              {translation.skillstitle}
            </span>
          </h2>
        </LazyLoad>
      </div>

      <div className="w-full skills-content px-4 z-20">
        <LazyLoad>
          <SkillsContainer
            translation={translation.skills}
            isDarkMode={isDarkMode}
          />
        </LazyLoad>
        <LazyLoad>
          <CertsContainer translation={translation.certs} />
        </LazyLoad>
      </div>
    </section>
  );
});

SkillsSection.displayName = "Skills";
export default SkillsSection;
