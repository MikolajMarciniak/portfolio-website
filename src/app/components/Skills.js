import React, { useState, useEffect } from "react";
import { icons } from "../data/iconData";
import Button from "./Button";

const Skills = ({ translation, isDarkMode }) => {
  const [activeTab, setActiveTab] = useState("frontend");
  const [visibleIcons, setVisibleIcons] = useState([]);
  const [loadedIcons, setLoadedIcons] = useState({});
  const [loading, setLoading] = useState(true);

  const tabs = [
    { label: translation[1] || "Frontend", value: "frontend" },
    { label: translation[2] || "Backend", value: "backend" },
    { label: translation[3] || "Tools", value: "tools" },
  ];

  const handleTabChange = (tabValue) => {
    setActiveTab(tabValue);
    setVisibleIcons([]);
    setLoadedIcons({});
    setLoading(true);
    const allIconsLoaded = icons[tabValue].every(
      (icon) => loadedIcons[icon.name],
    );

    if (allIconsLoaded) {
      triggerAnimation(tabValue);
    } else {
      const loadIconPromises = icons[tabValue].map((icon) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = `/icons/${icon.name}.svg`;
          img.onload = () => {
            handleIconLoad(icon.name);
            resolve();
          };
        });
      });

      Promise.all(loadIconPromises).then(() => {
        triggerAnimation(tabValue);
      });
    }
  };

  const triggerAnimation = (tabValue) => {
    icons[tabValue].forEach((_, index) => {
      setTimeout(
        () => {
          setVisibleIcons((prevIcons) => [...prevIcons, index]);
        },
        (index + 1) * 150,
      );
    });
  };

  useEffect(() => {
    handleTabChange("frontend");
  }, []);

  const filteredIcons = icons[activeTab];

  const handleIconLoad = (iconName) => {
    setLoadedIcons((prev) => ({ ...prev, [iconName]: true }));
  };

  return (
    <div className="mt-6 shadow-2xl flex flex-col items-center p-8 rounded-lg max-w-3xl mx-auto bg-[--foreground-color]">
      <div className="mb-8 flex space-x-4 justify-center">
        {tabs.map((tab) => (
          <Button
            key={tab.value}
            onClick={() => handleTabChange(tab.value)}
            className={`border-2 w-32 text-[--text-color] hover:bg-purple-700 border-[--about-color] hover:scale-105 transition-transform transform shadow-2xl ${
              activeTab === tab.value
                ? "border-[--about-color] bg-[--about-color]"
                : "border-[--about-color]"
            }`}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      <div className="flex justify-center w-full">
        <div className="flex space-x-8">
          {filteredIcons.map((icon, index) => (
            <div
              key={icon.name}
              className={`flex flex-col items-center transition-all duration-500 transform ${
                visibleIcons.includes(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <a
                href={icon.documentation}
                target="_blank"
                rel="noopener noreferrer"
                className="transform transition-transform duration-200 hover:scale-125"
              >
                <img
                  src={`/icons/tech/${
                    icon.name === "react" && !isDarkMode
                      ? "react-dark"
                      : `${icon.name}`
                  }.svg`}
                  alt={icon.fullname}
                  onLoad={() => handleIconLoad(icon.name)}
                  className={`w-16 h-16 mb-2 ${
                    icon.name === "github" && isDarkMode ? "filter invert" : ""
                  }`}
                />
              </a>
              <h3 className="text-lg font-semibold text-[--text-color]">
                {icon.fullname}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
