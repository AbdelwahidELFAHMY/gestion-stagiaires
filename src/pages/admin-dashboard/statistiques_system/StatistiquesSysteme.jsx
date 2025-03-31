import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTechStats } from "../../../stores/system_stats_slices/techStatsSlice";
import { FaMicrochip, FaMemory, FaHdd, FaClock } from "react-icons/fa";
import WeeklyStorageHistory from "./weeklyStorageHistory";
import DataStatisticsChart from "./DataStatisticsChart";

export default function StatistiquesSysteme() {
  const dispatch = useDispatch();
  const { cpuUsage, memoryUsage, diskUsage, systemUptime, status, error } =
    useSelector((state) => state.techStats);

  useEffect(() => {
    if (status === "failed") return; // Empêche l'exécution si le statut est "failed"

    dispatch(fetchTechStats());
    const interval = setInterval(() => {
      dispatch(fetchTechStats());
    }, 5000); // Rafraîchir toutes les 5 secondes

    return () => clearInterval(interval);
  }, [dispatch, status]); // Dépend également de `status`

  if (status === "failed") {
    return (
      <div className="text-red-500 w-full h-full flex justify-center items-center">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="CPU Usage"
          value={cpuUsage}
          icon={<FaMicrochip />}
          subtitle="Utilisation du processeur"
        />
        <StatCard
          title="Memory Usage"
          value={memoryUsage}
          icon={<FaMemory />}
          subtitle="Utilisation de la RAM"
        />
        <StatCard
          title="Disk Usage"
          value={diskUsage}
          icon={<FaHdd />}
          subtitle="Stockage utilisé"
        />
        <StatCard
          title="System Uptime"
          value={systemUptime}
          icon={<FaClock />}
          subtitle="Durée de fonctionnement"
        />
      </div>

      {/* Flexbox pour les graphiques */}
      <div className="flex flex-col lg:flex-row gap-6">
  <div className="flex-1">
    <WeeklyStorageHistory />
  </div>
  <div className="flex-1">
    <DataStatisticsChart />
  </div>
</div>
    </div>
  );
}

function StatCard({ title, value, icon, subtitle }) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-gray-200 p-3 rounded-lg shadow-lg flex items-center space-x-4">
      <div className="text-3xl">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm opacity-80">{subtitle}</p>
      </div>
    </div>
  );
}