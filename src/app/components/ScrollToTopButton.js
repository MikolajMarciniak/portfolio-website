import { Link } from "react-scroll";

const ScrollToTopButton = ({ isdarkmode, isScrolled }) => {
  return (
    <div
      className={`fixed bottom-6 right-8 transition-all duration-500 ease-in-out ${
        !isScrolled && "opacity-0"
      }`}
    >
      <Link to="landing" smooth={true} duration={500}>
        <button
          className={`scroll-button border-4 border-[--accent-color] scroll-up round dark-mode-button px-3 py-3 text-lg font-bold rounded-full transition-transform transform hover:scale-110 ease-in-out duration-500 
            hover:shadow-lg ${isdarkmode ? "dark" : "light"}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
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
