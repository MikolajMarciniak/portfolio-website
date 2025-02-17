import React, { forwardRef } from "react";
import { Parallax } from "react-scroll-parallax";
import Button from "../components/Button";
import Skills from "../components/Skills";
import LazyLoad from "../components/LazyLoad";

const mikoImage = "/images/miko.jpg";

const AboutSection = forwardRef(({ translation, isDarkMode }, ref) => {
  return (
    <section
      ref={ref}
      id="about"
      className="about-section min-h-screen flex flex-col relative overflow-x-hidden"
    >
      <div className="relative z-10 mx-auto w-full max-w-6xl text-center mb-12">
        <LazyLoad>
          <h2 className="text-5xl font-bold mb-10 mt-10">
            <span className="shadow text-[--about-color]">About</span>
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
            <div className="-rotate-6 w-[45%] mt-5 mb-5 overflow-hidden rounded-full flex-shrink-0 ">
              <img
                src={mikoImage}
                alt="Miko"
                className="w-[90%] h-auto object-cover rounded-full border-2 border-white shadow-lg transition-all duration-300"
              />
            </div>
            <div className="dark text-white text-xl max-w-lg md:ml-6 font-semibold">
              <p>{translation.description}</p>
              <div className="flex justify-center mt-6">
                <Button
                  href={translation.cv}
                  className={`dark-mode-button hover:text-[--text-color] hover:shadow-lg transition-transform transform hover:scale-110  hover:bg-purple-700 ${
                    isDarkMode ? "dark" : "light"
                  }`}
                >
                  {translation.viewcv}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </LazyLoad>

      <div className="mt-[15vh] w-full mb-[15vh]">
        <LazyLoad>
          <h2 className="text-4xl font-bold mb-6 text-center">
            {translation.skillstitle}
          </h2>
          <Parallax translateY={[10, -15]}>
            <Skills translation={translation.skills} isDarkMode={isDarkMode} />
          </Parallax>
        </LazyLoad>
      </div>
    </section>
  );
});

AboutSection.displayName = "About";
export default AboutSection;
