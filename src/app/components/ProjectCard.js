import React, { useState } from "react";
import Button from "./Button";

const ProjectCard = ({
  title,
  description,
  link,
  imageStatic,
  imageGif,
  githubLink,
  icons,
  isExpanded,
  otherExpanded,
  onExpand,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`shadow-2xl rounded-lg bg-[--foreground-color] border-4 
        hover:border-[--projects-color] border-transparent
      transform transition-all duration-500 h-full`}
    >
      <a href={link} target="_blank" rel="noopener noreferrer">
        <img
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`rounded w-full aspect-video object-cover`}
          src={`/gifs/${isHovered ? imageGif : imageStatic}`}
          alt={title}
        />
      </a>
      <div className={`p-2 mb-4 ml-2`}>
        <div className="pt-2 flex items-center justify-between">
          <a href={link} target="_blank" rel="noopener noreferrer">
            <h5 className="mb-2 text-2xl font-bold tracking-tight">{title}</h5>
          </a>
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mr-2 transform transition-transform duration-300 hover:scale-125 text-[--text-color] hover:text-[--projects-color]"
          ></a>
        </div>
        <p
          className={`mb-3 font-semibold ${
            isExpanded ? "block" : "line-clamp-2"
          }`}
        >
          {description}
        </p>
        <div className="flex space-x-2 mb-3">
          {icons &&
            icons.map((path, index) => (
              <img key={index} src={path} className="w-6 h-6" />
            ))}
        </div>
        <div
          className={` justify-end flex transform transition-transform duration-300 ${
            otherExpanded ? " -translate-x-[10%]" : " translate-x-0"
          }`}
        >
          <Button
            onClick={onExpand}
            className={` mr-2 inline-flex items-center dark-mode-button hover:text-[--text-color] hover:shadow-lg transition-all duration-500 transform hover:scale-110 border-2 border-[--text-color] hover:bg-[--projects-color]`}
          >
            {isExpanded ? "Collapse" : "Read More"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
