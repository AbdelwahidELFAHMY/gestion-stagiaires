import { useEffect, useState } from "react";
import { Clock, Database, Gauge, Zap } from "lucide-react";
import axiosInstance from "../../../utils/axiosInstance";
import PerformanceStats from "./PerformanceStats";
import ResponseTimeChart from "./ResponseTimeChart";
import RequestRateChart from "./RequestRateChart";

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
        setError(null);
      })
      .catch(() => {
        setError("Une erreur est survenue lors de la récupération des données.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 space-y-6 text-gray-900 dark:text-gray-100">
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="h-24 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse"
            />
          ))}
        </div>
      ) : error ? (
        <p className="text-center text-red-600 dark:text-red-400">{error}</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
            <PerformanceStats
              title="Temps de réponse moyen"
              value={`${stats.responseTime || 0} ms`}
              icon={<Clock className="h-5 w-5" />}
              change={{
                value: stats.responseTimeChange || "0%",
                positive: (stats.responseTimeChange || "").includes("-"),
              }}
            />
            <PerformanceStats
              title="Débit"
              value={`${stats.requestRate || 0} req/min`}
              icon={<Gauge className="h-5 w-5" />}
              change={{
                value: stats.requestRateChange || "0%",
                positive: (stats.requestRateChange || "").includes("+"),
              }}
            />
            <PerformanceStats
              title="Taux d'erreur"
              value={`${stats.errorRate || 0} %`}
              icon={<Zap className="h-5 w-5" />}
              change={{
                value: stats.errorRateChange || "0%",
                positive: (stats.errorRateChange || "").includes("-"),
              }}
            />
            <PerformanceStats
              title="Temps de réponse BD"
              value={`${stats.dbResponseTime || 0} ms`}
              icon={<Database className="h-5 w-5" />}
              change={{
                value: stats.dbResponseTimeChange || "0%",
                positive: (stats.dbResponseTimeChange || "").includes("-"),
              }}
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <ResponseTimeChart />
            </div>
            <div className="flex-1">
              <RequestRateChart />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
