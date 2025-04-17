import React from 'react';
import { motion } from 'framer-motion';


const FeatureCard = ({ icon, title, description, index }) => {
  return (
    <motion.div
      className="flex flex-col items-center text-center bg-white/5 backdrop-blur-md p-8 rounded-xl shadow-xl border border-white/10 hover:shadow-2xl transition-all duration-500 relative overflow-hidden group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px 0px" }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-stellar-800/0 via-stellar-700/0 to-stellar-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="bg-gradient-to-br from-stellar-400 to-stellar-600 p-4 rounded-2xl mb-6 shadow-lg relative z-10">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-white mb-4 relative z-10">{title}</h3>
      <p className="text-gray-300 relative z-10">{description}</p>
      
      <motion.div 
        className="absolute -bottom-20 -right-20 w-40 h-40 bg-stellar-400/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100"
        transition={{ duration: 0.5 }}
      ></motion.div>
    </motion.div>
  );
};

export default FeatureCard;
