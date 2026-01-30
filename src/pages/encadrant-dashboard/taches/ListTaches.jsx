import React, { useState, useEffect } from "react";

import {
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Sparkles,
  Clock,
  AlertCircle,
  ListTodo,
  Plus,
  Trash2,
} from "lucide-react";
import { getUsernameFromToken } from "../../../utils/getUsernameFromToken";
import axiosInstance from "../../../utils/axiosInstance";
import { TacheStatus } from "../../../utils/enums";
import AddTacheModal from "./AddTacheModal";
import { toast } from "react-toastify";
import { useToastConfirm } from "../../../utils/useToastConfirm";
import EditTacheModal from "./EditTacheModal";
import { BiCog } from "react-icons/bi";

export default function ListTaches() {
  const [stagesWithTaches, setStagesWithTaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedStage, setExpandedStage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStageId, setSelectedStageId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const { confirm } = useToastConfirm();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTache, setSelectedTache] = useState(null);

  useEffect(() => {
    const fetchTachesByStage = async () => {
      try {
        const username = getUsernameFromToken();
        if (!username) {
          throw new Error("Utilisateur non authentifié");
        }

        const response = await axiosInstance.get(
          `/encadrants/taches/${username}`
        );
        setStagesWithTaches(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors de la récupération des tâches:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTachesByStage();
  }, []);

  const toggleStage = (index) => {
    setExpandedStage(expandedStage === index ? null : index);
  };

  const getStatusIcon = (status, valide, progress) => {
    if (progress === 100 && valide) {
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
    if (progress === 100 && !valide) {
      return <Clock className="w-4 h-4 text-purple-500" />;
    }

    switch (status) {
      case TacheStatus.TERMINE:
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case TacheStatus.EN_COURS:
        return <Clock className="w-4 h-4 text-amber-500" />;
      case TacheStatus.A_FAIRE:
        return <Sparkles className="w-4 h-4 text-indigo-800" />;
      default:
        return <AlertCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const handleAddTacheClick = (stageId) => {
    setSelectedStageId(stageId);
    setIsModalOpen(true);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  const handleDeleteTache = (tacheId) => {
    confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?", () => {
      performDeleteTache(tacheId);
    });
  };

  const performDeleteTache = async (tacheId) => {
    try {
      await axiosInstance.delete(`/encadrants/taches/${tacheId}`);

      // Mise à jour optimiste
      setStagesWithTaches((prev) =>
        prev.map((stage) => ({
          ...stage,
          tacheDTOList: stage.tacheDTOList.filter(
            (tache) => tache.id !== tacheId
          ),
        }))
      );

      toast.success("Tâche supprimée avec succès");
    } catch (err) {
      console.error("Erreur lors de la suppression:", err);
      toast.error("Échec de la suppression de la tâche");
    }
  };

  const handleEditTacheClick = (tache) => {
    setSelectedTache(tache);
    setIsEditModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-lg">
        <p>Erreur: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto ">
      <div className="flex items-center space-x-3 mb-6">
        <ListTodo className="w-6 h-6 text-gray-600" />
        <h1 className="text-md font-maFont font-medium bg-gradient-to-r from-gray-700  to-gray-900 bg-clip-text text-transparent">
          Liste des tâches par stage
        </h1>
      </div>
      <div className="space-y-4">
        {stagesWithTaches.map((stage, index) => (
          <div key={index} className="border rounded-lg overflow-hidden">
            <div className="flex w-full justify-between gap-20 items-center p-4 bg-gray-50 hover:bg-gray-100 cursor-pointer">
              <div onClick={() => toggleStage(index)} className="flex-1">
                <h2 className="font-semibold text-md">{stage.stageTitre}</h2>
                <p className="text-xs text-gray-500">
                  {stage.tacheDTOList.length} tâche(s)
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddTacheClick(stage.stageId);
                  }}
                  className="flex items-center space-x-2 cursor-pointer px-2.5 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-700 transition-colors shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nouvelle Tâche</span>
                </button>
                {expandedStage === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </div>
            </div>

            {expandedStage === index && (
              <div className="p-4 border-t">
                {stage.tacheDTOList.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50 text-left text-size10 font-medium text-gray-500 uppercase tracking-wider">
                        <tr>
                          <th className="px-6 py-3">Description</th>
                          <th className="px-6 py-3">Durée</th>
                          <th className="px-6 py-3">date du Début</th>
                          <th className="px-6 py-3">Statut</th>
                          <th className="px-6 py-3">Progression</th>
                          <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {stage.tacheDTOList.map((tache) => (
                          <tr
                            key={tache.id}
                            className=" whitespace-nowrap text-size12"
                          >
                            <td className="px-6 py-3 font-semibold text-size13 text-gray-900">
                              {tache.description}
                            </td>
                            <td className="px-6 py-4 text-gray-500">
                              {tache.duree}
                            </td>
                            <td className="px-6 py-4 text-gray-500">
                              {formatDate(tache.dateCreation)}
                            </td>
                            <td className="px-6 py-4 text-gray-500">
                              <div className="flex items-center">
                                {getStatusIcon(
                                  tache.status,
                                  tache.valide,
                                  tache.progress
                                )}
                                <span className="ml-2 capitalize">
                                  {tache.status === "TERMINE" && tache.valide
                                    ? "Terminé"
                                    : tache.status === "TERMINE"
                                    ? "Terminé"
                                    : tache.status
                                        .toLowerCase()
                                        .replace("_", " ")}
                                </span>
                                {tache.progress === 100 && (
                                  <span
                                    className={`ml-2 text-xs px-2 py-1 rounded-full ${
                                      tache.valide
                                        ? "bg-green-100 text-green-800"
                                        : "bg-purple-100 text-purple-800"
                                    }`}
                                  >
                                    {tache.valide ? "Validé" : "En attente"}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                  className={`h-2.5 rounded-full ${
                                    tache.progress < 30
                                      ? "bg-red-500"
                                      : tache.progress < 70
                                      ? "bg-amber-400"
                                      : tache.progress === 100 && !tache.valide
                                      ? "bg-purple-500"
                                      : "bg-green-500"
                                  }`}
                                  style={{ width: `${tache.progress}%` }}
                                ></div>
                              </div>
                              <span className="text-xs text-gray-500 mt-1">
                                {tache.progress}%
                              </span>
                            </td>

                            <td className="px-6 py-4 text-right text-gray-500">
                              <button
                                onClick={() => handleEditTacheClick(tache)}
                                disabled={tache.valide}
                                className={`rounded-full p-1.5 hover:bg-gray-100 text-blue-600 hover:text-blue-800 mr-4 ${
                                  tache.valide
                                    ? "opacity-50 cursor-not-allowed"
                                    : "cursor-pointer "
                                }`}
                              >
                                <BiCog size={18} />
                              </button>
                              <button
                                onClick={() => handleDeleteTache(tache.id)}
                                disabled={
                                  deletingId === tache.id || tache.valide
                                }
                                className={` rounded-full p-1.5 hover:bg-gray-100 text-red-600 hover:text-red-800 disabled:opacity-50${
                                  tache.valide
                                    ? "opacity-50 cursor-not-allowed"
                                    : "cursor-pointer"
                                }`}
                              >
                                {deletingId === tache.id ? (
                                  <span className="inline-flex items-center">
                                    <svg
                                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-red-500"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                    >
                                      <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                      ></circle>
                                      <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                      ></path>
                                    </svg>
                                    Suppression...
                                  </span>
                                ) : (
                                  <Trash2 size={18} />
                                )}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    Aucune tâche disponible pour ce stage
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <EditTacheModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        tache={selectedTache}
        setStagesWithTaches={setStagesWithTaches}
      />

      <AddTacheModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        stageId={selectedStageId}
        setStagesWithTaches={setStagesWithTaches}
      />
    </div>
  );
}
