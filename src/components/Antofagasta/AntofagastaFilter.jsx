import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import React from "react";

const AntofagastaFilter = ({ title, items, selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="relative z-10 mb-8 flex justify-center lg:justify-start">
      <div className="w-full max-w-xs md:max-w-sm">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4 text-center lg:text-left">
          {title}
        </h2>
        <div className="relative">
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full px-5 py-2.5 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-xl shadow-md flex justify-between items-center 
                       hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 
                       transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            aria-expanded={isOpen}
            aria-controls="category-list"
            whileTap={{ scale: 0.98 }}
          >
            <span className="font-medium">{selected}</span>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDownIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {isOpen && (
              <motion.ul
                id="category-list"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden py-1 z-20"
                role="menu"
                aria-orientation="vertical"
              >
                {items.map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => {
                        onSelect(item);
                        setIsOpen(false);
                      }}
                      className={`block w-full text-left px-5 py-2 truncate text-sm 
                                 hover:bg-blue-50 dark:hover:bg-gray-700 focus:outline-none focus:bg-blue-50 dark:focus:bg-gray-700
                                 ${item === selected
                                   ? "bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-blue-100 font-semibold"
                                   : "text-gray-700 dark:text-gray-200"}
                                 transition-colors duration-150
                                `}
                      role="menuitem"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default React.memo(AntofagastaFilter);