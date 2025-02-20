import React from "react";
import { ReactTyped } from "react-typed";

const TypedText = ({ strings, colorClass, handleStringTyped }) => {
  return (
    <span
      className="inline-block"
      style={{
        color: `var(${colorClass})`,
      }}
    >
      <ReactTyped
        strings={strings.map((s) => s.text)}
        typeSpeed={70}
        backSpeed={70}
        loop
        preStringTyped={(index) => handleStringTyped(index)}
      />
    </span>
  );
};

export default TypedText;
