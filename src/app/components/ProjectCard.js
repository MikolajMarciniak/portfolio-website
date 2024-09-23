import React, { useState } from "react";

const ProjectCard = ({ title, description, link, imageStatic, imageGif }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="max-w-sm border border-gray-200 rounded-lg bg-[--projects-color] transform transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a href={link} target="_blank" rel="noopener noreferrer">
        <img
          className="rounded-t-lg w-full"
          src={isHovered ? imageGif : imageStatic}
          alt={title}
        />
      </a>
      <div className="p-5 text-white">
        <a href={link} target="_blank" rel="noopener noreferrer">
          <h5 className="mb-2 text-2xl font-bold tracking-tight">{title}</h5>
        </a>
        <p className="mb-3 font-normal">{description}</p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800"
        >
          Read more
          <svg
            className="w-3.5 h-3.5 ml-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
