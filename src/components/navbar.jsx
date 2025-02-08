import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="top-0 left-0 w-full bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 text-white z-50">
      <div className="max-w-screen-xl mx-auto px-10 pt-7">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <div className="text-lg font-bold flex-1">
            Gestion Stagiaires
          </div>

          {/* Navigation */}
          <div className="space-x-6 hidden md:flex flex-1 justify-center">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                isActive 
                  ? "text-indigo-300 border-b-2 border-indigo-300 pb-1 transition duration-300" 
                  : "text-white hover:text-indigo-300 transition duration-300"
              }
            >
              Accueil
            </NavLink>

            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                isActive 
                  ? "text-indigo-300 border-b-2 border-indigo-300 pb-1 transition duration-300" 
                  : "text-white hover:text-indigo-300 transition duration-300"
              }
            >
              Contact
            </NavLink>

            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                isActive 
                  ? "text-indigo-300 border-b-2 border-indigo-300 pb-1 transition duration-300" 
                  : "text-white hover:text-indigo-300 transition duration-300"
              }
            >
              À propos
            </NavLink>
          </div>

          {/* Bouton de connexion */}
          <div className="flex-1 flex justify-end">
            <NavLink 
              to="/login" 
              className={({ isActive }) => 
                isActive 
                  ? "bg-gray-200 text-blue-900 px-4 py-2 rounded-lg font-semibold transition duration-300" 
                  : "bg-white text-blue-900 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition duration-300"
              }
            >
              Se connecter
            </NavLink>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Navbar;
