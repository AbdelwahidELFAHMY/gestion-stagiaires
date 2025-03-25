import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axiosInstance from "../../../utils/axiosInstance";
import Skeleton from "../../../components/Skeleton";

const ResponseTimeChart = () => {
  const [responseTimeData, setResponseTimeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fonction pour extraire le jour de la date
  const getDayFromDate = (dateString) => {
    const date = new Date(dateString);
    const days = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
    return days[date.getDay()]; // Retourne le jour correspondant (Dim, Lun, etc.)
  };

  // Récupérer les données depuis l'API
  useEffect(() => {
    const fetchResponseTimes = async () => {
      try {
        const response = await axiosInstance.get("/performance/response-times");
        const transformedData = response.data.map((item) => ({
          date: getDayFromDate(item.date), 
          responseTime: item.responseTime, 
        
        }));
        setResponseTimeData(transformedData);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        setError("Erreur lors du chargement des données.");
        setLoading(false);
      }
    };

    fetchResponseTimes();
  }, []);


  
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 dark:border-gray-600 border border-gray-200 shadow-md rounded-xl p-4 col-span-1 md:col-span-2 lg:col-span-4" style={{ paddingBottom: "2rem" }}>
      
        <Skeleton />
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
    <div className="bg-white dark:bg-gray-800 dark:border-thin border-blue-900 p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Évolution du temps de réponse</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={responseTimeData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="date" stroke="currentColor" />
          <YAxis unit=" ms" stroke="currentColor" />
          <Tooltip contentStyle={{ backgroundColor: "#333", color: "#fff" }} />
          <Legend />
          <Line type="monotone" dataKey="responseTime" stroke="#4F46E5" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ResponseTimeChart;