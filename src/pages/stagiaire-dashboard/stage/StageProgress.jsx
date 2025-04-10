import { useState, useEffect } from "react";
import { getUsernameFromToken } from "../../../utils/getUsernameFromToken";
import axiosInstance from "../../../utils/axiosInstance";
import ListTaches from "./ListTaches";
import Skeleton from "react-loading-skeleton";
import { BarChartBig } from "lucide-react";

const StageProgress = ({ isSidebarOpen }) => {
  const [stage, setStage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStageData = async () => {
      try {
        const username = getUsernameFromToken();
        if (username == null) throw new error("No username");

        try {
          const response = await axiosInstance.get(`/stages/${username}`);
          setStage(response.data);
          localStorage.setItem("stageId", response.data.stageId);
        } catch (error) {
          throw new Error("Failed to fetch stage info");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };

    loadStageData();
  }, []);

  const getRemainingDuration = (endDate) => {
    if (!endDate) return "Date inconnue";
    const now = new Date();
    const end = new Date(endDate);
    const remainingTime = end - now;
    const daysRemaining = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    return daysRemaining > 0
      ? `${daysRemaining} jours restants`
      : stage.progress < 100
      ? "Deadline dépassée"
      : "Terminé";
  };

  if (loading)
    return (
      <>
        <div className="container mt-6 px-4">
          <div className="grid grid-cols-2 px-4 pb-4 items-center">
            <Skeleton width={150} height={30} />
            <Skeleton height={30} />
          </div>
          <div className=" px-4">
            <Skeleton height={150} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow">
              <Skeleton width={100} height={20} className="mb-4" />
              {[...Array(3)].map((_, j) => (
                <div key={j} className="mb-4">
                  <Skeleton height={80} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </>
    );

  if (error)
    return (
      <div className="text-red-500 p-4 bg-red-50 rounded-lg">
        Erreur: {error}
      </div>
    );

  if (!stage)
    return (
      <div className="text-gray-600 p-4 bg-gray-50 rounded-lg">
        Aucun stage trouvé
      </div>
    );

  return (
    <div className="container px-4 h-full">

      <div className="mt-4 grid grid-cols-2 px-4 py-3">
        <h3 className="font-semibold items-center justify-center">
      
          <BarChartBig className=" text-indigo-700 mr-3 inline-block" />
          <span className="bg-gradient-to-r from-blue-800  to-gray-800 bg-clip-text text-transparent">

          Progression Achevée
          </span>
        </h3>
        <div className="w-full bg-gray-300 rounded-md h-4 relative">
          <div
            className="bg-blue-500 h-4 rounded-md"
            style={{ width: `${stage.progress}%` }}
          ></div>
          <span
            className="absolute text-xs font-semibold text-gray-700"
            style={{
              left: `calc(${stage.progress}% - 15px)`, // Aligner le label avec la progression
              top: "-20px", // Positionner le label au-dessus de la barre
            }}
          >
            {stage.progress}%
          </span>
        </div>
      </div>

      {/* Informations du stage */}
      <div className="bg-gradient-to-r justify-between text-size15 from-blue-600 to-purple-500 text-white p-6 rounded-lg flex flex-row items-center">
        <div className="w-2/3 text-left mr-10 space-y-1">
          <h2 className="text-size20 font-semibold ">
            {stage?.titre || "Titre inconnu"}
          </h2>
          <p>{stage?.description || "Aucune description fournie."}</p>
        </div>
        <div className="w-1/3 text-left text-size14 space-y-2">
          <p>
            <span className="font-semibold ">Département :</span>{" "}
            {stage?.departement || "No Specifie"}
          </p>
          <p>
            <span className="font-semibold">Service :</span>{" "}
            {stage?.service || "Non Specifie"}
          </p>
          <p className="font-semibold text-yellow-100">
            {getRemainingDuration(stage.dateFin)}
          </p>{" "}
        </div>
      </div>

      {/* Liste des tâches */}
      <div className="mt-3 px-4 h-[calc(100vh-300px)] overflow-y-auto scrollbar-thin">
        <ListTaches />
      </div>
    </div>
  );
};

export default StageProgress;






