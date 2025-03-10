import { motion } from "framer-motion";
import { FiUsers, FiBriefcase, FiBarChart2, FiActivity } from "react-icons/fi";
import { HiOutlineDocumentReport } from "react-icons/hi";

const stats = [
  { icon: <FiUsers className="text-indigo-600 text-3xl" />, label: "Utilisateurs", value: "1,245" },
  { icon: <FiBriefcase className="text-indigo-600 text-3xl" />, label: "Entreprises", value: "342" },
  { icon: <FiBarChart2 className="text-indigo-600 text-3xl" />, label: "Stages en cours", value: "178" },
  { icon: <HiOutlineDocumentReport className="text-indigo-600 text-3xl" />, label: "Rapports soumis", value: "95" },
];

export default function Dashboard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="p-6 w-full bg-gray-50 min-h-screen"
    >
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Tableau de Bord</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div 
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-md rounded-2xl p-6 flex items-center space-x-4"
          >
            {stat.icon}
            <div>
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <p className="text-xl font-semibold text-gray-800">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-8 bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Activité récente</h2>
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <div className="flex items-center space-x-4 p-4 border-b">
            <FiActivity className="text-indigo-600 text-xl" />
            <p className="text-gray-700">Un nouveau rapport de stage a été soumis.</p>
          </div>
          <div className="flex items-center space-x-4 p-4 border-b">
            <FiActivity className="text-indigo-600 text-xl" />
            <p className="text-gray-700">Un nouvel utilisateur s'est inscrit sur la plateforme.</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
