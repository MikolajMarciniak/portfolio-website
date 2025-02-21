import React, { useState, forwardRef } from "react";
import ProjectCard from "../components/ProjectCard";
import { Link } from "react-scroll";
import { Parallax } from "react-scroll-parallax";
import Button from "../components/Button";
import LazyLoad from "../components/LazyLoad";
import { projectColumns } from "../data/projectData";
import "../styles/projects.css";

const ProjectsSection = forwardRef(({ translation, isDarkMode }, ref) => {
  const [expandedColumn, setExpandedColumn] = useState(null);
  const [expandedItem, setExpandedItem] = useState(null);
  const [showMore, setShowMore] = useState(false);

  const translatedProjects = projectColumns.map((project) => ({
    ...project,
    items: project.items.map((item) => ({
      ...item,
      description:
        translation?.cards?.find((p) => p.id === item.id)?.description ||
        item.description,
    })),
  }));

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
      prev === columnIndex && projectIndex === expandedItem
        ? null
        : columnIndex,
    );
  };

  const twoRows = true;

  return (
    <section
      ref={ref}
      className=" min-h-screen bg-[--background-color-dark]"
      id="projects"
    >
      <div className="relative py-20 z-10 mx-auto w-full max-w-6xl text-center ">
        <LazyLoad>
          <h2 className="text-6xl font-extrabold ">
            <span className="shadow projects text-[--projects-color]">
              {translation.title}
            </span>
          </h2>
        </LazyLoad>
      </div>

      <div
        className={`flex w-full max-w-6xl mx-auto space-x-4 projects-height min-h-[1000px] ${
          showMore ? "expand" : ""
        } overflow-hidden`}
      >
        {translatedProjects.map((column, columnIndex) => (
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
                    translation={translation}
                    title={project.title}
                    description={project.description}
                    link={project.link}
                    githubLink={project.githubLink}
                    imageStatic={project.imageStatic}
                    imageGif={project.imageGif}
                    icons={project.icons}
                    videoFile={project.videoFile}
                    coverVideo={project.id != 5}
                    isExpanded={expandedItem === project.id}
                    isDarkMode={isDarkMode}
                    otherExpanded={
                      expandedItem !== project.id && expandedItem !== null
                    }
                    onExpand={() => toggleExpand(project.id)}
                  />
                </LazyLoad>
              </div>
            ))}

            <h1
              className={`${
                columnIndex === 1 && showMore
                  ? "max-h-screen h-20 opacity-100"
                  : "max-h-0 opacity-0 pointer-events-none"
              } text-center text-xl text-[--text-color] transition-all duration-500 ease-in-out`}
              style={{
                transition:
                  "max-height 0.5s ease-in-out, opacity 0.5s ease-in-out",
                maxHeight: showMore ? "100%" : "0%",
              }}
            >
              {translation.upcoming}
            </h1>

            {columnIndex === 1 && (
              <Button
                onClick={toggleShowMore}
                className="duration-500 flex justify-center items-center text-center hover:text-[--background-color] hover:shadow-lg transition-transform transform border-2 border-[--projects-color] text-[--projects-color] hover:bg-[--projects-color]"
              >
                {showMore ? translation.showless : translation.showmore}
              </Button>
            )}
          </Parallax>
        ))}
      </div>
    </section>
  );
});

ProjectsSection.displayName = "Featured Projects";
export default ProjectsSection;
