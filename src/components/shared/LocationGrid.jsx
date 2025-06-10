import React from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

const Card = ({ image, title, description, category, onClick }) => (
  <motion.div
    whileHover={{ y: -8 }}
    whileTap={{ scale: 0.98 }}
    className="relative h-[400px] rounded-xl overflow-hidden cursor-pointer group shadow-lg"
    onClick={onClick}
  >
    <div className="absolute inset-0">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
    </div>
    
    {category && (
      <span className="absolute top-4 right-4 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium">
        {category}
      </span>
    )}

    <div className="absolute bottom-0 p-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-200 line-clamp-2">{description}</p>
    </div>
  </motion.div>
);

const LocationGrid = ({ locations, onLocationClick, styles = {} }) => {
  const {
    container = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
  } = styles;

  return (
    <motion.div
      layout
      className={container}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {locations.map((location) => (
          <motion.div
            key={location.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            layout
          >
            <Card
              image={location.imgSrc}
              title={location.title || location.name}
              description={location.description}
              category={location.category || location.area}
              onClick={() => onLocationClick(location.id)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

LocationGrid.propTypes = {
  locations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      imgSrc: PropTypes.string.isRequired,
      title: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.string.isRequired,
      category: PropTypes.string,
      area: PropTypes.string,
    })
  ).isRequired,
  onLocationClick: PropTypes.func.isRequired,
};

export default LocationGrid;
