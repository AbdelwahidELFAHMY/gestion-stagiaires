import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axiosInstance from "../../../utils/axiosInstance";
import Skeleton from "../../../components/Skeleton";

export default function RequestRateChart() {
  const [requestRateData, setRequestRateData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("/performance/request-counts")
      .then((response) => {
        // Formater les données pour les adapter au graphique
        const formattedData = response.data.map((item) => ({
          date: item.date.toString(), // Assurez-vous que la date est au bon format
          requests: item.count,
        }));
        setRequestRateData(formattedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données:", error);
        setError(error);
        setLoading(false);
      });
  }, []);


  
  if (loading) {
    return (
    <div className="h-full bg-white dark:bg-gray-800 border-thin border-gray-200 dark:border-gray-600 rounded-xl p-6">
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
    <div className="bg-white dark:bg-gray-800 dark:border-thin border-neutral-600 p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Nombre de requêtes</h2>
      {requestRateData && requestRateData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={requestRateData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="date" stroke="currentColor" />
            <YAxis stroke="currentColor" />
            <Tooltip
              contentStyle={{ backgroundColor: "#333", color: "#fff" }}
            />
            <Legend />
            <Bar dataKey="requests" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-300">
          Aucune donnée disponible
        </p>
      )}
    </div>
  );
}
