import React, { useState, useEffect } from "react";
import { icons } from "../data/iconData";

const Skills = () => {
  const [activeTab, setActiveTab] = useState("frontend");
  const [visibleIcons, setVisibleIcons] = useState([]);

  // Tabs configuration
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
    <div className="flex flex-col items-center p-8 rounded-lg shadow-lg">
      <div className="mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => handleTabChange(tab.value)}
            className={`cursor-pointer relative inline-block py-2 px-4 shadow-lg transition-transform transform hover:bg-blue-800 mx-2 ${
              activeTab === tab.value
                ? "bg-blue-500 text-white"
                : "text-blue-500 border border-blue-500"
            } rounded-lg`}
          >
            {tab.label}
          </button>
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
