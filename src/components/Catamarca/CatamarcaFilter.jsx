import React from "react";
import { motion } from "framer-motion";

const CatamarcaFilter = ({ title, items = [], selected, onSelect, isDark }) => {
  const allItems = ["Todos", ...items];
  const accentColor = "#3B7A57";

  return (
    <section className="w-full py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          {title}
        </h2>

        <div className="flex flex-wrap gap-3 justify-start items-center">
          {allItems.map((item) => {
            const isActive = selected === item;

            return (
              <motion.button
                key={item}
                onClick={() => onSelect(item)}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                aria-pressed={isActive}
                className={`px-5 py-2 text-sm font-medium rounded-full border transition-all duration-200 shadow-sm focus:outline-none focus:ring-2
                ${
                  isActive
                    ? "text-white bg-gradient-to-r from-green-600 to-teal-500 border-transparent focus:ring-green-400"
                    : isDark
                    ? "text-gray-200 bg-gray-800 border-gray-600 hover:bg-gray-700 focus:ring-gray-500"
                    : "text-gray-700 bg-white border-gray-300 hover:bg-gray-100 focus:ring-blue-500"
                }`}
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

export default React.memo(CatamarcaFilter);
