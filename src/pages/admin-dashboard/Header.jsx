import React from "react";
import { FaBell, FaCog, FaSearch } from "react-icons/fa"; // Importation des icônes

function Header() {
  return (
    <header className="flex items-center justify-between bg-gray-700 p-4">
      {/* Logo & Nom de l'entreprise */}
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="Logo" className="h-10 w-10 object-contain" />
        <span className="text-lg font-semibold text-gray-100">StageFlow</span>
      </div>

      {/* Champ de recherche */}
      <div className="flex-1 max-w-md mx-4 relative">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Rechercher un stagiaire..."
          className="w-full pl-10 pr-4 py-2 border-thin border-gray-300 text-size12  rounded-xs focus:outline-none focus:ring-1 focus:ring-secondary transition-all ease-in-out duration-300"
        />
      </div>

      {/* Notifications et Profil utilisateur */}
      <div className="flex items-center gap-4">
        {/* Icône de notifications */}
        <div className="relative">
          <FaBell
            className="text-gray-600 cursor-pointer hover:text-blue-500 transition duration-300 ease-in-out"
            size={20}
            aria-label="Notifications"
          />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">3</span>
        </div>

        {/* Profil utilisateur avec badge Admin */}
        <div className="flex items-center gap-2">
          <img
            src="/user-avatar.jpg"
            alt="User"
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <span className="text-gray-800 font-medium">Admin</span>
            <span className="text-sm text-gray-500">StageFlow Administrator</span>
          </div>
        </div>

        {/* Icône de paramètres */}
        <FaCog
          className="text-gray-600 cursor-pointer hover:text-blue-500 transition duration-300 ease-in-out"
          size={20}
          aria-label="Settings"
        />
      </div>
    </header>
  );
}

export default Header;
