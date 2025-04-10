import { useState, useEffect } from "react";
import { ChevronDown, UserCircle2 } from "lucide-react";
import { BiLogOut } from "react-icons/bi";
import { motion } from "framer-motion";
import { getUsernameFromToken } from "../../../utils/getUsernameFromToken";
import Logout from "../../../components/Logout";
import axiosInstance from "../../../utils/axiosInstance";
import GetImageFromURL from "../../../utils/getImageFromURL";

const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const username = getUsernameFromToken();

  // Récupération des données utilisateur
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(`/stagiaires/stagiaire_header_info/${username}`);
        setUserData(response.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchUserData();
    }
  }, [username]);

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleCloseLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  if (loading) {
    return (
      <div className="flex items-center space-x-2 p-2">
        <div className="h-12 w-12 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="h-12 w-24 bg-gray-200 rounded animate-pulse"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center space-x-2 p-2 text-red-500">
        <UserCircle2 className="h-12 w-12" />
        <span>Error</span>
      </div>
    );
  }

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
          <UserCircle2 className="h-11 w-11 text-neutral-800" />
        )}
        <p className="text-size11 font-semibold">
          {userData ? `${userData.prenom} ${userData.nom}` : username || "Utilisateur"}
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