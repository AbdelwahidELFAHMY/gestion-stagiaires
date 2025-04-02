import { AiOutlineRight } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import HeaderInfo from "./HeaderInfo";

export default function Header({ isDarkMode, setIsDarkMode, activeTab }) {
  return (
    <header
      className={`flex items-center justify-between dark:bg-gray-900 bg-white pl-2 pr-6 py-2.5 border-b dark:border-gray-500 border-gray-200 ${
        isDarkMode ? "dark" : "bg-white"
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="text-size13 font-semibold text-gray-800 dark:text-gray-400 flex justify-center items-center">
          <AiOutlineRight size={13} />
          <AiOutlineRight size={13} />
          &nbsp; &nbsp;
          {activeTab.toUpperCase()}
        </span>
      </div>

      <div className="flex items-center gap-5">
        {/* Wrapper div around the button */}
        <div
          className="relative cursor-pointer flex items-center justify-center w-12 h-6  bg-indigo-900 dark:bg-gray-400 rounded-full transition-all ease-in-out duration-500"
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          {/* Button that will translate inside the div */}
          <button
            className={`cursor-pointer absolute w-5 h-5 rounded-full transition-transform duration-500 ease-in-out ${
              isDarkMode ? "-translate-x-3" : "bg-gray-500  translate-x-3"
            }`}
          >
            {isDarkMode ? (
              <FaSun size={18} style={{ color: "yellow" }} />
            ) : (
              <FaMoon size={18} style={{ color: "#F5F5F5" }} />
            )}
          </button>
        </div>

        <HeaderInfo />
      </div>
    </header>
  );
}
