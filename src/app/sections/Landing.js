/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, forwardRef } from "react";
import { Link } from "react-scroll";
import { useContext } from "react";
import { LocaleContext } from "../components/LocaleProvider";
import ScrollDownButton from "../components/ScrollDownButton";

const LandingSection = forwardRef(
  ({ translation, isDarkMode, isScrolled }, ref) => {
    const [currentDate, setCurrentDate] = useState("");
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const { currentLocale } = useContext(LocaleContext);

    useEffect(() => {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
      if (!currentLocale) return;

      const today = new Date().toLocaleDateString(currentLocale || "en", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      setCurrentDate(today);
    }, [currentLocale]);

    return (
      <section
        ref={ref}
        id="landing"
        className="landing-section min-h-screen max-h-screen flex flex-col justify-between items-center "
      >
        <div className="text-center max-w-6xl flex-grow flex flex-col justify-center">
          <h1 className=" leading-none mt-[100px]">
            <p className=" text-3xl  lg:text-4xl xl:text-5xl 2xl:text-6xl">
              {translation.hero}
              {windowWidth >= 300 && (
                <span className="mt-10 sm:hidden block"></span>
              )}
              <span className="text-4xl xl:text-5xl 2xl:text-6xl break-words min-w-md">
                <Link
                  to="about"
                  smooth={true}
                  duration={500}
                  offset={-70}
                  className="cursor-pointer sm:ml-4 ml-0 pt-2 font-semibold hover:text-[--shadow-color] shadow landing link"
                >
                  MIKOŁAJ
                  {windowWidth >= 300 && (
                    <span className="sm:hidden block"></span>
                  )}
                  <span className="ml-0 sm:ml-4">MARCINIAK</span>
                </Link>
                <span className="whitespace-nowrap">.</span>
              </span>
            </p>
            <p
              className={`px-3 text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl mt-10 flex w-full ${isDarkMode ? "text-gray-400" : "text-gray-700"} max-w-6xl justify-center`}
            >
              <span>
                <span className="inline-block">
                  {translation.subtitle}
                  <span
                    className={`mr-2 text-[--landing-color] ${isDarkMode ? "opacity-50" : "opacity-75"}`}
                  >
                    ,
                  </span>
                </span>

                <span className="inline-block">
                  {translation.subtitle2}
                  <span
                    className={`mx-2 text-[--landing-color] ${isDarkMode ? "opacity-50" : "opacity-75"}`}
                  >
                    &
                  </span>
                  {translation.subtitle3}
                </span>
              </span>
            </p>
          </h1>
        </div>

        <div
          className={`font-[electrolize] text-md sm:text-md md:text-lg lg:text-xl px-2 w-full justify-between items-center max-w-6xl flex pb-10 transition-opacity duration-500 ${isScrolled ? "opacity-0" : "opacity-100"}`}
        >
          {windowWidth >= 380 ? (
            <>
              <span className="ml-10 pl-2 lg:ml-0 text-gray-500">
                {translation.visitor} {"   "}
                <img
                  className="pl-1 inline-block align-middle"
                  style={{ height: "1.4em", paddingBottom: "2px" }}
                  src="https://visit-counter.vercel.app/counter.png?page=marciniakm.com&s=40&c=ef4444BF&bg=00000000&no=1&ff=electrolize&tb=&ta="
                  alt="visitor no."
                />
              </span>

              <ScrollDownButton
                isScrolled={isScrolled}
                isDarkMode={isDarkMode}
              />

              <span className="mr-10 pr-2 lg:mr-0 text-gray-500">
                {currentDate.split(" ").map((part, index) => (
                  <span
                    key={index}
                    style={
                      index === 0
                        ? {
                            fontSize: "1.11em",
                            paddingBottom: "2px",
                            transform: "scaleX(1.2)",
                            display: "inline-block",
                          }
                        : {}
                    }
                    className={
                      index === 0 ? "text-red-500 opacity-75 pr-2" : ""
                    }
                  >
                    {part}{" "}
                  </span>
                ))}
              </span>
            </>
          ) : (
            <>
              <span className="ml-10 lg:ml-0 text-gray-500" />

              <ScrollDownButton
                isScrolled={isScrolled}
                isDarkMode={isDarkMode}
              />

              <span className="mr-10 lg:mr-0"></span>
            </>
          )}
        </div>
      </section>
    );
  },
);

LandingSection.displayName = "LandingSection";
export default LandingSection;
