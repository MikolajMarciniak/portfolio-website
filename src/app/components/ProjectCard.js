import React, { useState } from "react";
import Button from "./Button";
import { Tooltip } from "react-tooltip";
import "tippy.js/dist/tippy.css";
import "../styles/projects.css";

const ProjectCard = ({
  title,
  translation,
  description,
  link,
  imageStatic,
  videoFile,
  githubLink,
  icons,
  isExpanded,
  isDarkMode,
  otherExpanded,
  coverVideo,
  onExpand,
}) => {
  const [isHovered, setHovered] = useState(false);
  return (
    <div
      className={`shadow-2xl  rounded-lg bg-[--foreground-color-dark] 
      transform transition-all duration-500 project-grow w-full h-full`}
    >
      <div
        className="relative inline-block"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <video
          src={`/videos/${videoFile}`}
          className={`rounded w-full aspect-video ${
            coverVideo ? "object-cover" : "object-contain"
          } `}
          poster={`/images/${imageStatic}`}
          controls={isHovered ? true : false}
          playsInline
          preload="auto"
        />
      </div>

      <div className={`p-2`}>
        <div className=" flex flex space-x-2 items-center justify-between">
          <h5 className="mt-2 mb-4 text-2xl font-bold tracking-tight">
            {title}
          </h5>
          <div className="flex space-x-1">
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 transform transition-transform duration-100 hover:scale-105 text-[--text-color] hover:text-[--projects-color]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 22 20"
                  fill="none"
                  stroke="currentColor"
                  width="28"
                  height="28"
                  className="inline-block"
                >
                  <path
                    d="M10 5H8.2C7.08 5 6.52 5 6.09 5.218C5.72 5.41 5.41 5.72 5.22 6.09C5 6.52 5 7.08 5 8.2V15.8C5 16.92 5 17.48 5.22 17.907C5.41 18.284 5.72 18.59 6.09 18.782C6.52 19 7.08 19 8.2 19H15.8C16.92 19 17.48 19 17.907 18.782C18.28 18.59 18.59 18.283 18.78 17.907C19 17.48 19 16.92 19 15.8V14M20 9V4M20 4H15M20 4L13 11"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            )}
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 transform transition-transform duration-100 hover:scale-105 text-[--text-color] hover:text-[--projects-color]"
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
        </div>
        <div
          className={`mb-4 overflow-hidden projects-height ${
            isExpanded ? "max-h-60" : "max-h-12"
          }`}
        >
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>

        <div className="flex">
          <div className="flex mr-2 ml-1 space-x-2 items-center overflow-hidden">
            {icons &&
              icons.map((icon, index) => (
                <React.Fragment key={index}>
                  <img
                    id={`${icon.path}`}
                    data-tooltip-id={`${icon.path}`}
                    data-tooltip-content={icon.label}
                    data-tooltip-place="top"
                    src={`/icons/tech/${
                      icon.path === "react" && !isDarkMode
                        ? "react-dark"
                        : `${icon.path}`
                    }.svg`}
                    alt={icon.label}
                    className={`w-8 h-8 transition-all duration-300 icon ${
                      otherExpanded && index >= 3
                        ? "icon-shrink"
                        : "icon-expand"
                    }`}
                  />
                  <Tooltip id={`${icon.path}`} />
                </React.Fragment>
              ))}
            {otherExpanded && icons.length > 3 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8 cursor-pointer"
                onClick={() => setOtherExpanded(false)}
              >
                <path d="M12 4c0.552 0 1 0.448 1 1v6h6c0.552 0 1 0.448 1 1s-0.448 1-1 1h-6v6c0 0.552-0.448 1-1 1s-1-0.448-1-1v-6h-6c-0.552 0-1-0.448-1-1s0.448-1 1-1h6v-6c0-0.552 0.448-1 1-1z" />
              </svg>
            )}
          </div>
          <div className="flex ml-auto">
            <Button
              onClick={onExpand}
              className="relative inline-flex items-center text-[--projects-color] border-2 border-[--projects-color] overflow-hidden transition-all duration-300 ease-out group"
            >
              <span className="relative z-10 group-hover:text-[--background-color]">
                {isExpanded ? translation.collapse : translation.expand}
              </span>
              <span className="absolute inset-0 w-0 bg-[--projects-color] transition-all duration-300 ease-out group-hover:w-full"></span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
