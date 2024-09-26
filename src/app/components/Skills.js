import React, { useState, useEffect } from "react";
import { icons } from "../data/iconData";
import Button from "./Button";

const Skills = () => {
  const [activeTab, setActiveTab] = useState("frontend");
  const [visibleIcons, setVisibleIcons] = useState([]);

  const tabs = [
    { label: "Frontend", value: "frontend" },
    { label: "Backend", value: "backend" },
    { label: "Tools", value: "tools" },
  ];

  const handleTabChange = (tabValue) => {
    setActiveTab(tabValue);
    setVisibleIcons([]);

    icons[tabValue].forEach((_, index) => {
      setTimeout(() => {
        setVisibleIcons((prevIcons) => [...prevIcons, index]);
      }, (index + 1) * 150);
    });
  };

  useEffect(() => {
    handleTabChange("frontend");
  }, []);

  const filteredIcons = icons[activeTab];

  return (
    <div className="mt-6 shadow-2xl flex flex-col items-center p-8 rounded-lg max-w-2xl mx-auto bg-[--foreground-color]">
      <div className="mb-8 flex space-x-4 justify-center">
        {tabs.map((tab) => (
          <Button
            key={tab.value}
            onClick={() => handleTabChange(tab.value)}
            className={`dark-mode-button border-2 w-32 text-[--text-color] hover:bg-purple-700 hover:border-purple-700 hover:scale-110 transition-transform transform shadow-2xl${
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
        <div className="flex space-x-6">
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
              >
                <img
                  src={`/icons/${icon.name}.svg`}
                  alt={icon.fullname}
                  className="w-16 h-16 mb-2"
                />
              </a>
              <h3 className="text-lg font-semibold text-white">
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
