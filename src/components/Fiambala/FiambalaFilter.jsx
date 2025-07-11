import { motion } from "framer-motion";
import React from "react";

const FiambalaFilter = ({ title, items, selected, onSelect, isDark }) => {
  // Definir clases base y de estados según el modo (oscuro o claro)
  const baseButtonClasses =
    "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-offset-2";

  const activeButtonClasses =
    "bg-linear-to-r from-orange-500 to-red-600 text-white shadow-lg focus:ring-orange-400";

  const darkButtonClasses =
    "bg-gray-700 text-gray-200 hover:bg-gray-600 border border-gray-600 focus:ring-gray-500 hover:shadow-md";
    
  const lightButtonClasses =
    "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200 focus:ring-orange-500 hover:shadow-md";

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h3 className="text-3xl font-extrabold tracking-tight mb-4 md:mb-0 text-gray-900 dark:text-white">
          {title}
        </h3>
        <div className="flex flex-wrap justify-center md:justify-start gap-3">
          {[...items].map((item) => {
            const isActive = selected === item;

            return (
              <motion.button
                key={item}
                onClick={() => onSelect(item)}
                whileHover={{
                  scale: 1.05,
                  boxShadow: isActive
                    ? isDark
                      ? "0 0 20px rgba(249,115,22,0.6)"
                      : "0 0 20px rgba(234,88,12,0.6)"
                    : isDark
                    ? "0 0 15px rgba(55,65,81,0.5)"
                    : "0 0 15px rgba(209,213,219,0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                aria-pressed={isActive}
                className={`${baseButtonClasses} 
                  ${isActive ? activeButtonClasses : isDark ? darkButtonClasses : lightButtonClasses}`}
              >
                {item}
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default React.memo(FiambalaFilter);
