import React, { useState } from "react";
import Button from "./Button";
import "../styles/projects.css";

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
      className={`shadow-xl rounded-lg bg-[--foreground-color] border-4 
        hover:border-[--projects-color] border-transparent
      transform transition-all duration-500 project-grow w-full h-full`}
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
      <div className={`p-2`}>
        <div className=" flex flex space-x-2 items-center justify-between">
          <h5 className="mt-2 mb-4 text-2xl font-bold tracking-tight">
            {title}
          </h5>
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 -mt-3 transform transition-transform duration-300 hover:scale-110 text-[--text-color] hover:text-[--projects-color]"
          >
            <svg
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
            >
              <path d="M32 6C17.641 6 6 17.641 6 32c0 12.277 8.512 22.56 19.955 25.286-.592-.141-1.179-.299-1.755-.479V50.85c0 0-.975.325-2.275.325-3.637 0-5.148-3.245-5.525-4.875-.229-.993-.827-1.934-1.469-2.509-.767-.684-1.126-.686-1.131-.92-.01-.491.658-.471.975-.471 1.625 0 2.857 1.729 3.429 2.623 1.417 2.207 2.938 2.577 3.721 2.577.975 0 1.817-.146 2.397-.426.268-1.888 1.108-3.57 2.478-4.774-6.097-1.219-10.4-4.716-10.4-10.4 0-2.928 1.175-5.619 3.133-7.792C19.333 23.641 19 22.494 19 20.625c0-1.235.086-2.751.65-4.225 0 0 3.708.026 7.205 3.338C28.469 19.268 30.196 19 32 19s3.531.268 5.145.738c3.497-3.312 7.205-3.338 7.205-3.338.567 1.474.65 2.99.65 4.225 0 2.015-.268 3.19-.432 3.697C46.466 26.475 47.6 29.124 47.6 32c0 5.684-4.303 9.181-10.4 10.4 1.628 1.43 2.6 3.513 2.6 5.85v8.557c-.576.181-1.162.338-1.755.479C49.488 54.56 58 44.277 58 32 58 17.641 46.359 6 32 6zM33.813 57.93C33.214 57.972 32.61 58 32 58 32.61 58 33.213 57.971 33.813 57.93zM37.786 57.346c-1.164.265-2.357.451-3.575.554C35.429 57.797 36.622 57.61 37.786 57.346zM32 58c-.61 0-1.214-.028-1.813-.07C30.787 57.971 31.39 58 32 58zM29.788 57.9c-1.217-.103-2.411-.289-3.574-.554C27.378 57.61 28.571 57.797 29.788 57.9z" />
            </svg>
          </a>
        </div>
        <div
          className={`mb-4 overflow-hidden transition-height duration-1000 ${
            isExpanded ? "max-h-48" : "max-h-12"
          }`}
        >
          <p className="mb-3 break-words whitespace-normal font-semibold">
            {description}
          </p>
        </div>

        <div className="flex">
          <div className="flex space-x-2 items-center">
            {icons &&
              icons.map((path, index) => (
                <img key={index} src={path} className="w-6 h-6" />
              ))}
          </div>
          <div className="ml-auto">
            <Button
              onClick={onExpand}
              className={` inline-flex items-center dark-mode-button hover:text-[--text-color] hover:shadow-lg transition-all duration-500 transform hover:scale-105 border-2 border-[--text-color] hover:bg-[--projects-color]`}
            >
              {isExpanded ? "Collapse" : "Expand"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
