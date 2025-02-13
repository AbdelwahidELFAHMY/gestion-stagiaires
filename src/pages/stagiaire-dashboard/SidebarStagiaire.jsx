import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MdDashboard,
  MdDescription,
  MdCheckCircle,
  MdTaskAlt,
  MdEvent,
  MdBook,
  MdGroup,
} from "react-icons/md";
import { AiOutlineLeft, AiOutlineRight, AiOutlineDown } from "react-icons/ai";

const SidebarStagiaire = ({ setActiveComponent }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isTextVisible, setIsTextVisible] = useState(true);
  const [activeItem, setActiveItem] = useState("StageProgress");
  const [showMembers, setShowMembers] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsTextVisible(true), 200);
    } else {
      setIsTextVisible(false);
    }
  }, [isOpen]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
    setActiveComponent(itemName);
  };

  return (
    <div
      className={`h-screen bg-white shadow-lg transition-all duration-500 ${
        isOpen ? "w-50" : "w-20"
      } relative border-r border-gray-200`}
    >
      <button
        onClick={toggleSidebar}
        className="absolute right-[-13px] top-0 bg-gray-200 cursor-pointer hover:bg-gray-400 text-blue-600 p-2 rounded-full shadow-md transition-all"
      >
        {isOpen ? <AiOutlineLeft size={10} /> : <AiOutlineRight size={10} />}
      </button>

      <nav className="mt-10 flex flex-col gap-2 px-4 min-w-full max-w-full">
        <SidebarItem
          isTextVisible={isTextVisible}
          icon={<MdDashboard size={20} />}
          text="Dashboard"
          onClick={() => handleItemClick("StageProgress")}
          isActive={activeItem === "StageProgress"}
        />
        <SidebarItem
          isTextVisible={isTextVisible}
          icon={<MdDescription size={20} />}
          text="Documents"
          onClick={() => handleItemClick("Documents")}
          isActive={activeItem === "Documents"}
        />
        <SidebarItem
          isTextVisible={isTextVisible}
          icon={<MdCheckCircle size={20} />}
          text="Présence"
          onClick={() => handleItemClick("Presence")}
          isActive={activeItem === "Presence"}
        />
        <SidebarItem
          isTextVisible={isTextVisible}
          icon={<MdTaskAlt size={20} />}
          text="Tâches"
          onClick={() => handleItemClick("Tasks")}
          isActive={activeItem === "Tasks"}
        />
        <SidebarItem
          isTextVisible={isTextVisible}
          icon={<MdEvent size={20} />}
          text="Agenda"
          onClick={() => handleItemClick("Agenda")}
          isActive={activeItem === "Agenda"}
        />
        <SidebarItem
          isTextVisible={isTextVisible}
          icon={<MdBook size={20} />}
          text="Ressources"
          onClick={() => handleItemClick("Resources")}
          isActive={activeItem === "Resources"}
        />

        <div
          className="relative"
          onMouseEnter={() => setShowMembers(true)}
          onMouseLeave={() => setShowMembers(false)}
        >
          <motion.div
            className="flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-300 hover:text-white"
          >
            <div className="flex items-center space-x-3">
              <span className="w-6 flex justify-center">
                <MdGroup size={20} />
              </span>
              {isTextVisible && (
                <motion.span
                  className=" text-sm font-medium whitespace-nowrap"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  Members
                </motion.span>
              )}
            </div>
            {isTextVisible && (
              <span>{showMembers ? <AiOutlineDown size={11} color="white" /> : <AiOutlineRight size={11} color="white" />}</span>
            )}
          </motion.div>
          <AnimatePresence>
            {showMembers && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="overflow-y-scroll scrollbar-thin w-40 h-44 bg-white shadow-lg rounded-lg p-3 border border-gray-200 z-10"
              >
                <ul>
                  {membersList.map((member, index) => (
                    <motion.li
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className="flex cursor-pointer items-center space-x-2 hover:bg-gray-100 p-2 rounded-md"
                    >
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-size11 text-gray-800">{member.name}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </div>
  );
};
export default SidebarStagiaire;

// Composant SidebarItem avec animation d'écriture progressive
const SidebarItem = ({ isTextVisible, icon, text, onClick, isActive }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between p-3 rounded-md cursor-pointer transition-all duration-300 overflow-hidden
        ${isActive || isHovered
        ? "bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-300 text-white shadow-lg"
        : "hover:bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-300 hover:text-white"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center space-x-3">
        <span
          className={`w-6 flex justify-center ${isActive || isHovered ? "text-blue-100" : "text-gray-800"}`}
        >
          {icon}
        </span>
        {isTextVisible && (
          <motion.span
            className="text-sm font-medium whitespace-nowrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
          >
            {text}
          </motion.span>
        )}
      </div>
    </div>
  );
};

// Liste des membres fictive (à remplacer par des données réelles)
const membersList = [
  {
    name: "Alice Dupont",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    name: "Marc Durand",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    name: "Sophie Martin",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    name: "Jean-Pierre Bernard",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
  },
];

