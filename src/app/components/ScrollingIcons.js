import React from "react";
import "../styles/about.css";

const IconLoop = ({ icons, first = undefined, last = undefined }) => (
  <div
    data-first={first}
    data-last={last}
    className="scroll flex h-16 w-full items-center justify-around gap-8 whitespace-nowrap px-4"
  >
    {icons.map((icon) => (
      <a
        key={icon.name}
        href={icon.documentation}
        target="_blank"
        rel="noopener noreferrer"
        className="tooltip"
        data-tip={icon.fullname}
      >
        <img
          src={`/icons/${icon.name}.svg`}
          alt={icon.fullname}
          className="h-16 w-32"
        />
      </a>
    ))}
  </div>
);

const ScrollingIcons = ({ icons }) => (
  <div className="mt-9 scroll-container relative grid h-16 w-full overflow-hidden whitespace-nowrap">
    <IconLoop icons={icons} first={true} />
    <IconLoop icons={icons} />
    <IconLoop icons={icons} last={true} />
  </div>
);

export default ScrollingIcons;
