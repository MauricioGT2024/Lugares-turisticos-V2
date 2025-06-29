import { motion, AnimatePresence } from 'framer-motion';
import AntofagastaCard from './AntofagastaCard';
import React from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.8 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 120, damping: 14 } }
};

const AntofagastaGrid = ({ locations, onLocationClick }) => {
  if (!locations || locations.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-10 text-gray-600 dark:text-gray-400 text-xl font-medium"
      >
        Lo sentimos, no hay lugares disponibles en esta categoría.
      </motion.div>
    );
  }

  return (
    <motion.section
      aria-label="Listado de ubicaciones turísticas"
      className="my-10"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 lg:gap-9">
        <AnimatePresence>
          {locations.map(location => (
            <motion.div
              key={location.id}
              variants={itemVariants}
              layout
              className="h-full flex"
            >
              <AntofagastaCard
                item={location}
                onClick={onLocationClick}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default React.memo(AntofagastaGrid);
