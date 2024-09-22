import React, { forwardRef } from "react";
import ProjectCard from "../components/ProjectCard";

const projects = [
  {
    id: 1,
    title: "Project 1",
    description: "Description of Project 1",
    link: "https://example.com",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 2,
    title: "Project 2",
    description: "Description of Project 2",
    link: "https://example.com",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 3,
    title: "Project 3",
    description: "Description of Project 3",
    link: "https://example.com",
    image: "https://via.placeholder.com/300",
  },
];

const ProjectsSection = forwardRef((props, ref) => {
  return (
    <section
      ref={ref}
      id="projects"
      className="min-h-screen flex flex-col items-center justify-center"
    >
      <div className="text-center mb-12">
        <h2 className="text-5xl font-bold mb-6">My Projects</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            link={project.link}
            image={project.image}
          />
        ))}
      </div>
    </section>
  );
});

export default ProjectsSection;
