import { motion, AnimatePresence } from "framer-motion";
import { X, Globe, Building, MapPin, User, Mail, Phone, Users, Activity } from "lucide-react"; // Import des icônes Lucide

export default function ViewDetailsModal({ company, onClose }) {
  if (!company) return null;
  return (
    <AnimatePresence>
      {/* Overlay animé */}
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-[rgba(0,0,0,0.4)] flex items-center justify-center z-50"
      >
        {/* Modal animé */}
        <motion.div
          key="modal"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl" // Augmentation de la largeur
        >
          {/* En-tête du modal */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              {/* Logo de l'entreprise */}
              <div
                className="h-12 w-12 rounded-full flex items-center justify-center text-white text-lg font-bold"
                style={{ backgroundColor: "#3B82F6" }} // Couleur dynamique (peut être remplacée par une couleur aléatoire)
              >
                {company.name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {company.name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                  <Globe className="w-4 h-4" /> {/* Icône du site web */}
                  <a
                    href={`https://${company.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {company.website}
                  </a>
                </p>
              </div>
            </div>
            {/* Bouton de fermeture */}
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {/* Contenu en deux colonnes */}
          <div className="grid grid-cols-2 gap-6">
            {/* Colonne de gauche */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Building className="w-4 h-4" /> {/* Icône du secteur */}
                  Secteur
                </label>
                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                  {company.sector}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> {/* Icône de localisation */}
                  Localisation
                </label>
                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                  {company.location}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Users className="w-4 h-4" /> {/* Icône des stagiaires */}
                  Nombre de stagiaires
                </label>
                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                  {company.internCount}
                </p>
              </div>
            </div>

            {/* Colonne de droite */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <User className="w-4 h-4" /> {/* Icône du contact */}
                  Contact
                </label>
                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                  {company.contactPerson}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Mail className="w-4 h-4" /> {/* Icône de l'email */}
                  Email
                </label>
                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                  {company.email}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Phone className="w-4 h-4" /> {/* Icône du téléphone */}
                  Téléphone
                </label>
                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                  {company.phone}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Activity className="w-4 h-4" /> {/* Icône du statut */}
                  Statut
                </label>
                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                  {company.status === "active" ? "Actif" : "Inactif"}
                </p>
              </div>
            </div>
          </div>

          {/* Bouton de fermeture */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 flex items-center gap-2"
            >
              <X className="w-4 h-4" /> {/* Icône de fermeture */}
              Fermer
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}