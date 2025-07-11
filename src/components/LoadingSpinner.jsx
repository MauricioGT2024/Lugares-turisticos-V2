import React from "react";
import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full dark:bg-linear-to-b dark:from-gray-900 dark:to-gray-800 bg-linear-to-b from-white to-gray-100">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
        className="w-16 h-16 border-4 rounded-full border-t-transparent border-teal-400 dark:border-teal-600
        "
      />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: [0, 1, 0],
          y: [10, 0, 10],
        }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="mt-6 text-lg font-semibold text-gray-300 dark:text-gray-700"
      >
        Cargando...
      </motion.p>
    </div>
  );
};

export default LoadingSpinner;
