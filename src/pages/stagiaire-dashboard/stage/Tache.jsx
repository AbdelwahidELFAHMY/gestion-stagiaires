import { useState } from "react";
import {
  FaCheckCircle,
  FaTimes,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { updateTacheProgress } from "../../../stores/taches_slices/tachesSlice";
import { toast } from "react-toastify";
import { TacheStatus } from "../../../utils/enums";

const Tache = ({ tache }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [progress, setProgress] = useState(tache.progress);
  const dispatch = useDispatch();

  const handleUpdateProgress = async () => {
    try {
      const resultAction = await dispatch(updateTacheProgress({
        id: tache.id,
        progress: progress
      }));

      if (updateTacheProgress.fulfilled.match(resultAction)) {
      toast.success(
        <div className="text-center mt-3 mb-2">
          <strong className="text-size15">
            Progression enregistré avec succès
          </strong>
        </div>,
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progressStyle: { background: "green" },
          progress: undefined,
        }
      );
        setIsModalOpen(false);
      }
      
    } catch (error) {
      console.error("Échec de la mise à jour", error);
      toast.error(
        <div className="text-center mt-3 mb-2">
          <strong className=" text-size15">
            {error || "Une erreur est survenue"}
          </strong>
        </div>,
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          pauseOnHover: true,
          progressStyle: { background: "red" },
          progress: undefined,
        }
      );

    } finally {
      setIsModalOpen(false);
    }
  };

  const isCompletedAndValidated = tache.status === TacheStatus.TERMINE && tache.valide;

  return (
    <>
      {/* Carte de tâche cliquable */}
      <div
        className="p-4 bg-white shadow rounded space-y-1.5 cursor-pointer hover:shadow-md transition-shadow relative"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Tag de validation si la tâche est validée */}
        {isCompletedAndValidated && (
          <div className="absolute top-2 right-2 bg-green-100 text-green-800 text-size13 p-1 rounded-full flex items-center">
            <FaCheckCircle />
            
          </div>
        )}
        
        <h4 className="font-semibold text-size13">{tache.description}</h4>
        <p className="text-gray-500 text-size12">Durée: {tache.duree}</p>
        <div className="w-full bg-gray-300 rounded h-2 mt-2">
          <div
            className="bg-blue-500 h-2 rounded"
            style={{ width: `${tache.progress}%` }}
          ></div>
        </div>
      </div>


      {isModalOpen && (
        <div className="fixed inset-0 z-30 bg-black/30 h-full flex items-center justify-center p-6">
          <div
            className="bg-white rounded-lg w-full max-w-xs border border-gray-100 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header minimaliste */}
            <div className="border-b border-gray-100 p-4 flex justify-between items-center">
              <h3 className="font-medium text-size14 text-gray-800">
                Détails de la tâche
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="cursor-pointer text-gray-400 hover:text-gray-600 hover:bg-gray-300 rounded-full transition-colors"
              >
                <FaTimes className="text-lg" />
              </button>
            </div>

            {/* Corps compact en deux colonnes */}
            <div className=" p-4">
              <div className="grid grid-cols-2 gap-8">
                {/* Colonne de gauche */}
                <div className="space-y-4 grid grid-rows-1">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Description
                    </label>
                    <p className="text-sm text-gray-700">{tache.description}</p>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Statut
                    </label>
                    <div className="flex items-center">
                      <span
                        className={`inline-block w-4 h-4 rounded-full mr-2 ${
                          tache.status === TacheStatus.A_FAIRE
                            ? "bg-blue-500"
                            : tache.status === TacheStatus.EN_COURS
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                      />
                      <span className="text-sm text-gray-700">
                        {tache.status.replace("_", " ").toLowerCase()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Colonne de droite */}
                <div className="space-y-4  grid grid-rows-1">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Durée
                    </label>
                    <p className="text-sm text-gray-700">{tache.duree}</p>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      Date de création
                    </label>
                    <p className="text-sm text-gray-700">
                      {tache?.dateCreation || "Non spécifiée"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Section validation */}
              {tache.status === TacheStatus.TERMINE && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <label className="block text-xs font-medium text-gray-500 mb-2">
                    Validation
                  </label>
                  <div className="flex items-center">
                    {tache.valide ? (
                      <span className="inline-flex items-center bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                        <FaCheckCircle className="mr-2" />
                        Tâche validée par l'encadrant
                      </span>
                    ) : (
                      <span className="inline-flex items-center bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full">
                        En attente de validation
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Progression (pleine largeur sous les colonnes) */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <label className="block text-xs font-medium text-gray-500 mb-2">
                  Progression ({progress}%)
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={(e) => setProgress(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-500"
                    disabled={isCompletedAndValidated}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
            
            {/* Footer discret */}
            <div className="border-t border-gray-100 p-3 bg-gray-50 flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-sm cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded"
              >
                Annuler
              </button>
              <button
                onClick={handleUpdateProgress}
                className={`text-sm cursor-pointer px-3 py-1.5 rounded transition-colors ${
                  isCompletedAndValidated
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
                disabled={isCompletedAndValidated}
              >
                Valider
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Tache;