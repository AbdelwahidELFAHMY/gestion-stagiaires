import React from 'react';
import { motion } from 'framer-motion';

export const PageFlow = () => {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <motion.div 
        className="w-full h-full"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-stellar-400/20 to-stellar-900/20 backdrop-blur-sm"></div>
          <div className="bg-gradient-to-br from-stellar-900/80 to-stellar-950/90 border border-white/10 rounded-xl p-5">
            <div className="flex items-center mb-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="mx-auto h-5 w-48 bg-stellar-800/60 rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-5 gap-4 h-64">
              <div className="col-span-1 space-y-3">
                <div className="h-8 w-full bg-stellar-800/60 rounded-lg"></div>
                {[1, 2, 3, 4, 5].map((i) => (
                  <motion.div 
                    key={i}
                    className="h-6 w-full bg-stellar-800/40 rounded-lg"
                    initial={{ opacity: 0.6 }}
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  ></motion.div>
                ))}
              </div>
              <div className="col-span-4 space-y-4">
                <div className="h-10 bg-stellar-800/60 rounded-lg"></div>
                <div className="grid grid-cols-3 gap-3">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <motion.div 
                      key={i}
                      className="bg-gradient-to-br from-stellar-700/40 to-stellar-800/40 p-3 rounded-lg h-24"
                      whileHover={{ y: -5, scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="w-8 h-8 rounded-full bg-stellar-500/60 mb-2"></div>
                      <div className="h-3 w-3/4 bg-white/30 rounded-full mb-2"></div>
                      <div className="h-2 w-1/2 bg-white/20 rounded-full"></div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-5 flex justify-between items-center">
              <div className="flex space-x-2">
                <motion.div 
                  className="w-10 h-10 bg-stellar-600/50 rounded-full"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                ></motion.div>
                <div className="w-24 h-6 bg-stellar-800/30 rounded-lg self-center"></div>
              </div>
              <div className="flex space-x-2">
                <div className="w-20 h-8 bg-stellar-800/40 rounded-lg"></div>
                <div className="w-20 h-8 bg-stellar-600/50 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <motion.div 
          className="absolute -top-10 -right-10 w-40 h-40 bg-stellar-400/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity }}
        ></motion.div>
        <motion.div 
          className="absolute -bottom-8 -left-8 w-40 h-40 bg-stellar-600/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 7, repeat: Infinity, delay: 1 }}
        ></motion.div>
      </motion.div>
    </motion.div>
  );
};
