import React from "react";
import ScrollingIcons from "../components/ScrollingIcons";
import "../styles/about.css";
import { icons } from "../data/iconData";
const mikoImage = "/images/miko.jpg";

const About = () => {
  return (
    <section id="about" className="about-section min-h-screen flex flex-col">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-bold mb-4">
          About <span className="text-blue-500">Me</span>
        </h2>
      </div>

      <div className="flex flex-col md:flex-row items-stretch justify-between max-w-6xl mx-auto gap-8 mb-12">
        <div className="flex-grow flex items-center justify-center max-w-md">
          <img
            src={mikoImage}
            alt="Miko"
            className="w-full h-auto max-h-96 object-cover rounded-lg shadow-lg"
            // Adjust max-h-96 to the height you want to cap
          />
        </div>
        <div className="flex-grow flex items-center max-w-md">
          <p className="text-lg">
            I'm a passionate developer with experience in various technologies.
            My journey has led me to work on diverse projects, and I
            continuously strive to learn and grow. Below are some of the tools
            and technologies I've worked with.
          </p>
        </div>
      </div>

      <div className="text-center mb-12">
        <h2 className="text-3xl font-semibold mb-4">Skills</h2>
      </div>

      <ScrollingIcons icons={icons} />
    </section>
  );
};

export default About;
