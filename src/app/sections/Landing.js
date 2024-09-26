import React, { useState, forwardRef } from "react";
import TypedText from "../components/TypedText";
import { Link } from "react-scroll";
import ScrollDownButton from "../components/ScrollDownButton";

const coloredStrings = [
  {
    text: "Fullstack Developer.",
    colorVar: "--landing-color",
  },
  {
    text: "Git Guru.",
    colorVar: "--about-color",
  },
  {
    text: "Freelancer.",
    colorVar: "--projects-color",
  },
  {
    text: "Based in the UK.",
    colorVar: "--contact-color",
  },
];

const LandingSection = forwardRef(({ isDarkMode, isScrolled }, ref) => {
  const [colorClass, setColorClass] = useState(coloredStrings[0].colorVar);

  const handleStringTyped = (index) => {
    const currentString = coloredStrings[index % coloredStrings.length];
    setColorClass(currentString.colorVar);
  };

  return (
    <section
      ref={ref}
      id="landing"
      className="landing-section min-h-screen flex flex-col justify-between items-center"
    >
      <div className="text-center flex-grow flex flex-col justify-center">
        <h1 className="text-7xl inline-block leading-none text-left mt-[100px]">
          Hello, I'm&nbsp;
          <Link
            to="about"
            smooth={true}
            duration={500}
            offset={-100}
            className="font-bold shadow landing link"
            style={{
              "--shadow-color": `var(${colorClass})`,
            }}
          >
            Mikołaj Marciniak
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
});

export default LandingSection;
