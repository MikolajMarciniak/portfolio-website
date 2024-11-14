import React, { forwardRef } from "react";
import { Parallax } from "react-scroll-parallax";
import Button from "../components/Button";
import Skills from "../components/Skills";
import LazyLoad from "../components/LazyLoad";

const mikoImage = "/images/miko.jpg";

const AboutSection = forwardRef(({ isdarkmode }, ref) => {
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

      <Parallax translateY={[10, -20]}>
        <LazyLoad>
          <div className="shadow-2xl relative w-[110%] h-[60%] md:h-[60%] bg-[--about-color] top-[20%] md:top-[14%] left-[-4%] transform rotate-3 flex items-center justify-center md:justify-between px-6 md:px-16">
            <div className="relative z-10 mx-auto w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-8 px-6">
              <div className="-rotate-6 w-[45%] mt-5 mb-5 overflow-hidden rounded-full flex-shrink-0 ">
                <img
                  src={mikoImage}
                  alt="Miko"
                  className="w-[90%] h-auto object-cover rounded-full"
                />
              </div>
              <div className="text-xl max-w-lg md:ml-6 -rotate-3 font-semibold">
                <p>
                  I&apos;m a fullstack developer specialising in the MERN stack.
                  Since the beginning of my journey, I&apos;ve created bespoke
                  digital solutions for both business and consumer use. I
                  particularly enjoy integrating powerful backends with
                  beautiful interfaces for data visualisation. In my free time
                  I&apos;m experimenting with artificial intelligence and
                  brewing my own wine.
                </p>
                <div className="flex justify-center mt-6">
                  <Button
                    href="/documents/MikolajMarciniak.pdf"
                    className={`dark-mode-button hover:text-[--text-color] hover:shadow-lg transition-transform transform hover:scale-110  hover:bg-purple-700 ${
                      isdarkmode ? "dark" : "light"
                    }`}
                  >
                    View CV
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </LazyLoad>
      </Parallax>

      <div className="mt-[15vh] w-full mb-[15vh]">
        <LazyLoad>
          <h2 className="text-4xl font-bold mb-6 text-center">Skills</h2>

          <Parallax translateY={[10, -15]}>
            <Skills isdarkmode={isdarkmode} />
          </Parallax>
        </LazyLoad>
      </div>
    </section>
  );
});

AboutSection.displayName = "About";
export default AboutSection;
