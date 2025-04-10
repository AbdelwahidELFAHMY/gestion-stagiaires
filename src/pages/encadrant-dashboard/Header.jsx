// src/components/encadrant/Header.jsx
import { Menu, Bell, User, Search } from 'lucide-react';

export default function Header({ title, onMenuClick, isMobile }) {
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Left side */}
        <div className="flex items-center">
          {isMobile && (
            <button 
              onClick={onMenuClick}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 mr-2"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}
          <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
        </div>
        
        {/* Right side */}
        <div className="flex items-center space-x-3">
          <button 
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            aria-label="Rechercher"
          >
            <Search className="h-5 w-5" />
          </button>
          
          <button 
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 relative"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          
          <div className="relative group">
            <button 
              className="flex items-center space-x-2 focus:outline-none"
              aria-label="Profil utilisateur"
            >
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="h-4 w-4 text-blue-600" />
              </div>
              <span className="hidden md:inline text-sm font-medium">Encadrant</span>
            </button>
            
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 invisible group-focus-within:visible group-hover:visible">
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Mon Profil</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Déconnexion</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}