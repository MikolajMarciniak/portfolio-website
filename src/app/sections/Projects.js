import React, { useState, useEffect, forwardRef } from "react";
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

  const useWindowWidth = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return width;
  };

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
  const width = useWindowWidth();
  return (
    <section
      ref={ref}
      className={`radial-background ${isDarkMode ? "dark" : "light"} flex flex-col justify-center  relative`}
      id="projects"
    >
      <div className="relative py-20 mx-auto w-full max-w-6xl text-center">
        <LazyLoad>
          <h2 className="text-4xl xl:text-5xl 2xl:text-6xl font-bold">
            <span className="shadow projects text-[--projects-color]">
              {translation.title}
            </span>
          </h2>
        </LazyLoad>
      </div>

      {width > 1280 ? (
        <div
          className={` flex w-full max-w-6xl mx-auto space-x-4 projects-height ${
            expandedItem ? "expand min-h-[140vh]" : "min-h-screen"
          } overflow-visible`}
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
                    ? "max-h-screen opacity-100"
                    : "max-h-screen opacity-0 pointer-events-none"
                } py-6 text-center text-xl items-center text-[--text-color] `}
                style={{
                  transition: "max-height 0.5s ease, opacity 0.6s ease",
                  maxHeight: showMore ? "100%" : "0%",
                }}
              >
                {translation.upcoming}
              </h1>

              {columnIndex === 1 && (
                <Button
                  onClick={toggleShowMore}
                  className="relative flex justify-center items-center text-center text-[--projects-color] border-2 border-[--projects-color] overflow-hidden group hover:text-[--background-color] hover:shadow-lg transition-transform transform"
                >
                  <span className="relative z-10">
                    {showMore ? translation.showless : translation.showmore}
                  </span>
                  <span className="absolute inset-0 w-0 bg-[--projects-color] transition-all duration-300 ease-out group-hover:w-full"></span>
                </Button>
              )}
            </Parallax>
          ))}
        </div>
      ) : (
        <div
          className={`flex mx-auto px-8 flex-col space-y-1 w-full max-w-2xl mx-auto projects-height pb-12 min-h-[1000px] ${
            showMore ? "expand" : ""
          } overflow-visible`}
        >
          {translatedProjects.map((column, columnIndex) => (
            <div key={column.id} className="flex flex-col w-full">
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
                      coverVideo={project.id !== 5}
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
              <p
                className={`${
                  columnIndex === 2 && showMore
                    ? "max-h-[500px] opacity-100"
                    : "max-h-0 opacity-0 pointer-events-none"
                } overflow-visible py-10 text-center text-[--text-color] transition-[max-height,opacity] duration-500 ease`}
                style={{
                  transitionDelay: showMore ? "0s, 0.3s" : "0.3s, 0s",
                }}
              >
                {translation.upcoming}
              </p>

              {columnIndex === 2 && (
                <Button
                  onClick={toggleShowMore}
                  className="mb-12 relative flex justify-center items-center text-center text-[--projects-color] border-2 border-[--projects-color] overflow-hidden group hover:text-[--background-color] hover:shadow-lg transition-transform transform"
                >
                  <span className="relative z-10">
                    {showMore ? translation.showless : translation.showmore}
                  </span>
                  <span className="absolute inset-0 w-0 bg-[--projects-color] transition-all duration-300 ease-out group-hover:w-full"></span>
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
});

ProjectsSection.displayName = "Featured Projects";
export default ProjectsSection;
