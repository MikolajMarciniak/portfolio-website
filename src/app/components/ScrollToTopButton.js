import { Link } from "react-scroll";

const ScrollToTopButton = ({ isDarkMode, isScrolled }) => {
  return (
    <div
      className={`fixed z-20 bottom-6 right-8 transition-all duration-500 ease-in-out ${
        !isScrolled && "opacity-0"
      }`}
    >
      <Link to="landing" smooth={true} duration={500}>
        <button
          className={`accent opacity-25 hover:opacity-100 bg-[--accent-color] text-[--background-color] border-[--accent-color] border-4 px-4 py-4 rounded-full transition-all ease-in-out duration-500 hover:shadow-xl ${
            isDarkMode ? "dark" : "light"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
            style={{ transform: "rotate(180deg)" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </Link>
    </div>
  );
};

export default ScrollToTopButton;
