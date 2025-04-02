import { useState, useEffect } from "react";
import {
  CircleAlert,
  Wrench,
  Clock,
  CheckCircle,
  CalendarPlus,
} from "lucide-react";
import axiosInstance from "../../../utils/axiosInstance";
import Skeleton from "../../../components/Skeleton";
import MaintenanceScheduler from "./MaintenanceScheduler";

const SystemStatus = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSystemStatus = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/system/status");
        const data = response.data;
        setStatus(analyzeSystemStatus(data));
      } catch (error) {
        console.error(
          "Erreur lors de la récupération du statut du système:",
          error
        );
        setStatus({ needsMaintenance: false, urgency: "none" });
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000); 
      }
    };

    fetchSystemStatus();
    const interval = setInterval(fetchSystemStatus, 120000);
    return () => clearInterval(interval);
  }, []);

  const analyzeSystemStatus = (data) => {
    const health = data?.health?.status || "UP";
    const cpuUsage = data?.cpuUsage?.[0]?.value || 0;
    const memoryUsage = data?.memoryUsage?.[0]?.value || 0;
    const diskUsage = data?.diskUsage?.[0]?.value || 0;

    let urgency = "none";
    let reasons = [];
    let recommendations = [];

    if (health !== "UP" || cpuUsage > 0.9) {
      urgency = "high";
      reasons = [
        "Le système est en état critique",
        "Utilisation du CPU critique (> 90%)",
      ];
      recommendations = [
        "Vérifier les logs pour diagnostiquer le problème",
        "Réduire la charge du serveur immédiatement",
      ];
    } else if (cpuUsage > 0.8 || memoryUsage > 0.85) {
      urgency = "medium";
      reasons = [
        "Utilisation du CPU élevée (> 80%)",
        "Utilisation mémoire très élevée (> 85%)",
      ];
      recommendations = [
        "Optimiser les requêtes",
        "Vérifier les processus gourmands et alléger la mémoire",
      ];
    } else if (diskUsage > 0.9 || (memoryUsage > 0.75 && cpuUsage > 0.75)) {
      urgency = "low";
      reasons = [
        "Utilisation du disque élevée (> 90%)",
        "Utilisation simultanée élevée du CPU et de la mémoire (> 75%)",
      ];
      recommendations = [
        "Archiver les logs et nettoyer les fichiers inutiles",
        "Analyser les processus en cours et optimiser les ressources",
      ];
    }

    return {
      needsMaintenance: urgency !== "none",
      urgency,
      reasons,
      recommendations,
    };
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "high":
        return "bg-red-50 dark:bg-red-950  text-gray-700";
      case "medium":
        return "bg-yellow-50 dark:bg-yellow-900   text-gray-700";
      case "low":
        return "bg-blue-50 dark:bg-indigo-900  text-gray-700";
      default:
        return "bg-green-50 dark:bg-green-950  text-gray-700";
    }
  };

  const getUrgencyIcon = (urgencyLevel) => {
    switch (urgencyLevel) {
      case "high":
        return <CircleAlert className="h-5 w-5" />;
      case "medium":
        return <Wrench className="h-5 w-5" />;
      case "low":
        return <Clock className="h-5 w-5" />;
      default:
        return <CheckCircle className="h-5 w-5" />;
    }
  };

  if (loading) {
    return (
      <div className="px-6 pt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col space-y-4 w-full h-full">
          <Skeleton className="flex-grow w-full h-full" />
        </div>

        <div className="flex flex-col space-y-4 w-full h-full">
          <Skeleton className="flex-grow w-full h-full" />
        </div>
      </div>
    );
  }

  return (
    <div className=" dark:bg-gray-900 glass-card overflow-hidden col-span-full p-6 bg-white ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-size15 font-semibold text-gray-800 dark:text-gray-200">
              État Du Système
            </h2>
            <span
              className={`${getUrgencyColor(
                status.urgency
              )} dark:text-gray-50 px-4 py-2 rounded-full flex items-center justify-center space-x-2 animate-fadeIn`}
            >
              {getUrgencyIcon(status.urgency)}
              <span className="text-size13 font-medium">
                {status.urgency === "high"
                  ? "Maintenance Urgente"
                  : status.urgency === "medium"
                  ? "Maintenance Recommandée"
                  : status.urgency === "low"
                  ? "Maintenance Optionnelle"
                  : "Aucune action requise"}
              </span>
            </span>
          </div>
          <div
            className={`p-5 rounded-lg animate-fadeIn border border-gray-200 dark:border-gray-700 bg-blue-50 ${getUrgencyColor(
              status.urgency
            )}`}
          >
            <h3 className="font-semibold text-lg text-gray-700 dark:text-gray-200 mb-2">
              Raisons :
            </h3>
            <ul className="text-gray-600 dark:text-gray-200 list-disc pl-5 space-y-2">
              {status.reasons.map((res, index) => (
                <li
                  key={index}
                  className="text-gray-600 dark:text-gray-300 text-sm"
                >
                  {res}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
        <div className="flex justify-end mb-4 ">
            <MaintenanceScheduler />
          </div>
          <div className="p-5 dark:bg-blue-950 rounded-lg border-thin border-gray-200 bg-blue-50 dark:border-gray-700 animate-fadeIn">
            <h3 className="font-semibold text-lg text-gray-700 dark:text-gray-200 mb-3">
              Recommandations :
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              {status.recommendations.map((rec, index) => (
                <li
                  key={index}
                  className="text-gray-600 dark:text-gray-300 text-sm"
                >
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;
