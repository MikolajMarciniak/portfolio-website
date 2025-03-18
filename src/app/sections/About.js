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
      className="z-10 about-section justify-center min-h-screen flex flex-col relative overflow-x-hidden bg-[--background-color-dark]"
    >
      <div className="relative py-20 mx-auto w-full max-w-6xl text-center">
        <LazyLoad>
          <h2 className="text-4xl xl:text-5xl 2xl:text-6xl font-bold">
            <span className="shadow heading about text-[--about-color]">
              {translation.title}
            </span>
          </h2>
        </LazyLoad>
      </div>

      <LazyLoad>
        <div className="shadow-2xl mb-20 px-3 md:py-4 pt-8 font:semibold relative w-full bg-[--about-color] flex items-center justify-center ">
          <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between">
            <LayeredParallax
              foreground={foreground}
              midground={midground}
              background={background}
            />
            <div className="dark text-md sm:text-lg text-white max-w-xl sm:pt-5 px-5 sm:mt-3 mt-8">
              <span
                dangerouslySetInnerHTML={{ __html: translation.description }}
              />
              <a
                href="https://www.linkedin.com/in/mikolaj-marciniak"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer hover:font-bold underline mr-2"
              >
                {" "}
                LinkedIn{" "}
              </a>
              <span
                dangerouslySetInnerHTML={{
                  __html: translation.descriptionCont,
                }}
              />
              <ScrollLink
                to="contact"
                smooth={true}
                offset={330}
                duration={500}
                className="ml-2 cursor-pointer hover:font-bold underline"
              >
                {translation.here}
              </ScrollLink>
              .
              <div className="flex justify-center pr-0 sm:pr-10">
                <Button
                  href="/documents/MikolajMarciniak.pdf"
                  // href={translation.cv}
                  className="relative my-8 border-2 border-white text-white bg-[--about-color] font-bold transition-all ease-out duration-300 overflow-hidden group"
                >
                  <span className="relative z-10 group-hover:text-[--about-color] ">
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
