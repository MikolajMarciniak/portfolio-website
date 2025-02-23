import React, { forwardRef } from "react";
import Button from "../components/Button";
import LazyLoad from "../components/LazyLoad";
import { Link as ScrollLink } from "react-scroll";
import LayeredParallax from "../components/LayeredParallax";

import "../styles/about.css";
const foreground = "/images/miko-foreground.png";
const midground = "/images/miko-midground.png";
const background = "/images/miko-background.png";

const AboutSection = forwardRef(({ translation, isDarkMode }, ref) => {
  return (
    <section
      ref={ref}
      id="about"
      className="z-10 about-section min-h-screen flex flex-col relative overflow-x-hidden bg-[--background-color-dark]"
    >
      <div className="relative py-20 mx-auto w-full max-w-6xl text-center">
        <LazyLoad>
          <h2 className="text-6xl font-bold">
            <span className="shadow heading about text-[--about-color]">
              {translation.title}
            </span>
          </h2>
        </LazyLoad>
      </div>

      <LazyLoad>
        <div className="shadow-2xl py-3 text-lg font:semibold relative w-full bg-[--about-color] flex items-center justify-center ">
          <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between">
            <LayeredParallax
              foreground={foreground}
              midground={midground}
              background={background}
            />
            <div className="dark text-white max-w-xl">
              <p className="mt-4">{translation.description}</p>
              <p className="mt-4">
                {translation.description2}{" "}
                <a
                  href="https://www.linkedin.com/in/mikolaj-marciniak"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer hover:font-bold underline mr-2"
                >
                  {translation.linkedin}
                </a>
              </p>

              <p className="mt-4">
                {translation.description3}{" "}
                <ScrollLink
                  to="contact"
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className="cursor-pointer hover:font-bold underline"
                >
                  here.
                </ScrollLink>
              </p>

              <div className="flex justify-center">
                <Button
                  href={translation.cv}
                  className="relative mt-8 border-2 border-white text-white bg-[--about-color] font-bold transition-all ease-out duration-300 overflow-hidden group"
                >
                  <span className="relative z-10 group-hover:text-[--about-color]">
                    {translation.viewcv}
                  </span>
                  <span className="absolute inset-0 w-0 bg-white transition-all duration-300 ease-out group-hover:w-full"></span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </LazyLoad>
    </section>
  );
});

AboutSection.displayName = "About";
export default AboutSection;
