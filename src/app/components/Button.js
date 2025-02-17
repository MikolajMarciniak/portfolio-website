import React from "react";

const Button = ({ href, onClick, className, children }) => {
  const baseClasses =
    "cursor-pointer font-bold rounded-full relative inline-block py-2 px-6 rounded-lg shadow-xl transition-transform transform duration-500";
  if (href) {
    return (
      <a
        href={href}
        className={`${baseClasses} ${className}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={`${baseClasses} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
