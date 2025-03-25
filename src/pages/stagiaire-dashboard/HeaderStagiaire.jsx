import { useState, useEffect } from "react";
import { UserCircle, ChevronDown } from "lucide-react";
import { FaUserCog } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa"; // Import the search icon
import Logout from "../../components/Logout";
import Profile from "./profile";
import Notifications from "./Notifications";
import SearchModal from "./SearchModal"; // Import the search modal

const HeaderStagiaire = () => {
  const [companyInfo, setCompanyInfo] = useState({ name: "", logo: "" });
  const [user, setUser] = useState({ name: "John Doe", avatar: "https://i.pravatar.cc/40" });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isProfilModalOpen, setIsProfilModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Track search query

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleCloseLogoutModale=()=>{
    setIsLogoutModalOpen(false);
  }


  const handleProfileClick = () => {
    setIsProfilModalOpen(true);
  };

  const handleCloseProfileModale = () => {
    setIsProfilModalOpen(false);
  };

  useEffect(() => {
    // Fetch company data
    fetch("/api/company")
      .then((response) => response.json())
      .then((data) => {
        setCompanyInfo({ name: data.name, logo: data.logo });
      })
      .catch((error) => console.error("Error fetching company data:", error));

    // Fetch user data
    fetch("/api/user")
      .then((response) => response.json())
      .then((data) => {
        setUser({ name: data.name, avatar: data.avatar });
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  return (
    <header className="flex justify-between items-center h-16 bg-white px-8 py-4 border-b border-gray-200">
      {/* Logo et Nom de l'entreprise */}
      <div className="flex items-center space-x-4">
        {companyInfo.logo ? (
          <img src={companyInfo.logo} alt="Logo" className="h-8" />
        ) : (
          <div className="h-12 w-12 bg-orange-400 flex rounded-full items-center justify-center text-white font-logoFont text-size10">
            logo
          </div>
        )}
        <h2 className="text-lg font-bold">{companyInfo.name || "Nom de l'entreprise"}</h2>
      </div>

      {/* Centre: Message de bienvenue */}
      <div className="flex-grow text-center">
        <h2 className="text-lg font-semibold text-gray-700">Bienvenue, {user.name} 👋</h2>
      </div>

      {/* Droite: Recherche, Notification et Profil */}
      <div className="flex items-center space-x-4">
        {/* Recherche avec icon */}
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="search"
            className="pl-10 rounded p-2 text-sm border-1 bg-gray-100 border-gray-300 focus:outline-none"
            placeholder="Rechercher"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Icône de notification */}
        <Notifications />

        {/* Profil utilisateur et menu déroulant */}
        <div
          className="relative"
          onMouseOver={() => setIsMenuOpen(true)}
          onMouseOut={() => setIsMenuOpen(false)}
        >
          <div className="flex items-center space-x-2 cursor-pointer p-2 rounded-md hover:bg-gray-100 transition-all duration-300">
            {user.avatar ? (
              <img className="h-10 w-10 rounded-full border" src={user.avatar} alt="Avatar" />
            ) : (
              <UserCircle className="h-10 w-10 text-gray-500" />
            )}
            <p className="font-semibold">{user.name}</p>
            <ChevronDown className="h-5 w-5 text-red-500" />
          </div>

          {/* Animation smooth du menu déroulant */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute right-0 top-12 mt-2 w-40 bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <ul className="text-gray-700">
                <li onClick={handleProfileClick} className="px-4 py-2 flex items-center space-x-4 hover:bg-gray-100 cursor-pointer">
                  <FaUserCog className="h-6 w-6 text-indigo-800" />
                  <span>Profil</span>
                </li>
                <li onClick={handleLogoutClick} className="px-4 py-2 flex items-center space-x-4 hover:bg-gray-100 cursor-pointer">
                  <BiLogOut className="h-6 w-6 text-indigo-800" />
                  <span>Déconnexion</span>
                </li>
              </ul>
            </motion.div>
          )}
        </div>
      </div>

      <Logout
        isLogoutModalOpen={isLogoutModalOpen}
        onCancel={handleCloseLogoutModale}
      />
      <Profile
        isOpen={isProfilModalOpen}
        onClose={handleCloseProfileModale}
        user={{
          name: "Ahmed",
          email: "ahmed@gmail.com",
          phone: "988777783",
          school: "ENSAA",
          field: "G. Info4",
          level: "2 eme annee CI",
        }}
      />

      {/* Display Search Modal */}
      {searchQuery && <SearchModal query={searchQuery} onClose={() => setSearchQuery('')} />}
    </header>
  );
};

export default HeaderStagiaire;
