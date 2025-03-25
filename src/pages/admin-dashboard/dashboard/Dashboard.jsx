import { motion } from "framer-motion";
import { FiUsers, FiBriefcase, FiBarChart2 } from "react-icons/fi";
import { HiOutlineDocumentReport } from "react-icons/hi";
import DistributionParEntreprise from "./DistributionParEntreprise";
import MonthlyInterns from "./MonthlyInterns";

const stats = [
  { icon: <FiUsers className="text-indigo-600 text-3xl dark:text-indigo-500" />, label: "Utilisateurs", value: "1,245" },
  { icon: <FiBriefcase className="text-indigo-600 text-3xl dark:text-indigo-500" />, label: "Entreprises", value: "342" },
  { icon: <FiBarChart2 className="text-indigo-600 text-3xl dark:text-indigo-500" />, label: "Stages en cours", value: "178" },
  { icon: <HiOutlineDocumentReport className="text-indigo-600 text-3xl dark:text-indigo-500" />, label: "Rapports soumis", value: "95" },
];

export default function Dashboard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="p-6 max-w-full dark:bg-gray-900 bg-white min-h-screen"
    >
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <motion.div 
            key={index}
            whileHover={{ scale: 1.02 }}
            className="dark:bg-gray-800 border-thin border-blue-300 cursor-pointer  bg-white shadow-sm rounded-xl p-6 flex items-center space-x-10"
          >{stat.icon}
            <div>
              <p className="dark:text-gray-50 text-gray-500 text-sm">{stat.label}</p>
              <p className="text-xl font-semibold dark:text-gray-300 text-gray-800">{stat.value}</p>
            </div>
            
            
          </motion.div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <DistributionParEntreprise />
        <MonthlyInterns />
      </div>
    </motion.div>
  );
}
 