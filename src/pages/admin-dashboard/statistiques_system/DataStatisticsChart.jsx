import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Skeleton from "../../../components/Skeleton";

const DataStatisticsChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isDarkMode = document.documentElement.classList.contains("dark");

  useEffect(() => {
    axiosInstance
      .get("/daily_data_statistics")
      .then((response) => {
        const formattedData = response.data.map((stat) => ({
          date: stat.date,
          incomingSize: stat.incomingSize,
          outgoingSize: stat.outgoingSize,
        }));
        setData(formattedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des statistiques:", error);
        setError("Erreur lors du chargement des données.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 dark:border-gray-600 border border-gray-200 shadow-md rounded-xl p-4 col-span-1 md:col-span-2 lg:col-span-4" style={{ paddingBottom: "2rem" }}>
        <h3 className="text-lg mb-3 font-medium text-gray-800 dark:text-gray-300 text-center">
      Données Entrantes et Sortantes (MB)
      </h3>
      <Skeleton/>
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
    <div className="p-4 bg-white dark:bg-gray-800 border-thin border-gray-200 dark:border-gray-600 rounded-lg shadow-md dark:shadow-lg max-w-4xl mx-auto">
      <h3 className="text-lg mb-3 font-medium text-gray-800 dark:text-gray-300 text-center">
      Données Entrantes et Sortantes (MB)
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#374151" : "#E5E7EB"} />
          <XAxis
            dataKey="date"
            angle={-45}
            textAnchor="end"
            tick={{ fill: isDarkMode ? "#e2e8f0" : "#4a5568" }}
          />
          <YAxis tick={{ fill: isDarkMode ? "#e2e8f0" : "#4a5568" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
              color: isDarkMode ? "#ffffff" : "#000000",
            }}
          />
          <Legend wrapperStyle={{ color: isDarkMode ? "#e2e8f0" : "#4a5568" }} />
          <Bar dataKey="incomingSize" fill="#3b82f6" name="Données entrantes (MB)" />
          <Bar dataKey="outgoingSize" fill="#10b981" name="Données sortantes (MB)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DataStatisticsChart;