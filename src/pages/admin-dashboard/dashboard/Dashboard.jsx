import { motion } from "framer-motion";
import { FiUsers, FiBarChart2 } from "react-icons/fi";
import { HiOutlineDocumentReport } from "react-icons/hi";
import DistributionParEntreprise from "./DistributionParEntreprise";
import MonthlyInterns from "./MonthlyInterns";
import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance.jsx";
import Skeleton from "../../../components/Skeleton.jsx";
import { Building2 } from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance
    .get("admin/entreprises/statistiques")
    .then((response) => {
        const data = response.data; 

        setStats([
          {
            icon: <FiUsers className="text-indigo-600 text-3xl dark:text-indigo-500" />,
            label: "Utilisateurs",
            value: data.nbrUtilisateurs,
          },
          {
            icon: <Building2 className="text-indigo-600 text-3xl dark:text-indigo-500" />,
            label: "Entreprises",
            value: data.nbrEntreprises,
          },
          {
            icon: <FiBarChart2 className="text-indigo-600 text-3xl dark:text-indigo-500" />,
            label: "Stages en cours",
            value: data.nbrStages,
          },
          {
            icon: <HiOutlineDocumentReport className="text-indigo-600 text-3xl dark:text-indigo-500" />,
            label: "Rapports soumis",
            value: data.nbrRapports,
          },
        ]);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch(() => {
        setError("Une erreur est survenue lors de la récupération des données.");
        setLoading(false);
      });
  }, []);

    if (loading) {
      return (
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="h-26 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse"
              />
            ))}
          </div>
          <div className="h-96 flex flex-col lg:flex-row gap-6">
            <div className="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-6">
              <Skeleton />
            </div>
            <div className="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-6">
              <Skeleton />
            </div>
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 max-w-full dark:bg-gray-900 bg-white min-h-screen"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            className="dark:bg-gray-800 border-thin dark:border-blue-800 border-blue-300 cursor-pointer bg-white shadow-sm rounded-xl p-6 flex items-center space-x-10"
          >
            {stat.icon}
            <div>
              <p className="dark:text-gray-50 text-gray-500 text-sm">{stat.label}</p>
              <p className="text-xl font-semibold dark:text-gray-300 text-gray-800">
                {stat.value}
              </p>
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
