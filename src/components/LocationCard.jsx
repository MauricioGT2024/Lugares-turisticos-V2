import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useColorMode } from '@chakra-ui/react';
import { FaEye } from 'react-icons/fa';

const LocationCard = ({ location, onClick, config }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { colorMode } = useColorMode();
  const Icon = config.icon;
  
  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <div className={`
        h-[420px] rounded-xl overflow-hidden
        ${colorMode === 'dark' ? 'bg-gray-800' : 'bg-white'}
        shadow-lg hover:shadow-2xl
        transition-all duration-300 ease-out
        border border-transparent
        ${colorMode === 'dark' 
          ? 'hover:border-gray-700' 
          : 'hover:border-gray-200'
        }
      `}>
        <div className="relative h-48">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin"
                   style={{ borderColor: `${config.spinnerColor || '#38B2AC'} transparent` }} 
              />
            </div>
          )}
          
          <img
            src={location.imgSrc}
            alt={location.title}
            onLoad={handleImageLoad}
            className={`
              w-full h-full object-cover
              transition-all duration-500
              group-hover:scale-105
              ${imageLoaded ? 'opacity-100' : 'opacity-0'}
            `}
          />
          
          {config.category && (
            <span className={`
              absolute top-3 right-3 
              px-3 py-1.5 rounded-full
              flex items-center gap-2
              text-sm font-medium text-white
              shadow-lg backdrop-blur-sm
              ${config.badgeClass || 'bg-teal-500'}
            `}>
              {Icon && <Icon className="w-4 h-4" />}
              {location.category}
            </span>
          )}
        </div>

        <div className="p-5 flex flex-col h-[calc(420px-192px)]">
          <div className="flex items-center gap-2 mb-3">
            {Icon && <Icon className={`w-5 h-5 ${config.iconClass || 'text-teal-500'}`} />}
            <h3 className={`
              font-bold text-lg line-clamp-2
              ${colorMode === 'dark' ? 'text-white' : 'text-gray-900'}
            `}>
              {location.title}
            </h3>
          </div>

          <p className={`
            text-sm line-clamp-3 mb-4 flex-grow
            ${colorMode === 'dark' ? 'text-gray-300' : 'text-gray-600'}
          `}>
            {location.description}
          </p>

          <button
            onClick={() => onClick(location.id)}
            className={`
              flex items-center justify-center gap-2
              w-full px-4 py-2 mt-auto
              rounded-lg text-sm font-medium
              transform transition-all duration-200
              ${colorMode === 'dark' 
                ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }
              focus:outline-none focus:ring-2 focus:ring-offset-2
              focus:ring-teal-500
            `}
          >
            <FaEye className="w-4 h-4" />
            Ver Detalles
          </button>
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
    category: PropTypes.string,
    area: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  config: PropTypes.shape({
    spinnerColor: PropTypes.string,
    badgeClass: PropTypes.string,
    iconClass: PropTypes.string,
    icon: PropTypes.elementType,
    category: PropTypes.string,
  }).isRequired,
};

export default React.memo(LocationCard);
