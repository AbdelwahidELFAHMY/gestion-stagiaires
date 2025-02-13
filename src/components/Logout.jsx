import { AiOutlineExclamationCircle } from "react-icons/ai";
import { FaTimesCircle } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";

const Logout = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.4)] flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
        {/* Icone de fermeture */}
        <button
          onClick={onCancel}
          className="absolute top-2 cursor-pointer right-2 text-gray-500 hover:text-gray-800"
        >
          <FaTimesCircle size={24} />
        </button>

        {/* Contenu principal */}
        <div className="flex flex-col items-center text-center">
          {/* Icône d'alerte */}
          <AiOutlineExclamationCircle
            size={48}
            className="text-red-500 mb-4"
          />

          {/* Titre */}
          <h2 className="text-lg font-bold text-gray-800 mb-3">
            Confirmer la déconnexion
          </h2>

          {/* Texte descriptif */}
          <p className="text-gray-600 mb-10">
            Êtes-vous sûr de vouloir vous déconnecter ? Cette action mettra fin
            à votre session actuelle.
          </p>

          {/* Boutons */}
          <div className="flex space-x-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 cursor-pointer bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
            >
              <span className="flex items-center gap-2">
                <FaTimesCircle size={18} />
                Annuler
              </span>
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-500 cursor-pointer text-white rounded-lg hover:bg-red-600 transition"
            >
              <span className="flex items-center gap-2">
                <RiLogoutBoxRLine size={18} />
                Déconnexion
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logout;
