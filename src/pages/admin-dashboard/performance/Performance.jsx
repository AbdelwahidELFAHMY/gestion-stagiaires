import { useEffect, useState } from "react";
import { Clock, Database, Gauge, Zap } from "lucide-react";
import axiosInstance from "../../../utils/axiosInstance";
import PerformanceStats from "./PerformanceStats";
import ResponseTimeChart from "./ResponseTimeChart";
import RequestRateChart from "./RequestRateChart";
import Skeleton from "../../../components/Skeleton"; // Vérifiez que ce composant est bien défini

export default function Performance() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("/performance/stats")
      .then((response) => {
        setStats(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.response?.data?.message || "Une erreur est survenue");
        setLoading(false);
      });
  }, []);
  

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="h-32 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse"
            />
          ))}
        </div>
        <div className="h-96 flex flex-col lg:flex-row gap-6">
          <div className="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-6">
            <Skeleton />
          </div>
          <div className="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-6">
            <Skeleton />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 text-gray-900 dark:text-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <PerformanceStats
          title="Temps de réponse moyen"
          value={`${stats.responseTime || 0} ms`}
          icon={<Clock className="h-5 w-5" />}
          change={{
            value: stats.responseTimeChange + " ms" || "0 ms",
            positive: (stats.responseTimeChange?.toString() || "").includes("-"),
          }}
        />
        <PerformanceStats
          title="Débit"
          value={`${stats.requestRate || 0} req/min`}
          icon={<Gauge className="h-5 w-5" />}
          change={{
            value: stats.requestRateChange + " req/min" || "0 req/min",
            positive: (stats.requestRateChange?.toString() || "").includes("+"),
          }}
        />
        <PerformanceStats
          title="Taux d'erreur"
          value={`${stats.errorRate || 0} %`}
          icon={<Zap className="h-5 w-5" />}
          change={{
            value: stats.errorRateChange + " %" || "0%",
            positive: (stats.errorRateChange?.toString()  || "").includes("-"),
          }}
        />
        <PerformanceStats
          title="Temps de réponse BD"
          value={`${stats.dbResponseTime || 0} ms`}
          icon={<Database className="h-5 w-5" />}
          change={{
            value: stats.dbResponseTimeChange + " ms"|| "0 ms",
            positive: (stats.dbResponseTimeChange?.toString() || "").includes("-"),
          }}
        />
      </div>

      <div className="h-96 flex flex-col lg:flex-row gap-6">
      <div className="flex-1">
          <ResponseTimeChart />
        </div>
        <div className="flex-1">
          <RequestRateChart />
        </div>
      </div>
    </div>
  );
}
