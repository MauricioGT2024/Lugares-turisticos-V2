import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useColorMode } from '@chakra-ui/react';
import { categoryConfig } from './categoryConfig';
import { ANTOFAGASTA_ANIMATIONS } from './config/animations';

const LocationCard = ({ location, onShowDetails }) => {
  const { colorMode } = useColorMode();
  const config = categoryConfig[location.categoria] || categoryConfig.Campo;
  const Icon = config.icon;

  return (
    <motion.article
      variants={ANTOFAGASTA_ANIMATIONS.cardVariants}
      whileHover={{ scale: 1.02, y: -5 }}
      onClick={() => onShowDetails(location.id)}
      className={`
        group cursor-pointer rounded-2xl overflow-hidden
        ${colorMode === 'dark' ? 'bg-gray-800' : 'bg-white'}
        shadow-lg hover:shadow-2xl transition-all duration-300
      `}
    >
      <div className={`
        relative rounded-2xl overflow-hidden shadow-lg
        transition-all duration-300 ease-in-out
        ${colorMode === 'dark' ? 'bg-gray-800' : 'bg-white'}
        hover:shadow-2xl
      `}>
        <div className="relative h-60 overflow-hidden">
          <img
            src={location.imgSrc}
            alt={location.title}
            className="w-full h-full object-cover transition duration-500 
                     group-hover:scale-110 group-hover:rotate-1"
          />
          <div className={`
            absolute top-4 right-4 px-4 py-1.5 
            rounded-full flex items-center gap-2
            text-sm font-medium text-white
            backdrop-blur-sm bg-opacity-90
            ${config.bgClass}
          `}>
            <Icon className="w-4 h-4" />
            <span>{location.categoria}</span>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <h3 className={`
            text-lg font-bold tracking-tight
            transition-colors duration-300
            ${colorMode === 'dark' ? 'text-white' : 'text-gray-900'}
            ${config.hoverClass}
          `}>
            {location.title}
          </h3>
          <p className={`
            text-sm line-clamp-3
            ${colorMode === 'dark' ? 'text-gray-300' : 'text-gray-600'}
          `}>
            {location.description}
          </p>
        </div>
      </div>
    </motion.article>
  );
};

LocationCard.propTypes = {
  location: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    imgSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    mapSrc: PropTypes.string.isRequired,
    path: PropTypes.string,
    wiki: PropTypes.string,
    categoria: PropTypes.string.isRequired,
    area: PropTypes.string,
  }).isRequired,
  onShowDetails: PropTypes.func.isRequired,
};

export default React.memo(LocationCard);
