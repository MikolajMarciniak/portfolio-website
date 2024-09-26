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
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`shadow-2xl w-full rounded-lg bg-[--foreground-color] border-4 ${
        isHovered ? "border-[--projects-color]" : "border-transparent"
      } transform transition-all duration-500`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a href={link} target="_blank" rel="noopener noreferrer">
        <img
          className="rounded-lg w-full h-auto object-cover"
          src={`/gifs/${isHovered ? imageGif : imageStatic}`}
          alt={title}
        />
      </a>
      <div className="p-2 mb-4 ml-2">
        <div className="pt-2 flex items-center justify-between">
          <a href={link} target="_blank" rel="noopener noreferrer">
            <h5 className="mb-2 text-2xl font-bold tracking-tight">{title}</h5>
          </a>
          <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mr-2 transform transition-transform duration-300 hover:scale-125 text-[--text-color] hover:text-[--projects-color]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path d="M12 .296C5.373.296 0 5.67 0 12.296c0 5.302 3.438 9.8 8.207 11.387.599.11.793-.26.793-.577v-2.17c-3.338.726-4.042-1.61-4.042-1.61-.546-1.388-1.333-1.757-1.333-1.757-1.09-.746.083-.73.083-.73 1.204.085 1.837 1.237 1.837 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.774.419-1.305.763-1.605-2.665-.304-5.466-1.333-5.466-5.931 0-1.31.468-2.381 1.236-3.221-.123-.304-.536-1.527.118-3.18 0 0 1.008-.323 3.3 1.23a11.44 11.44 0 0 1 3.005-.404c1.02.005 2.046.137 3.005.404 2.292-1.554 3.3-1.23 3.3-1.23.655 1.653.242 2.876.118 3.18.77.84 1.236 1.91 1.236 3.221 0 4.61-2.803 5.623-5.475 5.921.43.372.814 1.103.814 2.222v3.293c0 .32.192.694.801.576C20.565 22.095 24 17.598 24 12.296 24 5.67 18.627.296 12 .296z" />
            </svg>
          </a>
        </div>
        <p className="mb-3 font-semibold">{description}</p>

        <div className="flex space-x-2 mb-3">
          {icons &&
            icons.map((path, index) => (
              <img key={index} src={path} className="w-6 h-6" />
            ))}
        </div>

        <div className="flex justify-end">
          <Button
            href={link}
            className="mr-2 inline-flex items-center dark-mode-button hover:text-[--text-color] hover:shadow-lg transition-transform transform hover:scale-110 border-2 border-[--text-color] hover:bg-[--projects-color]"
          >
            Read More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
