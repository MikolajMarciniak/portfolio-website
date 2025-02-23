import React, { forwardRef } from "react";
import SkillsContainer from "../components/SkillsContainer";
import LazyLoad from "../components/LazyLoad";

const SkillsSection = forwardRef(({ translation, isDarkMode }, ref) => {
  return (
    <section
      ref={ref}
      id="skills"
      className="min-h-screen skills-section bg-[--background-color] flex flex-col relative overflow-x-hidden"
    >
      <div className="relative z-10 py-20 mx-auto w-full max-w-6xl text-center">
        <LazyLoad>
          <h2 className="text-6xl font-semibold">
            <span className="shadow skills text-[--skills-color]">
              {translation.skillstitle}
            </span>
          </h2>
        </LazyLoad>
      </div>
      <div className="w-full">
        <LazyLoad>
          <SkillsContainer
            translation={translation.skills}
            isDarkMode={isDarkMode}
          />
        </LazyLoad>
      </div>
    </section>
  );
});

SkillsSection.displayName = "Skills";
export default SkillsSection;
