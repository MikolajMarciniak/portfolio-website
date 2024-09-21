import React, { useState } from "react";
import TypedText from "../components/TypedText";
import { Link } from "react-scroll";

const coloredStrings = [
  { text: "developer.", color: "text-red-500", shadowColor: "#f87171" },
  { text: "teacher.", color: "text-blue-500", shadowColor: "#93c5fd" },
  { text: "designer.", color: "text-purple-500", shadowColor: "#d8b4fe" },
  { text: "freelancer.", color: "text-yellow-500", shadowColor: "#facc15" },
];

const LandingSection = () => {
  const [colorClass, setColorClass] = useState(coloredStrings[0].color);
  const [shadowColor, setShadowColor] = useState(coloredStrings[0].shadowColor);

  const handleStringTyped = (index) => {
    const currentString = coloredStrings[index % coloredStrings.length];
    setColorClass(currentString.color);
    setShadowColor(currentString.shadowColor);
  };

  return (
    <section
      id="landing"
      className="landing-section min-h-screen flex flex-col items-center justify-center"
    >
      <div className="text-center">
        <h1 className="text-7xl inline-block leading-none text-left">
          Hello, I'm&nbsp;
          <Link
            to="about"
            smooth={true}
            duration={500}
            className="font-bold shadow landing link"
            style={{ "--shadow-color-landing": shadowColor }}
          >
            Mikołaj Marciniak
          </Link>
          ,
          <br />
          your next&nbsp;
          <TypedText
            strings={coloredStrings}
            colorClass={colorClass}
            handleStringTyped={handleStringTyped}
          />
        </h1>

        <div className="mt-9 flex flex-row items-center justify-center gap-7">
          <Link to="projects" smooth={true} duration={1000}>
            <button className="text-2xl border-2 border-blue-500 text-blue-500 py-5 px-9 rounded-lg bg-transparent hover:bg-blue-500 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
              My Projects
            </button>
          </Link>
          <Link to="contact" smooth={true} duration={1500}>
            <button className="text-2xl border-2 border-green-500 text-green-500 py-5 px-9 rounded-lg bg-transparent hover:bg-green-500 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500">
              Contact Me
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LandingSection;
