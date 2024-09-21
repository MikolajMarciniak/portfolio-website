import React from "react";

const ProjectCard = ({ title, description, link, image }) => (
  <div className="max-w-sm border border-gray-200 rounded-lg bg-gray-800">
    <a href={link} target="_blank" rel="noopener noreferrer">
      <img className="rounded-t-lg w-full" src={image} alt={title} />
    </a>
    <div className="p-5">
      <a href={link} target="_blank" rel="noopener noreferrer">
        <h5 className="mb-2 text-2xl font-bold tracking-tight ">{title}</h5>
      </a>
      <p className="mb-3 font-normal">{description}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Read more
        <svg
          className="w-3.5 h-3.5 ms-2"
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

export default ProjectCard;
