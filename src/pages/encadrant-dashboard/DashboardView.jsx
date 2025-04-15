import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { getUsernameFromToken } from "../../utils/getUsernameFromToken";
import {
  Calendar,
  Clock,
  User,
  AlertCircle,
  Frown,
  BarChart4,
  User2,
} from "lucide-react";
import GetImageFromURL from "../../utils/getImageFromURL";

export default function DashboardView() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const username = getUsernameFromToken();
        if (!username) {
          throw new Error("Utilisateur non authentifié");
        }

        const response = await axiosInstance.get(
          `/encadrants/stages/${username}`
        );
        setProjects(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors de la récupération des projets:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  const calculateDaysRemaining = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const getProgressColor = (progress) => {
    if (progress < 30) return "bg-red-500";
    if (progress < 70) return "bg-amber-400";
    return "bg-emerald-500";
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600">Chargement des projets...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="flex items-center px-4 py-2 text-red-600 bg-red-100 rounded-lg">
          <AlertCircle className="w-5 h-5 mr-2" />
          <span>Erreur: {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      {/* Header minimaliste avec icônes Lucide */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <BarChart4 className="w-6 h-6 text-gray-600" />
          <span className="text-size15 font-bold bg-gradient-to-r from-gray-700  to-gray-900 bg-clip-text text-transparent">
            Les Stages En Cours
          </span>
        </div>

        <div className="flex items-center space-x-4 text-gray-500">
          <div className="flex items-center">
            <Calendar className="w-5 h-5 mr-1" />
            <span>{new Date().toLocaleDateString("fr-FR")}</span>
          </div>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 bg-white rounded-md h-full">
          <Frown className="w-16 h-16 text-gray-400" />
          <p className="mt-4 text-lg text-gray-600">
            Aucun projet en cours pour le moment
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project.id}
              className="overflow-hidden transition-all duration-300 bg-white rounded-md  border-gray-100 border-thin group"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 pr-4 min-w-0">
                    <div className="flex-1 pr-4 min-w-0">
                      <h2 className="text-xl font-semibold text-gray-800 break-words">
                        {project.titre}
                      </h2>
                      <p className="mt-2 text-gray-600 break-words">
                        {project.description}
                      </p>
                    </div>
                  </div>
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="2"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        strokeLinecap="round"
                        strokeWidth="2"
                        strokeDasharray={`${project.progress}, 100`}
                        className={`${getProgressColor(
                          project.progress
                        )} stroke-current`}
                        transform="rotate(-90 18 18)"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-medium text-gray-800">
                        {project.progress}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="flex flex-col p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center text-xs font-medium text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>Début</span>
                    </div>
                    <p className="mt-1 font-medium text-gray-800">
                      {formatDate(project.dateDebut)}
                    </p>
                  </div>
                  <div className="flex flex-col p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center text-xs font-medium text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>Fin</span>
                    </div>
                    <p className="mt-1 font-medium text-gray-800">
                      {formatDate(project.dateFin)}
                    </p>
                  </div>
                  <div className="flex flex-col p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center text-xs font-medium text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>Jours restants</span>
                    </div>
                    <p className="mt-1 font-medium text-gray-800">
                      {calculateDaysRemaining(project.dateFin)}
                    </p>
                  </div>
                </div>

                {project.stagiaires.length > 0 ? (
                  <div className="mt-6">
                    <h3 className="flex items-center text-sm font-medium text-gray-500">
                      <User className="w-4 h-4 mr-2" />
                      Stagiaires ({project.stagiaires.length})
                    </h3>
                    {/* Grille de stagiaires (2 par ligne) */}
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      {project.stagiaires.map((stagiaire, index) => (
                        <div
                          key={index}
                          className="flex items-center p-3 bg-gray-50 rounded-lg"
                        >
                          {stagiaire.photo ? (
                            <GetImageFromURL
                              logoUrl={`${axiosInstance.defaults.baseURL.replace(
                                "/api",
                                ""
                              )}/photos/${stagiaire.photo.replace(
                                "photos/",
                                ""
                              )}`}
                              alt="photo"
                              className="h-11 w-11 rounded-full border-thin object-cover"
                            />
                          ) :(
                            <div className="p-1 bg-gray-200 border-thin border-gray-300 rounded-full">
                            <User2 className="h-8 w-8 text-neutral-700" />
                            </div>
                          )}
                          <div className="ml-3 overflow-hidden">
                            <p className="font-medium text-gray-800 truncate">
                              {stagiaire.prenom} {stagiaire.nom}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {stagiaire.username}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center p-4 mt-6 bg-gray-50 rounded-lg">
                    <User className="w-5 h-5 mr-2 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      Aucun stagiaire assigné
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
