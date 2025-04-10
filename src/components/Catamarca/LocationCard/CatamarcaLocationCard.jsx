import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useColorMode } from "@chakra-ui/react";
import { getAreaTheme, getIconByArea } from "../../Catamarca";
import { ANIMATION_PRESETS } from "../../Catamarca/animations";

const CatamarcaLocationCard = ({ location, onShowDetails }) => {
  const { colorMode } = useColorMode();
  const { gradient, color } = getAreaTheme(location.area);
  const AreaIcon = getIconByArea(location.area);

  return (
    <motion.article
      variants={ANIMATION_PRESETS.cardVariants}
      whileHover="hover"
      whileTap="tap"
      onClick={() => onShowDetails(location.id)}
      className="group cursor-pointer relative h-[400px] rounded-xl overflow-hidden"
    >
      <div className="absolute inset-0">
        <motion.img
          src={location.imgSrc}
          alt={location.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className={`
        absolute top-4 right-4 px-4 py-2 
        rounded-full backdrop-blur-sm
        flex items-center gap-2 shadow-lg
        text-white text-sm font-medium
        bg-gradient-to-r ${gradient}
        transform transition-all duration-300
        group-hover:scale-105
      `}>
        <AreaIcon className="w-4 h-4" />
        <span>{location.area}</span>
      </div>

      <motion.div 
        className="absolute inset-x-0 bottom-0 p-6"
        initial={{ opacity: 0, y: 20 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-2xl font-bold text-white mb-2">
          {location.title}
        </h3>
        <p className="text-gray-200 line-clamp-2">
          {location.description}
        </p>
      </motion.div>
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
