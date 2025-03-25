import { AiOutlineRight } from "react-icons/ai";
import { FaBell, FaMoon, FaSun } from "react-icons/fa";

export default function Header({ isDarkMode, setIsDarkMode, activeTab }) {

  const admin ={ name: "John Doe", avatar: "https://i.pravatar.cc/40" };
  return (
    <header
      className={`flex items-center justify-between dark:bg-gray-900 bg-white pl-2 pr-6 py-3 border-b dark:border-gray-500 border-gray-200 ${
        isDarkMode ? "dark" : "bg-white"
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="text-size13 font-semibold text-gray-800 dark:text-gray-400 flex justify-center items-center">
          <AiOutlineRight size={13} />
          <AiOutlineRight size={13} />
          &nbsp;
          &nbsp;
          {activeTab.toUpperCase()}
        </span>
      </div>

      <div className="flex items-center gap-5">
        {/* Wrapper div around the button */}
        <div
          className="relative cursor-pointer flex items-center justify-center w-14 h-7  bg-indigo-900 dark:bg-gray-400 rounded-full transition-all ease-in-out duration-500"
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          {/* Button that will translate inside the div */}
          <button
            className={`cursor-pointer absolute w-6 h-6 rounded-full transition-transform duration-500 ease-in-out ${
              isDarkMode ? "-translate-x-3" : "bg-gray-500  translate-x-3"
            }`}
          >
            {isDarkMode ? (
              <FaSun size={20} style={{ color: "yellow" }} />
            ) : (
              <FaMoon size={20} style={{ color: "#F5F5F5" }} />
            )}
          </button>
        </div>

        <div className="relative">
          <FaBell
            className="dark:text-gray-400 text-gray-600 cursor-pointer hover:text-blue-500 transition duration-300 ease-in-out"
            size={22}
          />
          <span className="absolute bottom-2.5 left-3 bg-red-500 text-white text-xs rounded-full px-1">
            3
          </span>
        </div>
        <div className="flex items-center gap-4">
          <img
            src={admin.avatar}
            alt="User"
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <span className="text-gray-700 dark:text-gray-300 font-medium">{admin.name}</span>
            <span className="text-size12 font-semibold dark:text-neutral-400 text-gray-600">
              StageFlow Administrator
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
