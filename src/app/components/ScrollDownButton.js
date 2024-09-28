import { Link } from "react-scroll";

const ScrollDownButton = ({ isdarkmode, isScrolled }) => {
  return (
    <div
      className={`relative w-full flex justify-center items-end pb-10 transition-all duration-300 ease-in-out ${
        isScrolled && "opacity-0"
      }`}
    >
      <Link
        to="about"
        smooth={true}
        duration={500}
        offset={-100}
        className={`transition-transform transform hover:scale-110 border-4 border-[--landing-color] rounded-full cursor-pointer flex items-center justify-center`}
      >
        <button
          className={` scroll-button bg-[var(--landing-color)] dark-mode-button px-3 py-3 text-lg font-semibold rounded-full transition-all ease-in-out duration-300 hover:shadow-lg ${
            isdarkmode ? "dark" : "light"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
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
