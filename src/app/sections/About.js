import React, { forwardRef } from "react";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import Skills from "../components/Skills";
const mikoImage = "/images/miko.jpg";

const About = forwardRef((props, ref) => {
  return (
    <ParallaxProvider>
      <section
        ref={ref}
        id="about"
        className="about-section min-h-screen flex flex-col relative overflow-x-hidden"
      >
        <div className="relative z-10 mx-auto w-full max-w-6xl text-center mb-12">
          <h2 className="text-5xl font-bold mb-14 mt-10">
            <span className="shadow text-[--about-color]">About Me</span>
          </h2>
        </div>
        <Parallax translateY={[10, -10]}>
          <div className="relative w-[110%] h-[60%] md:h-[60%] bg-[--about-color] top-[20%] md:top-[14%] left-[-4%] transform rotate-3 flex items-center justify-center md:justify-between px-6 md:px-16">
            <div className="relative z-10 mx-auto w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-8 px-6">
              <div className="-rotate-6 w-[45%] mt-5 mb-5 overflow-hidden rounded-full flex-shrink-0">
                <img
                  src={mikoImage}
                  alt="Miko"
                  className="w-[90%] h-auto object-cover rounded-full shadow-lg"
                />
              </div>

              <div className="text-white max-w-md text-lg md:ml-8 -rotate-3 font-semibold">
                <p>
                  I'm a passionate developer with experience in various
                  technologies. My journey has led me to work on diverse
                  projects, and I continuously strive to learn and grow. Below
                  are some of the tools and technologies I've worked with.
                </p>
                <a
                  href="/documents/MikolajMarciniak.pdf"
                  className="mt-4 cursor-pointer relative inline-block bg-blue-500 py-2 px-4 rounded-lg shadow-lg transition-transform transform hover:bg-blue-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View CV
                </a>
              </div>
            </div>
          </div>
        </Parallax>
        <div className="mt-[15vh] w-full mb-[15vh]">
          <h2 className="text-3xl font-semibold mb-4 text-center">Skills</h2>
          <Skills />
        </div>
      </section>
    </ParallaxProvider>
  );
});

export default About;
