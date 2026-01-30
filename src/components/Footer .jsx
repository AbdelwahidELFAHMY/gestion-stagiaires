import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { FaTwitter, FaGithub, FaDiscord, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const socialLinks = [
    { icon: <FaTwitter className="w-5 h-5" />, url: "#" },
    {
      icon: <FaGithub className="w-5 h-5" />,
      url: "https://github.com/AbdelwahidELFAHMY",
    },
    { icon: <FaDiscord className="w-5 h-5" />, url: "#" },
    {
      icon: <FaLinkedin className="w-5 h-5" />,
      url: "https://www.linkedin.com/in/abdelwahid-el-fahmy-6578232aa/",
    },
  ];

  const footerLinks = [
    {
      title: "Produit",
      links: ["Fonctionnalités", "Tarifs", "API"],
    },
    {
      title: "Entreprise",
      links: ["À propos", "Blog", "Carrières"],
    },
    {
      title: "Légal",
      links: ["Confidentialité", "Conditions", "Cookies"],
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-indigo-950 to-blue-950 relative overflow-hidden">
      {/* Effet d'arrière-plan cosmique */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-blue-400 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-40 h-40 rounded-full bg-indigo-600 blur-3xl"></div>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-10 py-16 relative z-10">
        {/* Contenu principal */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Logo et description */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <motion.div
                className="h-10 w-10 bg-gradient-to-r from-blue-400 via-violet-400 to-indigo-400 rounded-lg flex items-center justify-center"
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <GraduationCap size={24} className="text-gray-900" />
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-gray-400 bg-clip-text text-transparent" style={{ fontFamily: "'Krona One', 'sans-serif'", letterSpacing: '0.1em' }}>
              StageLik
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              La solution complète pour gérer, suivre et optimiser vos
              stagiaires et programmes de stages.
            </p>

            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank" // Ajout de l'attribut target="_blank"
                  rel="noopener noreferrer" // Sécuriser l'ouverture dans un nouvel onglet
                  className="text-gray-400 hover:text-blue-300 transition-colors"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Liens du footer */}
          {footerLinks.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-gray-200 font-semibold text-lg">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={linkIndex}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <a
                      href="#"
                      className="text-gray-300 hover:text-blue-200 text-sm transition-colors"
                    >
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bas du footer */}
        <div className="border-t border-indigo-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} StellarStage. Tous droits
            réservés.
          </div>

          <div className="flex space-x-6">
            <a
              href="#"
              className="text-gray-500 hover:text-blue-300 text-sm transition-colors"
            >
              Politique de confidentialité
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-blue-300 text-sm transition-colors"
            >
              Conditions générales
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-blue-300 text-sm transition-colors"
            >
              Préférences des cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
