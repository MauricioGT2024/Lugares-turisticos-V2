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
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={() => onShowDetails(location.id)}
      className="group cursor-pointer"
    >
      <div className={`
        relative h-full rounded-2xl overflow-hidden 
        ${colorMode === 'dark' ? 'bg-gray-800' : 'bg-white'}
        shadow-lg hover:shadow-2xl transition-all duration-300
      `}>
        <div className="relative h-64 overflow-hidden">
          <img
            src={location.imgSrc}
            alt={location.title}
            className="w-full h-full object-cover transform transition-all duration-500
                     group-hover:scale-110 group-hover:rotate-2"
          />
          <div className={`
            absolute top-4 right-4 px-4 py-2 
            rounded-full backdrop-blur-sm
            flex items-center gap-2 shadow-lg
            text-white text-sm font-medium
            bg-gradient-to-r ${gradient}
          `}>
            <AreaIcon className="w-4 h-4" />
            <span>{location.area}</span>
          </div>
        </div>

        <div className="p-6 space-y-3">
          <h3 className={`
            text-xl font-bold
            ${colorMode === 'dark' ? 'text-white' : 'text-gray-900'}
            group-hover:text-${color}-500 transition-colors duration-300
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
