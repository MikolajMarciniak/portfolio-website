import { Link } from "react-scroll";

const ScrollToBottomButton = ({ isDarkMode }) => {
  return (
    <div
      className={`relative w-full flex justify-center items-end pb-10`} // Ensures the button is inside the container
    >
      <Link
        to="about"
        smooth={true}
        duration={500}
        offset={-100}
        className={`transition-transform transform hover:scale-110 cursor-pointer flex items-center justify-center w-auto h-auto dark-mode-button`}
      >
        <button
          className={`px-6 py-3 text-lg font-semibold rounded-full transition-all ease-in-out duration-300 bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg ${
            isDarkMode ? "dark:bg-gray-800 dark:text-gray-100" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
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

export default ScrollToBottomButton;
