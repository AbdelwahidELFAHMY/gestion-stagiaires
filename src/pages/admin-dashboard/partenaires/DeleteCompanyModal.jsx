import { motion, AnimatePresence } from "framer-motion";
import { Trash2, X } from "lucide-react"; // Importez les icônes Lucide
import { useState } from "react";

export default function DeleteCompanyModal({ company, onClose, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(company.entrepriseId);
      onClose();
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    } finally {
      setIsDeleting(false);
    }
  };
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
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md"
        >
          <h2 className="text-center text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Supprimer l'entreprise
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Êtes-vous sûr de vouloir supprimer l'entreprise{" "}
            <strong className="text-gray-900 dark:text-gray-100">{company.name}</strong> ?
          </p>
          <div className="mt-6 text-size13 flex justify-end gap-4">
            {/* Bouton Annuler avec icône */}
          <button
            onClick={onClose}
            className="cursor-pointer px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors flex items-center gap-2"
            disabled={isDeleting}
          >
            <X className="w-4 h-4" />
            Annuler
          </button>

          <button
            onClick={handleConfirmDelete}
            className="cursor-pointer px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors flex items-center gap-2"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <span className="animate-pulse">Suppression...</span>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                Supprimer
              </>
            )}
          </button>
        </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}