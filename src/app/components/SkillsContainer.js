/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { icons } from "../data/iconData";
import Button from "./Button";

const SkillsContainer = ({ translation, isDarkMode }) => {
  const [activeTab, setActiveTab] = useState("frontend");
  const [visibleIcons, setVisibleIcons] = useState([]);
  const [loadedIcons, setLoadedIcons] = useState({});
  const [loading, setLoading] = useState(true);

  const tabs = [
    { label: translation[0] || "Frontend", value: "frontend" },
    { label: translation[1] || "Backend", value: "backend" },
    { label: translation[2] || "Tools", value: "tools" },
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
          img.src = `/icons/tech/${icon.name}.svg`;
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

  const useWindowWidth = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return width;
  };

  const width = useWindowWidth();

  const getColumnsPerRow = (width) => {
    if (width >= 768) return 7;
    if (width >= 640) return 4;
    return 3;
  };

  const columnsPerRow = getColumnsPerRow(width);

  const filteredIcons = icons[activeTab];

  const fullRowCount =
    Math.floor(filteredIcons.length / columnsPerRow) * columnsPerRow;
  const fullRows = filteredIcons.slice(0, fullRowCount);
  const remainingIcons = filteredIcons.slice(fullRowCount);
  const handleIconLoad = (iconName) => {
    setLoadedIcons((prev) => ({ ...prev, [iconName]: true }));
  };

  return (
    <div className="shadow-2xl flex flex-col items-center p-4 rounded-lg w-full  justify-center mx-auto max-w-md sm:max-w-lg md:max-w-3xl z-20 bg-[--foreground-color]">
      <div className="mb-10 flex flex-col md:flex-row gap-2 justify-center items-center w-full">
        {tabs.map((tab) => (
          <Button
            key={tab.value}
            onClick={() => handleTabChange(tab.value)}
            className={`relative border-2 w-full md:w-36 overflow-hidden transition-all ease-out duration-300 shadow-2xl ${
              activeTab === tab.value
                ? "border-[--skills-color] bg-[--skills-color] text-[--background-color]"
                : "border-[--skills-color] text-[--skills-color] hover:text-[--background-color]"
            } group`}
          >
            <span className="relative z-10">{tab.label}</span>
            <span className="absolute inset-0 w-0 bg-[--skills-color] transition-all duration-300 ease-out group-hover:w-full"></span>
          </Button>
        ))}
      </div>

      <div className="flex flex-col items-center w-full">
        <div
          className={`grid gap-8 ${
            columnsPerRow === 7
              ? "grid-cols-7"
              : columnsPerRow === 4
                ? "grid-cols-4"
                : columnsPerRow === 3
                  ? "grid-cols-3"
                  : "grid-cols-1"
          }`}
        >
          {fullRows.map((icon, index) => (
            <div
              key={icon.name}
              className={`flex flex-col items-center gap-2 transition-all duration-500 transform ${
                visibleIcons.includes(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <a
                href={icon.documentation}
                target="_blank"
                rel="noopener noreferrer"
                className="transform transition-transform duration-150 hover:scale-125"
              >
                <img
                  src={`/icons/tech/${
                    icon.name === "react" && !isDarkMode
                      ? "react-dark"
                      : `${icon.name}`
                  }.svg`}
                  alt={icon.fullname}
                  onLoad={() => handleIconLoad(icon.name)}
                  className={`w-12 h-12 sm:w-16 sm:h-16 mb-2 ${
                    icon.name === "github" && isDarkMode ? "filter invert" : ""
                  }`}
                />
              </a>
              <h3 className="text-sm sm:text-lg font-semibold text-[--text-color] text-center">
                {icon.fullname}
              </h3>
            </div>
          ))}
        </div>

        {remainingIcons.length > 0 && (
          <div className="flex justify-around w-full  mt-4">
            {remainingIcons.map((icon, index) => (
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
                  className="transform transition-transform duration-200 hover:scale-110"
                >
                  <img
                    src={`/icons/tech/${
                      icon.name === "react" && !isDarkMode
                        ? "react-dark"
                        : `${icon.name}`
                    }.svg`}
                    alt={icon.fullname}
                    onLoad={() => handleIconLoad(icon.name)}
                    className={`w-12 h-12 sm:w-16 sm:h-16 mb-2 ${
                      icon.name === "github" && isDarkMode
                        ? "filter invert"
                        : ""
                    }`}
                  />
                </a>
                <h3 className="text-sm sm:text-lg font-semibold text-[--text-color] text-center">
                  {icon.fullname}
                </h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsContainer;
