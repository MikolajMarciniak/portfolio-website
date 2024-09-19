// About.js
import React from "react";
import ScrollingIcons from "../components/ScrollingIcons";
import "../styles/about.css";
import { icons } from "../data/iconData";

const About = () => {
  return (
    <section id="about">
      <ScrollingIcons icons={icons} />
    </section>
  );
};

export default About;
