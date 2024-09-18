import React, { useState } from 'react';
import {ReactTyped} from 'react-typed';

const coloredStrings = [
  { text: "developer", color: "text-red-500" },
  { text: "teacher", color: "text-blue-500" },
  { text: "designer", color: "text-purple-500" },
  { text: "freelancer", color: "text-yellow-500" },
];

const TypedText = () => {
  const [colorClass, setColorClass] = useState(coloredStrings[0].color);

  // Handle the color change based on the string being typed
  const handleStringTyped = (index) => {
    setColorClass(coloredStrings[index % coloredStrings.length].color);
  };

  return (
    <span className={`inline-block ${colorClass}`}>
      <ReactTyped
        strings={coloredStrings.map(s => s.text)}
        typeSpeed={40}
        backSpeed={50}
        loop
        preStringTyped={handleStringTyped}
      />
    </span>
  );
};

export default TypedText;
