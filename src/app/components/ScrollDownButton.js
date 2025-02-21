import { Link } from "react-scroll";

const ScrollDownButton = ({ isDarkMode, isScrolled }) => {
  return (
    <div
      className={`relative w-full flex  justify-center items-end pb-10 transition-all duration-300 ease-in-out ${
        isScrolled && "opacity-0"
      }`}
    >
      <Link
        to="about"
        smooth={true}
        duration={500}
        offset={-70}
        className={`transition-transform transform hover:scale-105 rounded-full cursor-pointer flex items-center justify-center`}
      >
        <button
          className={`landing text-[--background-color] opacity-25 hover:opacity-100 bg-[--landing-color] border-[--landing-color] border-4 px-4 py-4 rounded-full transition-all ease-in-out duration-300 hover:shadow-xl ${
            isDarkMode ? "dark" : "light"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
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

export default ScrollDownButton;
