import React, { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { getUsernameFromToken } from "../../../utils/getUsernameFromToken";
import { toast } from "react-toastify";
import { handleViewFile } from "../../../utils/handleViewFile";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import AddUpdateSujetStageModal from "./AddUpdateSujetStageModal";
import { FileCog2, FileEdit, Trash2 } from "lucide-react";

const SujetStage = () => {
  // États
  const [sujets, setSujets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentSujet, setCurrentSujet] = useState(null);
  const [typeFilter, setTypeFilter] = useState("TOUS");
  const [statusFilter, setStatusFilter] = useState("TOUS");
  const [filteredSujets, setFilteredSujets] = useState([]);

  useEffect(() => {
    fetchSujets();
  }, []);

  const fetchSujets = async () => {
    try {
      setLoading(true);
      setError(null);

      const username = getUsernameFromToken();
      const response = await axiosInstance.get(`/sujets_stage/${username}`);
      setSujets(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Erreur lors de la récupération des sujets"
      );
      toast.error("Erreur lors du chargement des sujets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [sujets, typeFilter, statusFilter]);

  const applyFilters = () => {
    let result = [...sujets];

    if (typeFilter !== "TOUS") {
      result = result.filter((sujet) => sujet.stageType === typeFilter);
    }

    if (statusFilter !== "TOUS") {
      result = result.filter(
        (sujet) => sujet.sujetStageStatus === statusFilter
      );
    }

    setFilteredSujets(result);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce sujet ?"))
      return;

    try {
      await axiosInstance.delete(`/sujets_stage/${id}`);
      fetchSujets();
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Erreur lors de la suppression"
      );
    }
  };

  if (loading && sujets.length === 0) {
    return <div className="text-center py-8">Chargement en cours...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-6">
        <span className="flex items-center gap-2 text-xl font-semibold bg-gradient-to-r from-neutral-700 via-neutral-800 to-gray-900 bg-clip-text text-transparent">
          <FileCog2 size={23} color="gray" />
          Gestion des Sujets de Stage
        </span>

        <div className="flex items-center gap-6">
          Filter:
          <div className="w-32">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-size13"
            >
              <option value="TOUS">Tous les types</option>
              <option value="INITIATION">Initiation</option>
              <option value="STAGE_PFA">Stage PFA</option>
              <option value="STAGE_PFE">Stage PFE</option>
            </select>
          </div>

          <div className="w-32">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-size13"
            >
              <option value="TOUS">Tous les statuts</option>
              <option value="A_TRAITE">À traiter</option>
              <option value="REJETE">Rejeté</option>
              <option value="ACCEPTE">Accepté</option>
            </select>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="cursor-pointer ml-4 text-size13 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
            disabled={loading}
          >
            <FaPlus />
            <span>Ajouter un sujet</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto text-size13">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-200 text-size10 text-gray-800">
              <th className="py-3 px-4 border-b text-left uppercase tracking-wider">
                Titre
              </th>
              <th className="py-3 px-4 border-b text-left uppercase tracking-wider">
                Durée
              </th>
              <th className="py-3 px-4 border-b text-left uppercase tracking-wider">
                Date d'Ajout
              </th>
              <th className="py-3 px-4 border-b text-left uppercase tracking-wider">
                Type
              </th>
              <th className="py-3 px-4 border-b text-left uppercase tracking-wider">
                Status
              </th>
              <th className="py-3 px-4 border-b text-left uppercase tracking-wider">
                Fichier
              </th>
              <th className="py-3 px-4 border-b text-left uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredSujets.map((sujet) => (
              <tr key={sujet.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b">{sujet.title}</td>
                <td className="py-3 px-4 border-b">{sujet.duration}</td>
                <td className="py-3 px-4 border-b">{sujet.dateAjout}</td>
                <td className="py-3 px-4 border-b">
                  {sujet.stageType.replace("_", " ")}
                </td>
                <td className="py-3 px-4 border-b">{sujet.sujetStageStatus}</td>
                <td className="py-3 px-4 border-b">
                  {sujet.fileName && (
                    <button
                      onClick={() => handleViewFile(sujet.filePath)}
                      className="cursor-pointer text-blue-500 hover:underline"
                    >
                      {sujet.fileName}
                    </button>
                  )}
                </td>
                <td className="text-right py-3 px-4 border-b">
                  <div className=" flex gap-6">
                    <button
                      onClick={() => {
                        setCurrentSujet(sujet);
                        setShowModal(true);
                      }}
                      className="cursor-pointer text-blue-500 hover:text-blue-700 flex items-center gap-1"
                      disabled={loading}
                      title="Modifier"
                    >
                      <FileEdit size={17} />
                    </button>
                    <button
                      onClick={() => handleDelete(sujet.id)}
                      className="cursor-pointer text-red-500 hover:text-red-700 flex items-center gap-1"
                      disabled={loading}
                      title="Supprimer"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddUpdateSujetStageModal
        showModal={showModal}
        closeModal={() => {
          setShowModal(false);
          setCurrentSujet(null);
        }}
        refreshSujets={fetchSujets}
        currentSujet={currentSujet}
      />
    </div>
  );
};

export default SujetStage;
