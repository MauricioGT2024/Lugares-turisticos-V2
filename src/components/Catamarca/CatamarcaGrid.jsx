import { useState } from 'react';
import { motion } from 'framer-motion';
import CatamarcaCard from './CatamarcaCard';
import CatamarcaModal from './CatamarcaModal';

const CatamarcaGrid = ({ locations, onLocationClick }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {locations.map((location, index) => (
        <motion.div
          key={location.id || index}
          variants={item}
          className="h-full"
        >
          <CatamarcaCard
            item={location}
            onClick={() => onLocationClick(location.id)}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CatamarcaGrid;
