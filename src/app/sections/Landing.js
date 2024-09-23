import React, { useState, forwardRef } from "react";
import TypedText from "../components/TypedText";
import { Link } from "react-scroll";
import ScrollDownButton from "../components/ScrollDownButton";

const coloredStrings = [
  {
    text: "Fullstack Developer.",
    color: "text-red-500",
    shadowColor: "#f87171",
  },
  {
    text: "Git Guru.",
    color: "text-blue-500",
    shadowColor: "#93c5fd",
  },
  { text: "Freelancer.", color: "text-purple-500", shadowColor: "#d8b4fe" },
  {
    text: "Based in the UK.",
    color: "text-yellow-500",
    shadowColor: "#facc15",
  },
];

const LandingSection = forwardRef(({ isDarkMode, isScrolled }, ref) => {
  const [colorClass, setColorClass] = useState(coloredStrings[0].color);
  const [shadowColor, setShadowColor] = useState(coloredStrings[0].shadowColor);

  const handleStringTyped = (index) => {
    const currentString = coloredStrings[index % coloredStrings.length];
    setColorClass(currentString.color);
    setShadowColor(currentString.shadowColor);
  };

  return (
    <section
      ref={ref}
      id="landing"
      className="landing-section min-h-screen flex flex-col justify-between items-center"
    >
      <div className="text-center flex-grow flex flex-col justify-center">
        <h1 className="text-7xl inline-block leading-none text-left">
          Hello, I'm&nbsp;
          <Link
            to="about"
            smooth={true}
            duration={500}
            offset={-100}
            className="font-bold shadow landing link"
            style={{ "--shadow-color-landing": shadowColor }}
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
