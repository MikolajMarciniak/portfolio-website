import React, { useState, forwardRef } from "react";
import ProjectCard from "../components/ProjectCard";
import { Link } from "react-scroll";
import { Parallax } from "react-scroll-parallax";
import Button from "../components/Button";
import "../styles/projects.css";

const projects = [
  {
    id: 1,
    title: "Project 1",
    description: "Description of Project 1",
    link: "https://example.com",
    githubLink: "https://github.com/yourrepo/project1",
    imageStatic: "1.png",
    imageGif: "1.webp",
    parallax: ["30%", "0%"],
    icons: ["/icons/linkedIn.svg", "/icons/github.svg"],
  },
  {
    id: 2,
    title: "Project 2",
    description: "Description of Project 2",
    link: "https://example.com",
    githubLink: "https://github.com/yourrepo/project2",
    imageStatic: "1.png",
    imageGif: "1.webp",
    parallax: ["0%", "30%"],
    icons: [""],
  },
  {
    id: 3,
    title: "Project 3",
    description: "Description of Project 3",
    link: "https://example.com",
    githubLink: "https://github.com/yourrepo/project3",
    imageStatic: "1.png",
    imageGif: "1.webp",
    parallax: ["30%", "0%"],
    icons: [""],
  },
];

const additionalProjects = [
  {
    id: 4,
    title: "Project 4",
    description: "Description of Project 4",
    link: "https://example.com",
    githubLink: "https://github.com/yourrepo/project4",
    imageStatic: "1.png",
    imageGif: "1.webp",
    parallax: ["22%", "-8%"],
    icons: [""],
  },
  {
    id: 5,
    title: "Project 5",
    description: "Description of Project 5",
    link: "https://example.com",
    githubLink: "https://github.com/yourrepo/project5",
    imageStatic: "1.png",
    imageGif: "1.webp",
    parallax: ["12%", "38%"],
    icons: [""],
  },
  {
    id: 6,
    title: "Project 6",
    description: "Description of Project 6",
    link: "https://example.com",
    githubLink: "https://github.com/yourrepo/project6",
    imageStatic: "1.png",
    imageGif: "1.webp",
    parallax: ["22%", "-8%"],
    icons: [""],
  },
];

const ProjectsSection = forwardRef((props, ref) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  return (
    <section
      ref={ref}
      id="projects"
      className={`transition-height duration-500 ease-in-out flex flex-col relative overflow-hidden mx-auto w-full max-w-6xl ${
        showMore ? "h-[160vh]" : "h-[100vh]"
      }`}
    >
      <div className="relative z-10 text-center">
        <h2 className="text-5xl font-bold mb-4 mt-6">
          <span className="shadow text-[--projects-color]">My Projects</span>
        </h2>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {projects.map((project) => (
          <Parallax key={project.id} translateY={project.parallax}>
            <ProjectCard
              title={project.title}
              description={project.description}
              link={project.link}
              githubLink={project.githubLink}
              imageStatic={project.imageStatic}
              imageGif={project.imageGif}
              icons={project.icons}
            />
          </Parallax>
        ))}
      </div>
      <div
        className={`${
          showMore ? "opacity-1" : "opacity-0 max-h-0"
        } grid grid-cols-3 gap-4 transition-opacity duration-500 ease-in-out`}
      >
        {additionalProjects.map((project) => (
          <Parallax key={project.id} translateY={project.parallax}>
            <ProjectCard
              title={project.title}
              description={project.description}
              link={project.link}
              githubLink={project.githubLink}
              imageStatic={project.imageStatic}
              imageGif={project.imageGif}
              icons={project.icons}
            />
          </Parallax>
        ))}
      </div>
      <Parallax
        className={`${showMore && "mt-[5%]"}`}
        translateY={["200%", "400%"]}
      >
        <div className="text-center">
          <Link to={showMore ? "projects" : ""} offset={-100} duration={500}>
            <Button
              onClick={toggleShowMore}
              className="inline-flex items-center dark-mode-button hover:text-[--text-color] hover:shadow-lg transition-transform transform hover:scale-110 border-2 border-[--text-color] hover:bg-[--projects-color]"
            >
              {showMore ? "Show Less" : "See More"}
            </Button>
          </Link>
        </div>
      </Parallax>
    </section>
  );
});

export default ProjectsSection;
