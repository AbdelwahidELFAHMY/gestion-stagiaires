import { motion } from "framer-motion";

export const Decor = () => {
  return (
    <motion.div
      className="relative bg-transparent"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <motion.div
        className="w-full h-full "
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative z-10 rounded-xl overflow-hidden bg-gradient-to-br from-indigo-700/20 to-blue-950/90 p-5 shadow-md backdrop-blur-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-blue-900/20 backdrop-blur-smooth"></div>
          <div className="flex items-center mb-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="mx-auto h-5 w-48 bg-indigo-800/50 rounded-full"></div>
          </div>

          <div className="grid grid-cols-5 gap-4 h-64">
            <div className="col-span-1 space-y-3">
              <div className="h-8 w-full bg-indigo-600/50 rounded-lg"></div>
              {[1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={i}
                  className="h-6 w-full bg-blue-300/30 rounded-lg"
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: [0.1, 0.6, 0.1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                ></motion.div>
              ))}
            </div>
            <div className="col-span-4 space-y-4">
              <div className="h-10 bg-indigo-700/50 rounded-lg"></div>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <motion.div
                    key={i}
                    className="bg-indigo-600/30 p-3 rounded-lg h-24 border border-white/10"
                    whileHover={{ y: -3, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <div className="w-8 h-8 rounded-full bg-indigo-400/50 mb-2"></div>
                    <div className="h-3 w-3/4 bg-white/10 rounded-full mb-2"></div>
                    <div className="h-2 w-1/2 bg-white/10 rounded-full"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 flex justify-between items-center">
            <div className="flex space-x-2">
              <motion.div
                className="w-10 h-10 bg-indigo-400/40 rounded-full"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              ></motion.div>
              <div className="w-24 h-6 bg-indigo-300/20 rounded-lg self-center"></div>
            </div>
            <div className="flex space-x-2">
              <div className="w-20 h-8 bg-indigo-800/30 rounded-lg"></div>
              <div className="w-20 h-8 bg-indigo-600/40 rounded-lg"></div>
            </div>
          </div>
        </div>

        {/* Éléments décoratifs subtils */}
        <motion.div
          className="absolute -top-5 -right-5 w-20 h-20 bg-indigo-100/10 rounded-full"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity }}
        ></motion.div>
        <motion.div
          className="absolute -bottom-3 -left-3 w-16 h-16 bg-blue-600/10 rounded-full"
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 7, repeat: Infinity, delay: 1 }}
        ></motion.div>
      </motion.div>
    </motion.div>
  );
};
