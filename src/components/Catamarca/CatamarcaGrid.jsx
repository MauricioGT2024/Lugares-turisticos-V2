import { motion, AnimatePresence } from "framer-motion";
import CatamarcaCard from "./CatamarcaCard";
import React from "react";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.25,
      ease: "easeOut",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 160,
      damping: 18,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.95,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

const CatamarcaGrid = ({ locations, onLocationClick }) => {
  const accentColor = "#556B2F"; // Verde oliva característico

  if (!locations || locations.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center justify-center py-20 text-gray-500 dark:text-gray-400"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-20 h-20 mb-6 text-gray-300 dark:text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 17v-2a4 4 0 014-4h4m-4-4h.01M6 19h12a2 2 0 002-2v-7a2 2 0 00-2-2H6a2 2 0 00-2 2v7a2 2 0 002 2z"
          />
        </svg>
        <p className="text-lg italic font-light max-w-md text-center">
          No se encontraron lugares para esta categoría.
          <br />
          ¡Intenta explorar otras opciones!
        </p>
      </motion.div>
    );
  }

  return (
    <motion.section
      role="list"
      aria-label="Listado de lugares turísticos en Catamarca"
      className="my-12 px-6 sm:px-8 lg:px-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.ul
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        layout
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {locations.map((location) => (
            <motion.li
              key={location.id}
              variants={itemVariants}
              layout
              role="listitem"
              className="flex justify-center"
              exit="exit"
            >
              <CatamarcaCard
                item={location}
                onClick={() => onLocationClick(location.id)}
                accentColor={accentColor}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </motion.section>
  );
};

export default React.memo(CatamarcaGrid);
