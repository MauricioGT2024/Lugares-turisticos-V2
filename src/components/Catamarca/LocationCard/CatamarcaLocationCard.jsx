import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useColorMode } from "@chakra-ui/react";
import { getAreaTheme, getIconByArea } from "../";

const CatamarcaLocationCard = ({ location, onShowDetails }) => {
  const { colorMode } = useColorMode();
  const { gradient, color } = getAreaTheme(location.area);
  const AreaIcon = getIconByArea(location.area);

  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ duration: 0.2 }}
      onClick={() => onShowDetails(location.id)}
      className="group cursor-pointer"
    >
      <div className={`
        h-full rounded-2xl overflow-hidden shadow-lg hover:shadow-xl 
        transition-shadow duration-300 
        ${colorMode === 'dark' ? 'bg-gray-800' : 'bg-white'}
      `}>
        <div className="relative h-64">
          <img
            src={location.imgSrc}
            alt={location.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className={`
            absolute top-4 right-4 px-3 py-1.5 rounded-full
            flex items-center gap-2 text-white text-sm font-medium
            bg-gradient-to-r ${gradient}
          `}>
            <AreaIcon className="w-4 h-4" />
            <span>{location.area}</span>
          </div>
        </div>

        <div className="p-6 space-y-3">
          <h3 className={`
            text-xl font-bold transition-colors duration-200
            ${colorMode === 'dark' ? 'text-white' : 'text-gray-900'}
            group-hover:text-${color}-500
          `}>
            {location.title}
          </h3>
          <p className={`
            line-clamp-3
            ${colorMode === 'dark' ? 'text-gray-300' : 'text-gray-600'}
          `}>
            {location.description}
          </p>
        </div>
      </div>
    </motion.article>
  );
};

CatamarcaLocationCard.propTypes = {
  location: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    imgSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    mapSrc: PropTypes.string.isRequired,
    path: PropTypes.string,
    wiki: PropTypes.string,
    area: PropTypes.string.isRequired,
  }).isRequired,
  onShowDetails: PropTypes.func.isRequired,
};

export default React.memo(CatamarcaLocationCard);
