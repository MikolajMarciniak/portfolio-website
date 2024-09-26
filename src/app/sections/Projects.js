import React, { useState, forwardRef } from "react";
import ProjectCard from "../components/ProjectCard";
import { Link } from "react-scroll";
import { Parallax } from "react-scroll-parallax";
import Button from "../components/Button";
import LazyLoad from "../components/LazyLoad";
import { projects, hiddenProjects } from "../data/projectData";
import "../styles/projects.css";

const ProjectsSection = forwardRef((props, ref) => {
  const [showMore, setShowMore] = useState(false);
  const [expandedProject, setExpandedProject] = useState(null);

  const projectIds = projects.map((project) => project.id);
  const hiddenProjectIds = hiddenProjects.map((project) => project.id);

  const toggleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  const handleExpand = (id) => {
    setExpandedProject((prev) => (prev === id ? null : id));
  };

  return (
    <section
      ref={ref}
      id="projects"
      className={`transition-height duration-500 flex flex-col relative overflow-hidden mx-auto w-full max-w-6xl ${
        showMore ? "h-[135vh]" : "h-[100vh]"
      }`}
    >
      <LazyLoad>
        <div className="relative z-10 text-center">
          <h2 className="text-5xl font-bold mb-4 mt-6">
            <span className="shadow text-[--projects-color]">My Projects</span>
          </h2>
        </div>
      </LazyLoad>
      <LazyLoad>
        <div className="flex flex-wrap gap-4">
          {projects.map((project) => {
            const otherExpanded =
              expandedProject !== project.id &&
              projectIds.includes(expandedProject);
            const isExpanded = expandedProject === project.id;

            return (
              <Parallax
                key={`parallax ${project.id} `}
                className={`transition-all duration-500 h-full flex-shrink-0 ${
                  isExpanded
                    ? "flex-grow-[1] basis-[50%]"
                    : otherExpanded
                    ? "flex-grow-[0.5] basis-[20%]"
                    : "flex-grow basis-[30%]"
                }`}
                translateY={project.parallax}
              >
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  description={project.description}
                  link={project.link}
                  githubLink={project.githubLink}
                  imageStatic={project.imageStatic}
                  imageGif={project.imageGif}
                  icons={project.icons}
                  isExpanded={isExpanded}
                  otherExpanded={otherExpanded}
                  onExpand={() => handleExpand(project.id)}
                />
              </Parallax>
            );
          })}
        </div>
      </LazyLoad>
      <LazyLoad>
        <div
          className={`flex flex-wrap gap-4 transition-opacity duration-500 ${
            showMore ? "opacity-1" : "opacity-0 max-h-0 pointer-events-none"
          }`}
        >
          {hiddenProjects.map((project) => {
            const otherExpanded =
              expandedProject !== project.id &&
              hiddenProjectIds.includes(expandedProject);
            const isExpanded = expandedProject === project.id;

            return (
              <Parallax
                key={`parallax ${project.id} `}
                className={`transition-all duration-500 h-full flex-shrink-0 ${
                  isExpanded
                    ? "flex-grow-[1] basis-[50%]"
                    : otherExpanded
                    ? "flex-grow-[0.5] basis-[20%]"
                    : "flex-grow basis-[30%]"
                } min-w-[200px]`}
                translateY={project.parallax}
              >
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  description={project.description}
                  link={project.link}
                  githubLink={project.githubLink}
                  imageStatic={project.imageStatic}
                  imageGif={project.imageGif}
                  icons={project.icons}
                  isExpanded={isExpanded}
                  otherExpanded={otherExpanded}
                  onExpand={() => handleExpand(project.id)}
                />
              </Parallax>
            );
          })}
        </div>
      </LazyLoad>
      <Parallax
        className={`${showMore && "mt-[5%]"}`}
        translateY={["200%", "400%"]}
      >
        <div className="text-center">
          <Link to={showMore ? "projects" : ""} offset={-100} duration={1000}>
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

ProjectsSection.displayName = "Projects";
export default ProjectsSection;
