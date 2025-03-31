import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", interns: 5 },
  { month: "Fév", interns: 7 },
  { month: "Mar", interns: 10 },
  { month: "Avr", interns: 13 },
  { month: "Mai", interns: 18 },
  { month: "Juin", interns: 15 },
  { month: "Juil", interns: 12 },
  { month: "Août", interns: 8 },
  { month: "Sep", interns: 11 },
  { month: "Oct", interns: 9 },
  { month: "Nov", interns: 7 },
  { month: "Déc", interns: 6 },
];

const MonthlyInterns = () => {
  return (
<div className="border border-gray-300 rounded-lg p-4 w-full mx-auto">
<h2 style={{ fontSize: "18px", marginBottom: "16px", textAlign: "center" }}>Stagiaires par mois</h2>
      <div style={{ height: "300px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="2 2" vertical={false} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => [`${value} stagiaires`, 'Nombre']} />
            <Bar dataKey="interns" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyInterns;
