import { motion, AnimatePresence } from "framer-motion";
import CatamarcaCard from "./CatamarcaCard";
import React from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      ease: "easeOut",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 140,
      damping: 14,
      ease: "easeOut",
    },
  },
};

const CatamarcaGrid = ({ locations, onLocationClick }) => {
  const accentColor = "#556B2F"; // Verde oliva característico

  if (!locations || locations.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center py-16 text-gray-600 dark:text-gray-400 text-2xl font-light italic"
      >
        No se encontraron lugares en esta categoría. ¡Explora otras opciones!
      </motion.div>
    );
  }

  return (
    <motion.section
      aria-label="Listado de ubicaciones turísticas de Catamarca"
      className="my-12 px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10"
        layout
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {locations.map((location) => (
            <motion.div
              key={location.id}
              variants={itemVariants}
              layout
              className="h-full flex justify-center"
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.25 } }}
            >
              <CatamarcaCard
                item={location}
                onClick={() => onLocationClick(location.id)}
                accentColor={accentColor}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
};

export default React.memo(CatamarcaGrid);
