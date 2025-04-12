import { memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useColorMode } from '@chakra-ui/react';
import { getAreaTheme, getIconByArea } from './config';
import { ANIMATIONS } from './config';

export const LocationCard = memo(({ location, onShowDetails }) => {
  const { gradient } = getAreaTheme(location.area);
  const AreaIcon = getIconByArea(location.area);

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: {
      y: -8,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const overlayVariants = {
    initial: { opacity: 0 },
    hover: {
      opacity: 0.7,
      transition: {
        duration: 0.3
      }
    }
  };

  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    hover: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.article
      initial="initial"
      animate="animate"
      whileHover="hover"
      variants={cardVariants}
      onClick={() => onShowDetails(location.id)}
      className="relative h-[400px] rounded-xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-xl transition-shadow"
    >
      {/* Contenedor de imagen y overlay */}
      <div className="absolute inset-0">
        <motion.img
          src={location.imgSrc}
          alt={location.title}
          variants={imageVariants}
          className="w-full h-full object-cover"
        />
        <motion.div 
          variants={overlayVariants}
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
        />
      </div>

      {/* Badge */}
      <motion.div 
        className={`
          absolute top-4 right-4 px-4 py-2 
          rounded-full backdrop-blur-md
          flex items-center gap-2 shadow-lg
          text-white text-sm font-medium
          bg-gradient-to-r ${gradient}
          transform transition-transform duration-300
        `}
        whileHover={{ scale: 1.05 }}
      >
        <AreaIcon className="w-4 h-4" />
        <span>{location.area}</span>
      </motion.div>

      {/* Contenido */}
      <motion.div 
        variants={contentVariants}
        className="absolute inset-x-0 bottom-0 p-6 space-y-2"
      >
        <h3 className="text-2xl font-bold text-white">
          {location.title}
        </h3>
        <p className="text-gray-200 line-clamp-2">
          {location.description}
        </p>
      </motion.div>
    </motion.article>
  );
});

export const AreaFilter = memo(({ area, isSelected, onClick }) => {
  const { colorMode } = useColorMode();
  const { icon: Icon } = getAreaTheme(area);

  return (
    <motion.button
      variants={ANIMATIONS.filter}
      whileHover="hover" 
      whileTap="tap"
      onClick={onClick}
      className={`
        inline-flex items-center gap-2 px-6 py-2
        rounded-full font-medium shadow-md
        transition-all duration-300
        backdrop-blur-sm
        ${isSelected 
          ? 'bg-gradient-to-r from-yellow-400 via-green-400 to-yellow-400 text-white shadow-yellow-500/30'
          : colorMode === 'dark'
            ? 'bg-gray-800/50 text-gray-200 hover:bg-gray-700/70'
            : 'bg-white/50 text-gray-700 hover:bg-gray-50/80'
        }
        border border-transparent hover:border-yellow-500/30
      `}
    >
      <Icon className={`w-4 h-4 ${isSelected ? 'scale-110' : 'scale-100'}`} />
      <span>{area}</span>
    </motion.button>
  );
});

LocationCard.displayName = 'LocationCard';
AreaFilter.displayName = 'AreaFilter';

// PropTypes...


LocationCard.propTypes = {
  location: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    imgSrc: PropTypes.string.isRequired,
    title: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string.isRequired,
    area: PropTypes.string,
  }).isRequired,
  onShowDetails: PropTypes.func.isRequired,
};
AreaFilter.propTypes = {
  area: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};