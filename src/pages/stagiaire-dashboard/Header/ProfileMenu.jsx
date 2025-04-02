import { useState, useEffect } from "react";
import { ChevronDown, UserCircle2 } from "lucide-react";
import { FaUserCog } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { motion } from "framer-motion";
import { getUsernameFromToken } from "../../../utils/getUsernameFromToken";
import Profile from "./profile";
import Logout from "../../../components/Logout";
import axiosInstance from "../../../utils/axiosInstance";
import GetImageFromURL from "../../../utils/getImageFromURL";

const ProfileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
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

  const handleProfileClick = () => {
    setIsProfileModalOpen(true);
  };

  const handleCloseProfileModal = () => {
    setIsProfileModalOpen(false);
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
            logoUrl={userData.photo} 
            alt="User photo" 
            className="h-10 w-10 rounded-full border"
          />
        ) : (
          <UserCircle2 className="h-10 w-10 text-neutral-800" />
        )}
        <p className="font-semibold">
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
              onClick={handleProfileClick} 
              className="px-4 py-2 flex items-center space-x-4 hover:bg-gray-100 cursor-pointer"
            >
              <FaUserCog className="h-6 w-6 text-indigo-800" />
              <span>Profil</span>
            </li>
            <li 
              onClick={handleLogoutClick} 
              className="px-4 py-2 flex items-center space-x-4 hover:bg-gray-100 cursor-pointer"
            >
              <BiLogOut className="h-6 w-6 text-indigo-800" />
              <span>Déconnexion</span>
            </li>
          </ul>
        </motion.div>
      )}

      <Logout
        isLogoutModalOpen={isLogoutModalOpen}
        onCancel={handleCloseLogoutModal}
      />
      <Profile
        isOpen={isProfileModalOpen}
        onClose={handleCloseProfileModal}
        user={{
          name: userData ? `${userData.prenom} ${userData.nom}` : "Utilisateur",
          email: "ahmed@gmail.com", // À remplacer par les données réelles
          phone: "988777783",
          school: "ENSAA",
          field: "G. Info4",
          level: "2 eme annee CI",
        }}
      />
    </div>
  );
};

export default ProfileMenu;