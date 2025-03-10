import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTechStats } from "../../stores/tech_stats_slices/techStatsSlice";
import { FaMicrochip, FaMemory, FaHdd, FaClock } from "react-icons/fa";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function TechnicalStats() {
  const dispatch = useDispatch();
  const { cpuUsage, memoryUsage, diskUsage, systemUptime, status, error } = useSelector(
    (state) => state.techStats
  );
  
  const [statsHistory, setStatsHistory] = useState([]);

  useEffect(() => {
      dispatch(fetchTechStats());
      const interval = setInterval(() => {
        dispatch(fetchTechStats());
      }, 5000); // Rafraîchir toutes les 5 secondes
      return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    setStatsHistory((prev) => [...prev.slice(-10), { time: new Date().toLocaleTimeString(), cpuUsage, memoryUsage, diskUsage }]);
  }, [cpuUsage, memoryUsage, diskUsage]);

  if (status === "failed") {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="CPU Usage" value={cpuUsage} icon={<FaMicrochip />} subtitle="Utilisation du processeur" />
      <StatCard title="Memory Usage" value={memoryUsage} icon={<FaMemory />} subtitle="Utilisation de la RAM" />
      <StatCard title="Disk Usage" value={diskUsage} icon={<FaHdd />} subtitle="Stockage utilisé" />
      <StatCard title="System Uptime" value={systemUptime} icon={<FaClock />} subtitle="Durée de fonctionnement" />
      
      <div className="bg-white shadow-lg rounded-xl p-6 col-span-1 md:col-span-2 lg:col-span-4">
        <h3 className="text-lg font-bold text-gray-800">Évolution des Performances</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={statsHistory}>
            <XAxis dataKey="time" stroke="#8884d8" />
            <YAxis />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Line type="monotone" dataKey="cpuUsage" stroke="#ff7300" name="CPU" />
            <Line type="monotone" dataKey="memoryUsage" stroke="#387908" name="RAM" />
            <Line type="monotone" dataKey="diskUsage" stroke="#8884d8" name="Disque" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, subtitle }) {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-lg shadow-lg flex items-center space-x-4">
      <div className="text-3xl">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm opacity-80">{subtitle}</p>
      </div>
    </div>
  );
}
