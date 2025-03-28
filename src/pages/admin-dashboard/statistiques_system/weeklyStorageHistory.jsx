import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeeklyStorage } from "../../../stores/system_stats_slices/weeklyStorageSlice";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import Skeleton from "../../../components/Skeleton";

export default function WeeklyStorageHistory() {
  const dispatch = useDispatch();
  const { history, status, error } = useSelector((state) => state.weeklyStorage);

  // Déclenche la récupération des données si l'état est "idle"
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchWeeklyStorage());
    }
  }, [dispatch, status]);

  // Couleurs en fonction du mode sombre/clair
  const isDarkMode = document.documentElement.classList.contains("dark");
  const textColor = isDarkMode ? "#e2e8f0" : "#4a5568";
  const axisStroke = isDarkMode ? "#88f4d8" : "#4f5f68";
  const gridStroke = isDarkMode ? "#4b5563" : "#e2e8f0";
  const lineStroke = isDarkMode ? "#82ca9d" : "#873e23";
  const tooltipBackground = isDarkMode ? "#1f2937" : "#ffffff";
  const tooltipBorder = isDarkMode ? "#4b5563" : "#e2e8f0";

  if (status === "loading") {
    return (
      <div className="bg-white dark:bg-gray-800 dark:border-gray-600 border border-gray-200 shadow-md rounded-xl p-4 col-span-1 md:col-span-2 lg:col-span-4" style={{ paddingBottom: "2rem" }}>
        <h3 className="text-lg mb-3 font-medium text-gray-800 dark:text-gray-300 text-center">
          Historique du Stockage Chaque Semaine
        </h3>
        <Skeleton />
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        Erreur : {error}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 dark:border-gray-600 border border-gray-200 shadow-md rounded-xl p-4 col-span-1 md:col-span-2 lg:col-span-4" style={{ paddingBottom: "2rem" }}>
      <h3 className="text-lg mb-3 font-medium text-gray-800 dark:text-gray-300 text-center">
        Historique du Stockage  Chaque Semaine
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={history} margin={{ top: 5, right: 5, left: 5, bottom: 40 }}>
          <XAxis
            dataKey="date"
            stroke={axisStroke}
            angle={-45}
            textAnchor="end"
            tick={{ fill: textColor }}
            interval={0}
          />
          <YAxis
            stroke={textColor}
            label={{
              value: "Stockage en GB",
              angle: -90,
              position: "insideLeft",
              style: {
                textAnchor: "middle",
                fill: textColor,
                fontSize: "14px",
              },
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: tooltipBackground,
              color: textColor,
              border: `1px solid ${tooltipBorder}`,
              borderRadius: "8px",
              padding: "8px",
            }}
          />
          <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
          <Line
            type="monotone"
            dataKey="storageUsage"
            stroke={lineStroke}
            name="Stockage (GB)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}