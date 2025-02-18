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
  const [activeItem, setActiveItem] = useState("StageProgress");
  const [showMembers, setShowMembers] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
    setActiveComponent(itemName);
  };

  return (
    <motion.div
    animate={{ width: isOpen ? 200 : 80 }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
      className="h-screen bg-white shadow-lg relative border-r border-gray-200"
    >
      {/* Bouton pour ouvrir/fermer la sidebar */}
      <motion.button
        onClick={toggleSidebar}
        className="absolute right-[-10px] top-0 cursor-pointer bg-gray-200 hover:bg-gray-400 text-blue-600 p-1.5 rounded-full shadow-md transition-all "
        transition={{ duration: 0.3 }}
      >
        {isOpen ? <AiOutlineLeft size={9} /> : <AiOutlineRight size={9} />}
      </motion.button>

      {/* Menu de navigation */}
      <nav className="mt-10 flex flex-col gap-2 px-4">
        <SidebarItem
          isOpen={isOpen}
          icon={<MdDashboard size={20} />}
          text="Dashboard"
          onClick={() => handleItemClick("StageProgress")}
          isActive={activeItem === "StageProgress"}
        />
        <SidebarItem
          isOpen={isOpen}
          icon={<MdDescription size={20} />}
          text="Documents"
          onClick={() => handleItemClick("Documents")}
          isActive={activeItem === "Documents"}
        />
        <SidebarItem
          isOpen={isOpen}
          icon={<MdCheckCircle size={20} />}
          text="Présence"
          onClick={() => handleItemClick("Presence")}
          isActive={activeItem === "Presence"}
        />
        <SidebarItem
          isOpen={isOpen}
          icon={<MdTaskAlt size={20} />}
          text="Tâches"
          onClick={() => handleItemClick("Tasks")}
          isActive={activeItem === "Tasks"}
        />
        <SidebarItem
          isOpen={isOpen}
          icon={<MdEvent size={20} />}
          text="Agenda"
          onClick={() => handleItemClick("Agenda")}
          isActive={activeItem === "Agenda"}
        />
        <SidebarItem
          isOpen={isOpen}
          icon={<MdBook size={20} />}
          text="Ressources"
          onClick={() => handleItemClick("Resources")}
          isActive={activeItem === "Resources"}
        />

        {/* Section des membres */}
        <div
          className="relative"
          onMouseEnter={() => setShowMembers(true)}
          onMouseLeave={() => setShowMembers(false)}
        >
          <motion.div
            className="flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-blue-500 hover:text-white"
          >
            <div className="flex items-center space-x-3">
              <span className="w-6 flex justify-center">
                <MdGroup size={20} />
              </span>
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="text-sm font-medium whitespace-nowrap"
                >
                  Members
                </motion.span>
              )}
            </div>
            {isOpen && (
              <span>{showMembers ? <AiOutlineDown size={10} /> : <AiOutlineRight size={10} />}</span>
            )}
          </motion.div>

          <AnimatePresence>
            {showMembers && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className=" overflow-y-scroll scrollbar-thin absolute w-44 h-44 bg-white shadow-lg rounded-lg p-3 border border-gray-200 z-10"
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
    </motion.div>
  );
};

export default SidebarStagiaire;

// Composant SidebarItem avec animations fluides
const SidebarItem = ({ isOpen, icon, text, onClick, isActive }) => {
  return (
    <motion.div
      onClick={onClick}
      className={`flex items-center p-3 rounded-md cursor-pointer transition-all duration-300 overflow-hidden
        ${isActive ? "bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-300 text-white shadow-glow" : "hover:bg-gray-100"}`}
      whileHover={{ scale: 1.01 }}
    >
      <motion.span
        className={`w-6 flex justify-center ${isActive ? "text-white" : "text-gray-800"}`}
        animate={{ color: isActive ? "#c9cdff" : "#1f2937" }}
        transition={{ duration: 0.3 }}
      >
        {icon}
      </motion.span>

      {isOpen && (
        <motion.span
          className="text-sm font-medium whitespace-nowrap ml-3"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.3 }}
        >
          {text}
        </motion.span>
      )}
    </motion.div>
  );
};

// Liste des membres fictive (à remplacer par des données réelles)
const membersList = [
  { name: "Alice Dupont", image: "https://randomuser.me/api/portraits/women/1.jpg" },
  { name: "Marc Durand", image: "https://randomuser.me/api/portraits/men/2.jpg" },
  { name: "Sophie Martin", image: "https://randomuser.me/api/portraits/women/3.jpg" },
  { name: "Jean-Pierre Bernard", image: "https://randomuser.me/api/portraits/men/4.jpg" },
];
