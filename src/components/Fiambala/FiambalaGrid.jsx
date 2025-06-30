import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import FiambalaCard from './FiambalaCard';

const FiambalaGrid = ({ locations, onLocationClick }) => {
  return (
    <motion.div
      layout
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
    >
      {locations.map((location, index) => (
        <motion.div
          key={location.id}
          layoutId={location.id} // Para transiciones más suaves
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
            delay: index * 0.1, // Un pequeño retraso para cada tarjeta
          }}
          whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)" }} // Efecto hover
        >
          <FiambalaCard
            image={location.imgSrc}
            title={location.title || location.name}
            description={location.description}
            category={location.category}
            onClick={() => onLocationClick(location.id)}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

FiambalaGrid.propTypes = {
  locations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      imgSrc: PropTypes.string.isRequired,
      title: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.string.isRequired,
      category: PropTypes.string,
    })
  ).isRequired,
  onLocationClick: PropTypes.func.isRequired,
};

export default FiambalaGrid;
