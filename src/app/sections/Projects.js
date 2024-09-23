import React, { forwardRef } from "react";
import ProjectCard from "../components/ProjectCard";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";

const projects = [
  {
    id: 1,
    title: "Project 1",
    description: "Description of Project 1",
    link: "https://example.com",
    imageStatic: "https://via.placeholder.com/300",
    imageGif: "https://via.placeholder.com/300.gif",
    parallax: ["90%", "-60%"],
    easing: [0.86, 0, 0.07, 1],
  },
  {
    id: 2,
    title: "Project 2",
    description: "Description of Project 2",
    link: "https://example.com",
    imageStatic: "https://via.placeholder.com/300",
    imageGif: "https://via.placeholder.com/300.gif",
    parallax: ["60%", "-60%"],
    easing: [0.86, 0, 0.07, 1],
  },
  {
    id: 3,
    title: "Project 3",
    description: "Description of Project 3",
    link: "https://example.com",
    imageStatic: "https://via.placeholder.com/300",
    imageGif: "https://via.placeholder.com/300.gif",
    parallax: ["130%", "-60%"],
    easing: [0.86, 0, 0.07, 1],
  },
];

const ProjectsSection = forwardRef((props, ref) => {
  return (
    <section
      ref={ref}
      id="projects"
      className="min-h-screen flex flex-col relative overflow-hidden"
    >
      <div className="relative z-10 mx-auto w-full max-w-6xl text-center mb-12">
        <h2 className="text-5xl font-bold mb-14 mt-10">
          <span className="shadow text-[--projects-color]">My Projects</span>
        </h2>
      </div>

      <div className="relative mx-auto max-w-6xl flex justify-between gap-8 px-6">
        {projects.map((project) => (
          <Parallax key={project.id} translateY={project.parallax}>
            <ProjectCard
              title={project.title}
              description={project.description}
              link={project.link}
              imageStatic={project.imageStatic}
              imageGif={project.imageGif}
              easing={project.easing}
            />
          </Parallax>
        ))}
      </div>
    </section>
  );
});

export default ProjectsSection;
