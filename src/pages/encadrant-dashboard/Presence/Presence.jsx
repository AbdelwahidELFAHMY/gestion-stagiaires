import React, { useEffect, useState } from "react";
import { getUsernameFromToken } from "../../../utils/getUsernameFromToken";
import axiosInstance from "../../../utils/axiosInstance";
import GetImageFromURL from "../../../utils/getImageFromURL";
import { FaCalendarTimes } from "react-icons/fa";
import { Calendar, CalendarClock, User2, Check } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";

const Presence = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [presences, setPresences] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = getUsernameFromToken();
        if (!username) {
          throw new Error("Utilisateur non authentifié");
        }

        const response = await axiosInstance.get(
          `/encadrants/presence/${username}`
        );
        setData(response.data);
      } catch (err) {
        console.error("Erreur lors de la récupération des données:", err);
        setError(err.message || "Erreur lors du chargement des données");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePresenceChange = (username, isPresent) => {
    setPresences((prev) => ({
      ...prev,
      [username]: isPresent,
    }));
  };

  const handleSave = async () => {
    try {
      const presenceData = data.map((stage) => ({
        stageId: stage.stageId,
        presences: stage.equipe.map((stagiaire) => ({
          stagiaireUsername: stagiaire.username,
          presence: presences[stagiaire.username] || false,
        })),
      }));

      console.log("Données à envoyer:", JSON.stringify(presenceData, null, 2));

      await axiosInstance.post("/encadrants/presence", {
        presences: presenceData,
      });

      toast.success("Présences enregistrées avec succès");
      setPresences({});
    } catch (err) {
      console.error("Erreur complète:", err);
      console.error("Réponse d'erreur:", err.response?.data);
      toast.error("Erreur lors de l'enregistrement des présences");
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <Skeleton circle width={24} height={24} />
            <Skeleton width={200} height={24} />
          </div>

          <div className="flex items-center space-x-4">
            <Skeleton width={180} height={20} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[...Array(3)].map((_, i) => (
                  <th key={i} className="px-6 py-3">
                    <Skeleton height={16} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[...Array(5)].map((_, i) => (
                <tr key={i}>
                  <td className="px-6 py-4">
                    <Skeleton height={16} width={120} />
                  </td>
                  <td className="px-6 py-4 flex items-center space-x-2">
                    <Skeleton circle height={40} width={40} />
                    <div>
                      <Skeleton height={12} width={100} />
                      <Skeleton height={10} width={80} />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Skeleton height={20} width={20} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500 bg-red-50 rounded-lg max-w-md mx-auto mt-8">
        {error}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className=" text-center text-gray-500 bg-gray-50 h-full items-center justify-center rounded-lg max-w-3/4 mx-auto mt-8">
        <div className="flex flex-col w-full md:flex-row justify-between items-start md:items-center ">
          <div className="flex items-center space-x-3 md:mb-0">
            <CalendarClock className="w-6 h-6 text-gray-700" />
            <h1 className="text-xl font-sans text-gray-800">
              Feuille de présence
            </h1>
          </div>

          <div className="flex items-center space-x-4 text-gray-500 bg-gray-50 px-4 py-2 rounded-lg">
            <Calendar className="w-5 h-5" />
            <span className="text-sm">
              {new Date().toLocaleDateString("fr-FR", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
        <div className="max-w-full  border-gray-400 h-full justify-center text-center flex flex-col items-center gap-4">
          <FaCalendarTimes className="text-6xl" />
          <span className="mb-40">Aucune présence est prévue actuellement</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-8/9 mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
          <CalendarClock className="w-6 h-6 text-gray-700" />
          <h1 className="text-xl font-sans text-gray-800">
            Feuille de présence
          </h1>
        </div>

        <div className="flex items-center space-x-4 text-gray-500 bg-gray-50 px-4 py-2 rounded-lg">
          <Calendar className="w-5 h-5" />
          <span className="text-sm">
            {new Date().toLocaleDateString("fr-FR", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      <div className="bg-white self-center rounded-md border-thin border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Intitulé du stage
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Stagiaire
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Présence
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((stage, stageIndex) => (
              <React.Fragment key={stageIndex}>
                {stage.equipe.map((stagiaire, stagiaireIndex) => (
                  <tr
                    key={stagiaire.username}
                    className="hover:bg-gray-50 transition-colors duration-150 ease-in-out"
                  >
                    {stagiaireIndex === 0 && (
                      <td
                        rowSpan={stage.equipe.length}
                        className="px-6 py-4 whitespace-nowrap text-size15 font-medium text-gray-900 border-r border-gray-100 align-middle"
                      >
                        <div className="flex items-center h-full">
                          <span className="line-clamp-2">
                            {stage.stageTitle}
                          </span>
                        </div>
                      </td>
                    )}

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {stagiaire.photo ? (
                          <GetImageFromURL
                            logoUrl={`${axiosInstance.defaults.baseURL.replace(
                              "/api",
                              ""
                            )}/photos/${stagiaire.photo.replace(
                              "photos/",
                              ""
                            )}`}
                            alt={`${stagiaire.prenom} ${stagiaire.nom}`}
                            className="h-10 w-10 rounded-full object-cover mr-3 border border-gray-200 transition-transform duration-200 hover:scale-105"
                          />
                        ) : (
                          <div className="h-11 w-11 rounded-full bg-gray-100 flex items-center justify-center mr-3 transition-colors duration-200 hover:bg-gray-200">
                            <User2 className="h-5 w-5 text-gray-500" />
                          </div>
                        )}
                        <div>
                          <div className="text-size15 font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                            {stagiaire.prenom} {stagiaire.nom}
                          </div>
                          <div className="text-xs text-gray-500">
                            {stagiaire.username}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={presences[stagiaire.username] || false}
                          onChange={(e) =>
                            handlePresenceChange(
                              stagiaire.username,
                              e.target.checked
                            )
                          }
                          className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
                        />
                      </label>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSave}
          disabled={Object.keys(presences).length === 0}
          className={`flex items-center px-6 py-3 rounded-md cursor-pointer text-size15 font-medium text-white ${
            Object.keys(presences).length === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          }`}
        >
          <Check className="w-4 h-4 mr-2" />
          Enregistrer
        </button>
      </div>
    </div>
  );
};

export default Presence;
