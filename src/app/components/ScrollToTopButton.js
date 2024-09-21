import { Link } from "react-scroll";

const ScrollToTopButton = ({ isDarkMode }) => {
  return (
    <div className="fixed bottom-4 right-6">
      <Link
        to="landing"
        smooth={true}
        duration={500}
        className={`transition-transform transform hover:scale-150 cursor-pointer flex items-center justify-center w-12 h-12 dark-mode-button scroll-top rounded-full bg-[var(--background-color)] ${
          isDarkMode ? "dark" : "light"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 4l8 8H4l8-8z" fill="currentColor" />
        </svg>
      </Link>
    </div>
  );
};

export default ScrollToTopButton;
