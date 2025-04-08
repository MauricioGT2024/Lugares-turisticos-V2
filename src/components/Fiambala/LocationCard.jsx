import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useColorMode } from "@chakra-ui/react";
import { CATEGORY_CONFIG } from "./CategoryConfig";

const LocationCard = ({ location, onShowDetails }) => {
  const { colorMode } = useColorMode();
  const config = CATEGORY_CONFIG[location.category] || {};
  const Icon = config.icon;
  
  return (
    <motion.article
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group cursor-pointer"
      onClick={() => onShowDetails(location.id)}
    >
      <div className={`
        relative overflow-hidden rounded-2xl shadow-lg
        transition-all duration-300 ease-in-out
        ${colorMode === 'dark' ? 'bg-gray-800' : 'bg-white'}
        group-hover:shadow-2xl
      `}>
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={location.imgSrc}
            alt={location.title}
            className="w-full h-full object-cover transition duration-500 
                     group-hover:scale-110 group-hover:rotate-1"
          />
        </div>

        <div className="absolute top-4 right-4">
          <span className={`
            inline-flex items-center gap-2 px-3 py-1.5 
            rounded-full text-sm font-medium text-white
            backdrop-blur-sm ${config.bgClass} bg-opacity-90
          `}>
            {Icon && <Icon className="w-4 h-4" />}
            {location.category}
          </span>
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
    category: PropTypes.string.isRequired,
  }).isRequired,
  onShowDetails: PropTypes.func.isRequired,
};

export default React.memo(LocationCard);
