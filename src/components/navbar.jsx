import { NavLink } from "react-router-dom";
import Logo from "../assets/logo";

const linkClasses = ({ isActive }) =>
  ` transition duration-300 ${
    isActive ? "text-indigo-300 font-semibold" : "text-white hover:text-indigo-300"
  }`;

const Navbar = () => {
  return (
    <div className="w-full bg-transparent text-white">
      <div className="font-maFont text-size12 max-w-screen-xl mx-auto px-10 pt-7">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <div className="text-lg font-bold z-50">
            <Logo />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-12 z-50">
            <NavLink to="/" className={linkClasses}>
              Accueil
            </NavLink>
            <NavLink to="/contact" className={linkClasses}>
            Nos Services
            </NavLink>
            <NavLink to="/about" className={linkClasses}>
              Offres de Stage
            </NavLink>
            <NavLink to="/about" className={linkClasses}>
              À propos
            </NavLink>
            <NavLink to="/contact" className={linkClasses}>
              Contact
            </NavLink>
          </nav>

          {/* Bouton de connexion */}
          <div className="z-50">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-size12 font-semibold transition duration-300 ${
                  isActive ? "bg-gray-200 text-blue-900 shadow-md" : "bg-white text-blue-900 hover:bg-gray-200"
                }`
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
