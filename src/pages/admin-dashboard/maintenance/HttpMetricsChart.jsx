import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import axiosInstance from "../../../utils/axiosInstance";
import Skeleton from "../../../components/Skeleton";
import { ArrowLeft, ArrowRight } from "lucide-react";

const HttpMetricsChart = () => {
  const [data, setData] = useState([]);
  const [allWeeks, setAllWeeks] = useState([]);
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
  const [weeklyData, setWeeklyData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState("");
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const response = await axiosInstance.get("/http-statis");
        console.log("Données de l'API:", response.data);

        const groupedByWeek = groupDataByWeek(response.data);
        const weeks = Object.keys(groupedByWeek).sort().reverse();

        setAllWeeks(weeks);
        setWeeklyData(groupedByWeek);

        if (weeks.length > 0) {
          updateChartData(groupedByWeek[weeks[0]], weeks[0]);
        }

        const pieData = calculatePercentages(response.data);
        setPieData(pieData);
          setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
        setLoading(false);
        setError(
          "Erreur lors de la récupération des données. Veuillez réessayer."
        );
      }
    };

    fetchData();
  }, []);

  const groupDataByWeek = (data) => {
    const grouped = {};

    data.forEach((item) => {
      const date = new Date(item.timestamp);
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay());

      const weekKey = weekStart.toISOString().split("T")[0];

      if (!grouped[weekKey]) {
        grouped[weekKey] = [];
      }
      grouped[weekKey].push(item);
    });

    return grouped;
  };

  const updateChartData = (weekData, weekKey) => {
    const formattedData = formatData(weekData, weekKey);
    setData(formattedData);

    const startDate = new Date(weekKey);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);

    const options = { day: "numeric", month: "long", year: "numeric" };
    const startDateStr = startDate.toLocaleDateString("fr-FR", options);
    const endDateStr = endDate.toLocaleDateString("fr-FR", options);

    setDateRange(
      `Les statuts des requêtes HTTP entre ${startDateStr} et ${endDateStr}`
    );
  };

  const formatData = (weekData, weekKey) => {
    const grouped = {};

    const startDate = new Date(weekKey);
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);

      const dateStr = currentDate.toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "short",
      });

      grouped[dateStr] = { date: dateStr, 200: 0, 404: 0, 500: 0 };
    }

    weekData.forEach(({ statusCode, count, timestamp }) => {
      const date = new Date(timestamp).toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "short",
      });
      if (grouped[date]) {
        grouped[date][statusCode] = count;
      }
    });

    return Object.values(grouped);
  };

  const calculatePercentages = (data) => {
    const total = data.reduce((acc, item) => acc + item.count, 0);
    const statusCounts = {
      200: data
        .filter((item) => item.statusCode === "200")
        .reduce((acc, item) => acc + item.count, 0),
      404: data
        .filter((item) => item.statusCode === "404")
        .reduce((acc, item) => acc + item.count, 0),
      500: data
        .filter((item) => item.statusCode === "500")
        .reduce((acc, item) => acc + item.count, 0),
    };

    return [
      { name: "200 OK", value: (statusCounts["200"] / total) * 100 },
      { name: "404 Not Found", value: (statusCounts["404"] / total) * 100 },
      { name: "500 Server Error", value: (statusCounts["500"] / total) * 100 },
    ];
  };

  const handlePreviousWeek = () => {
    if (currentWeekIndex < allWeeks.length - 1) {
      const newIndex = currentWeekIndex + 1;
      setCurrentWeekIndex(newIndex);
      updateChartData(weeklyData[allWeeks[newIndex]], allWeeks[newIndex]);
    }
  };

  const handleNextWeek = () => {
    if (currentWeekIndex > 0) {
      const newIndex = currentWeekIndex - 1;
      setCurrentWeekIndex(newIndex);
      updateChartData(weeklyData[allWeeks[newIndex]], allWeeks[newIndex]);
    }
  };

  const COLORS = ["#4CAF50", "#FF5733", "#FFC300"];

  if (loading) {
    return (
      <div className="px-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className=" bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-6">
          <Skeleton />
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-6">
          <Skeleton />
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
    <div className=" bg-white dark:bg-gray-900 px-6 z-0">
      {/* Conteneur principal en grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Premier graphique (BarChart) */}
        <div className="h-80 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-500 p-4 rounded-lg">
          <div className="text-size15 font-semibold text-gray-800 dark:text-gray-200 mb-4 flex justify-between items-center">
            <span>Historique de Statut des requêtes HTTP par jour</span>
            <div className="flex space-x-4">
              <button
                onClick={handlePreviousWeek}
                disabled={currentWeekIndex === allWeeks.length - 1}
                className="p-2 cursor-pointer bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextWeek}
                disabled={currentWeekIndex === 0}
                className="p-2 cursor-pointer bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          {error ? (
            <div className="flex justify-center items-center h-full text-red-500">
              {error}
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="200" fill="#4CAF50" name="200 OK" />
                <Bar dataKey="404" fill="#FF5733" name="404 Not Found" />
                <Bar dataKey="500" fill="#FFC300" name="500 Server Error" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Deuxième graphique (PieChart) */}
        <div className="h-80 bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-500 p-4 rounded-lg">
          <h3 className="text-size15 text-center font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Répartition des statuts HTTP
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ percent }) => `${(percent * 100).toFixed(2)}%`}
                labelStyle={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  fill: "#333",
                }}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600">
        <p className="font-semibold text-gray-800 dark:text-gray-200">{`${data.name}`}</p>
        <p className="text-gray-600 dark:text-gray-300">{`Pourcentage: ${data.value.toFixed(
          2
        )}%`}</p>
      </div>
    );
  }
  return null;
};

export default HttpMetricsChart;
