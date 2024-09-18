import React, { useState } from 'react';
import TypedText from '../components/TypedText';

const coloredStrings = [
  { text: "developer", color: "text-red-500", shadowColor: "#f87171" },
  { text: "teacher", color: "text-blue-500", shadowColor: "#93c5fd" },
  { text: "designer", color: "text-purple-500", shadowColor: "#d8b4fe" },
  { text: "freelancer", color: "text-yellow-500", shadowColor: "#facc15" },
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
    <section className="landing-section min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-7xl font-bold">
          Hello, I'm <span className="shadow landing" style={{ "--shadow-color-landing": shadowColor }}>Mikołaj Marciniak</span>,
        </h1>
        <div className="mt-6">
          <p className="text-4xl mt-4 text-white inline-block leading-none">
            and I'm a <TypedText strings={coloredStrings} colorClass={colorClass} handleStringTyped={handleStringTyped} />
          </p>
        </div>
      </div>
    </section>
  );
};

export default LandingSection;
