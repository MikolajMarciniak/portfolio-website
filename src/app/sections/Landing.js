import React, { useState, forwardRef } from "react";
import TypedText from "../components/TypedText";
import { Link } from "react-scroll";
import LazyLoad from "../components/LazyLoad";
import ScrollDownButton from "../components/ScrollDownButton";

const LandingSection = forwardRef(
  ({ translation, isDarkMode, isScrolled }, ref) => {
    const coloredStrings = [
      {
        text: translation.strings[0] || "Fullstack Developer.",
        colorVar: "--landing-color",
      },
      {
        text: translation.strings[1] || "Git Guru.",
        colorVar: "--about-color",
      },
      {
        text: translation.strings[2] || "Freelancer.",
        colorVar: "--projects-color",
      },
      {
        text: translation.strings[3] || "Based in the UK.",
        colorVar: "--contact-color",
      },
    ];

    const [colorClass, setColorClass] = useState(coloredStrings[0].colorVar);

    const handleStringTyped = (index) => {
      const currentString = coloredStrings[index % coloredStrings.length];
      setColorClass(currentString.colorVar);
    };

    return (
      <section
        ref={ref}
        id="landing"
        className="landing-section min-h-screen flex flex-col justify-between items-center shadow-2xl"
      >
        <div className="text-center max-w-6xl flex-grow flex flex-col justify-center">
          <h1 className="text-7xl inline-block leading-none text-left mt-[100px]">
            {translation.hero}
            <Link
              to="about"
              smooth={true}
              duration={500}
              offset={-70}
              className="cursor-pointer font-bold hover:text-[--shadow-color] shadow landing link"
              style={{
                "--shadow-color": `var(${colorClass})`,
              }}
            >
              {"  "}
              <span className="ml-4 text-7xl">MIKOŁAJ MARCINIAK</span>
            </Link>
            .
            <br />
            <TypedText
              strings={coloredStrings}
              colorClass={colorClass}
              handleStringTyped={handleStringTyped}
            />
          </h1>
        </div>
        <div className="mb-10">
          <ScrollDownButton isScrolled={isScrolled} isDarkMode={isDarkMode} />
        </div>
      </section>
    );
  },
);

LandingSection.displayName = "Landing";
export default LandingSection;
