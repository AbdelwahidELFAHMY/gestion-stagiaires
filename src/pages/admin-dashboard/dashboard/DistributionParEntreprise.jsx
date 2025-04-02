import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import axiosInstance from "../../../utils/axiosInstance";

const DistributionParEntreprise = () => {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("admin/entreprises/stagiaires_par_entreprise")
      .then((response) => {
        const transformedData = Object.entries(response.data).map(([name, value]) => ({
          name,
          shortName: name.substring(0, 2).toUpperCase(), // Récupère les 2 premières lettres
          value,
          color: getRandomColor(), 
        }));
        setData(transformedData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.response?.data?.message || "Erreur est survenue lors de l'appel au backend");
        setLoading(false);
      });
  }, []);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Personnalisation du Tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white text-size13 dark:text-gray-200 dark:bg-gray-700 p-3 border border-gray-200 dark:border-gray-600 rounded shadow-lg">
          <p className="font-semibold">{payload[0].payload.name}</p>
          <p>{payload[0].value} stagiaires</p>
        </div>
      );
    }
    return null;
  };

  // Personnalisation de la légende
  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <ul className="flex flex-wrap justify-center gap-2 mt-4 dark:text-gray-300">
        {payload.map((entry, index) => (
          <li 
            key={`item-${index}`} 
            className="flex items-center"
            title={entry.payload.name} // Tooltip avec le nom complet
          >
            <span 
              className="inline-block w-4 h-4 mr-2" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs">{entry.payload.shortName}</span>
          </li>
        ))}
      </ul>
    );
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="border-thin dark:bg-gray-800 border-gray-300 dark:border-gray-500 rounded-lg p-4 w-full mx-auto">
      <h2 className="dark:text-gray-200" style={{ fontSize: "18px", marginBottom: "16px", textAlign: "center" }}>
        Distribution par entreprise
      </h2>
      <div style={{ height: "300px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={110}
              fill="#8884d8"
              dataKey="value"
              label={({ shortName }) => shortName} // Affiche les 2 premières lettres sur les slices
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={renderLegend} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DistributionParEntreprise;