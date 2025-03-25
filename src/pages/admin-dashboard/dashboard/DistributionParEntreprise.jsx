import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const data = [
  { name: "Tech Solutions", value: 12, color: "#8b5cf6" },
  { name: "Digital Agency", value: 8, color: "#c084fc" },
  { name: "Innovative Systems", value: 5, color: "#a78bfa" },
  { name: "Creative Design", value: 3, color: "#d8b4fe" },
  { name: "Autres", value: 7, color: "#e9d5ff" },
];

const DistributionParEntreprise = () => {
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
