import React, { useState, forwardRef } from "react";
import ProjectCard from "../components/ProjectCard";
import { Link } from "react-scroll";
import { Parallax } from "react-scroll-parallax";
import Button from "../components/Button";
import LazyLoad from "../components/LazyLoad";
import { projectColumns } from "../data/projectData";
import "../styles/projects.css";

const ProjectsSection = forwardRef((props, ref) => {
  const [expandedColumn, setExpandedColumn] = useState(null);
  const [expandedItem, setExpandedItem] = useState(null);
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    showMore
      ? [2, 4, 6].includes(expandedItem)
        ? toggleExpand(expandedItem)
        : ""
      : "";
    setShowMore((prev) => !prev);
  };

  const toggleExpand = (projectIndex) => {
    setExpandedItem((prev) => (prev === projectIndex ? null : projectIndex));
    let columnIndex = null;
    if (projectIndex <= 2) {
      columnIndex = 0;
    } else if (projectIndex <= 4) {
      columnIndex = 1;
    } else if (projectIndex <= 6) {
      columnIndex = 2;
    }
    setExpandedColumn((prev) =>
      prev === columnIndex && projectIndex === expandedItem ? null : columnIndex
    );
  };

  return (
    <section ref={ref} id="projects">
      <div className="relative z-10 mx-auto w-full max-w-6xl text-center mb-12">
        <LazyLoad>
          <h2 className="text-5xl font-bold mb-10 mt-10">
            <span className="shadow text-[--about-color]">Projects</span>
          </h2>
        </LazyLoad>
      </div>

      <div
        className={`flex w-full max-w-6xl mx-auto space-x-4 projects-height min-h-[100vh] ${
          showMore ? "expand" : ""
        } overflow-hidden`}
      >
        {projectColumns.map((column, columnIndex) => (
          <Parallax
            translateY={column.parallax}
            key={column.id}
            className={`flex flex-col items-${
              column.id === 1 ? "end" : column.id === 3 ? "start" : "center"
            } space-y-4 project-grow  ${
              expandedColumn === columnIndex ? "w-[200%]" : "w-full"
            }`}
          >
            {column.items.map((project, itemIndex) => (
              <div
                key={itemIndex}
                className={`items-center flex project-grow justify-center transition-all duration-1000 ease-in-out ${
                  itemIndex === 1
                    ? showMore
                      ? "opacity-100 max-h-full"
                      : "opacity-0 max-h-0 pointer-events-none"
                    : "opacity-100"
                } ${
                  expandedColumn === columnIndex
                    ? project.id === expandedItem
                      ? "w-[100%]"
                      : "w-[50%]"
                    : "w-[100%]"
                }`}
                style={{
                  transition:
                    "opacity 0.7s ease-in-out, max-height 1s ease-in-out, width 1s ease-in-out",
                }}
              >
                <LazyLoad fullWidth={true}>
                  <ProjectCard
                    key={project.id}
                    title={project.title}
                    description={project.description}
                    link={project.link}
                    githubLink={project.githubLink}
                    imageStatic={project.imageStatic}
                    imageGif={project.imageGif}
                    icons={project.icons}
                    isExpanded={expandedItem === project.id}
                    otherExpanded={
                      expandedItem !== project.id && expandedItem !== undefined
                    }
                    onExpand={() => toggleExpand(project.id)}
                  />
                </LazyLoad>
              </div>
            ))}
            {columnIndex === 1 && (
              <>
                {!showMore ? (
                  <Button
                    onClick={toggleShowMore}
                    className="mt-10 flex justify-center items-center text-center dark-mode-button hover:text-[--text-color] hover:shadow-lg transition-transform transform hover:scale-110 border-2 border-[--projects-color] hover:bg-[--projects-color]"
                  >
                    Show More
                  </Button>
                ) : (
                  <Link
                    to="projects"
                    offset={-100}
                    duration={300}
                    smooth={true}
                  >
                    <Button
                      onClick={toggleShowMore}
                      className="mt-10 flex justify-center items-center text-center dark-mode-button hover:text-[--text-color] hover:shadow-lg transition-transform transform hover:scale-110 border-2 border-[--projects-color] hover:bg-[--projects-color]"
                    >
                      Show Less
                    </Button>
                  </Link>
                )}
              </>
            )}
          </Parallax>
        ))}
      </div>
    </section>
  );
});

ProjectsSection.displayName = "Projects";
export default ProjectsSection;
