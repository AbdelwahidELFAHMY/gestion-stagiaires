import { useState } from "react";
import { ChevronDown, User2 } from "lucide-react";
import { BiLogOut } from "react-icons/bi";
import { motion } from "framer-motion";
import Logout from "../../../components/Logout";
import axiosInstance from "../../../utils/axiosInstance";
import GetImageFromURL from "../../../utils/getImageFromURL";

const Menu = ({userData}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleCloseLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  return (
    <div
      className="relative"
      onMouseOver={() => setIsMenuOpen(true)}
      onMouseOut={() => setIsMenuOpen(false)}
    >
      <div className="flex items-center space-x-2 cursor-pointer p-2 rounded-md hover:bg-gray-100 transition-all duration-300">
        {userData?.photo ? (
          <GetImageFromURL 
          logoUrl={`${axiosInstance.defaults.baseURL.replace(
            "/api",
            ""
          )}/photos/${userData.photo.replace("photos/", "")}`}
            alt="photo" 
            className="h-11 w-11 rounded-full border-thin object-cover"
          />
        ) : (
          <div className="p-1 bg-gray-200 border-thin border-gray-300 rounded-full">
          <User2 className="h-8 w-8 text-neutral-700" />
          </div>
        )}
        <p className="text-size13 font-semibold">
          {userData ? `${userData.prenom} ${userData.nom}` : "Utilisateur"}
        </p>
        <ChevronDown className="h-5 w-5 text-red-500" />
      </div>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute right-0 top-12 mt-2 w-40 bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <ul className="text-gray-700">
            <li 
              onClick={handleLogoutClick} 
              className="px-4 py-2 text-size12 flex items-center space-x-4 hover:bg-gray-100 cursor-pointer"
            >
              <BiLogOut size={20}/>
              <span>Déconnexion</span>
            </li>
          </ul>
        </motion.div>
      )}

      <Logout
        isLogoutModalOpen={isLogoutModalOpen}
        onCancel={handleCloseLogoutModal}
      />
    </div>
  );
};

export default Menu;