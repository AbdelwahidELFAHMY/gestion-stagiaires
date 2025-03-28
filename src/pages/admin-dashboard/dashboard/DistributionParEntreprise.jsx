import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import axiosInstance from "../../../utils/axiosInstance";

const DistributionParEntreprise = () => {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupérer les données depuis l'API
  useEffect(() => {
    axiosInstance
      .get("admin/entreprises/stagiaires_par_entreprise")
      .then((response) => {
        const transformedData = Object.entries(response.data).map(([name, value]) => ({
          name,
          value,
          color: getRandomColor(), 
        }));
        setData(transformedData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.response.data.message || "Erreur est survenue lors de l'appel au backend");
        setLoading(false);
      });
  }, []);

  // Fonction pour générer des couleurs aléatoires
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "16px", width: "100%", maxWidth: "500px", margin: "auto" }}>
      <h2 style={{ fontSize: "18px", marginBottom: "16px", textAlign: "center" }}>Distribution par entreprise</h2>
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
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value} stagiaires`, 'Nombre']} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DistributionParEntreprise;
