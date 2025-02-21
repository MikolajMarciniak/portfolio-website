import React, { forwardRef } from "react";
import Button from "../components/Button";
import LazyLoad from "../components/LazyLoad";
import LayeredParallax from "../components/LayeredParallax";

import "../styles/about.css";
const mikoImage = "/images/miko.jpg";
const foreground = "/images/miko-foreground.png";
const midground = "/images/miko-midground.png";
const background = "/images/miko-background.png";

const AboutSection = forwardRef(({ translation, isDarkMode }, ref) => {
  return (
    <section
      ref={ref}
      id="about"
      className="about-section bg-[--background-color] min-h-screen flex flex-col relative overflow-x-hidden"
    >
      <div className="relative py-20 z-10 mx-auto w-full max-w-6xl text-center">
        <LazyLoad>
          <h2 className="text-6xl font-extrabold">
            <span className="shadow about  text-[--about-color]">
              {translation.title}
            </span>
          </h2>
        </LazyLoad>
      </div>

      <LazyLoad>
        <div
          className="shadow-2xl pt-5 pb-28 relative w-[110%] h-[60%] md:h-[60%] bg-[--about-color] top-[20%] md:top-[14%] left-[-4%] flex items-center justify-center md:justify-between px-6 md:px-16"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 75%, 0% 100%)",
          }}
        >
          <div className="relative z-10 mx-auto w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-8 px-6">
            {/* <div className="-rotate-6 w-[45%] overflow-hidden rounded-full flex-shrink-0 ">
              <img
                src={mikoImage}
                alt="Miko"
                className="w-[90%] h-auto object-cover rounded-full border-2 border-white shadow-lg transition-all duration-300"
              />
            </div> */}
            {/* <div className="relative w-[800px] h-[600px] [&>img]:absolute [&>img]:inset-0">
             */}
            <LayeredParallax
              foreground={foreground}
              midground={midground}
              background={background}
            />
            {/*space*/}
            <div className="dark text-white text-xl max-w-lg md:ml-6">
              <p>{translation.description}</p>
              <div className="flex justify-center">
                <Button
                  href={translation.cv}
                  className={`border-2 border-white text-white hover:text-[--about-color] bg-[--about-color] hover:bg-white font-extrabold hover:shadow-lg transition-transform transform  
                  `}
                >
                  {translation.viewcv}
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
