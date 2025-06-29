import { motion } from "framer-motion";
import React from "react";

const CatamarcaFilter = ({ title, items, selected, onSelect, isDark }) => {
  const oliveStart = "#556B2F"; // Verde oliva oscuro
  const oliveEnd = "#8F9779"; // Verde oliva más claro

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h3
          className={
            "text-3xl font-extrabold tracking-tight mb-4 md:mb-0 text-gray-900 dark:text-white "
          }
        >
          {title}
        </h3>
        <div className="flex flex-wrap justify-center md:justify-start gap-3">
          {["Todos", ...items].map((item) => {
            const isActive = selected === item;
            const baseClasses =
              "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-offset-2";
            const activeClasses =
              "bg-gradient-to-r from-teal-500 to-green-600 text-white shadow-lg focus:ring-teal-400";
            const inactiveDarkClasses =
              "bg-gray-700 text-gray-200 hover:bg-gray-600 border border-gray-600 focus:ring-gray-500 hover:shadow-md";
            const inactiveLightClasses =
              "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200 focus:ring-blue-500 hover:shadow-md";
            const offsetClasses = isDark
              ? "focus:ring-offset-gray-900"
              : "focus:ring-offset-white";

            return (
              <motion.button
                key={item}
                onClick={() => onSelect(item)}
                whileHover={{
                  scale: 1.05,
                  boxShadow: isActive
                    ? isDark
                      ? "0 0 20px rgba(34,197,94,0.6)"
                      : "0 0 20px rgba(6,182,212,0.6)"
                    : isDark
                    ? "0 0 15px rgba(55,65,81,0.5)"
                    : "0 0 15px rgba(209,213,219,0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                aria-pressed={isActive}
                className={`${baseClasses} ${
                  isActive
                    ? activeClasses
                    : isDark
                    ? inactiveDarkClasses
                    : inactiveLightClasses
                } ${offsetClasses}`}
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
