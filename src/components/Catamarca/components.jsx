import React, { memo } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { getAreaTheme, getIconByArea, ANIMATIONS } from "./config";

// Componente de Tarjeta para mostrar cada ubicación
const LocationCard = ({ location, onShowDetails }) => {
  const { gradient } = getAreaTheme(location.area);
  const AreaIcon = getIconByArea(location.area);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      onShowDetails(location.id);
    }
  };

  return (
    <motion.article
      variants={ANIMATIONS.card}
      whileHover="hover"
      whileTap="tap"
      onClick={() => onShowDetails(location.id)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      className="group relative h-[400px] cursor-pointer rounded-xl overflow-hidden"
    >
      <div className="absolute inset-0">
        <motion.img
          src={location.imgSrc}
          alt={location.title}
          className="object-cover w-full h-full"
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

      <div
        className={`absolute top-4 right-4 flex items-center gap-2 rounded-full bg-gradient-to-r ${gradient} px-4 py-2 text-sm font-medium shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-105 text-white`}
      >
        <AreaIcon className="w-4 h-4" />
        <span>{location.area}</span>
      </div>

      <motion.div
        className="absolute inset-x-0 bottom-0 p-6"
        initial={{ opacity: 0, y: 20 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="mb-2 text-2xl font-bold text-white">{location.title}</h3>
        <p className="line-clamp-2 text-gray-200">{location.description}</p>
      </motion.div>
    </motion.article>
  );
};

LocationCard.propTypes = {
  location: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    imgSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string,
    area: PropTypes.string.isRequired,
  }).isRequired,
  onShowDetails: PropTypes.func.isRequired,
};

LocationCard.displayName = "LocationCard";

// Componente para el filtro de áreas
const AreaFilter = ({ area, isSelected, onClick }) => {
  const { colorMode } = useTheme();
  const { icon: Icon } = getAreaTheme(area);

  const baseClasses =
    "inline-flex items-center gap-2 rounded-full px-6 py-2 font-medium shadow-md backdrop-blur-sm transition-all duration-300 border border-transparent hover:border-yellow-500/30";

  const selectedClasses =
    "bg-gradient-to-r from-yellow-400 via-green-400 to-yellow-400 text-white shadow-yellow-500/30";

  const unselectedClasses =
    colorMode === "dark"
      ? "bg-gray-800/50 text-gray-200 hover:bg-gray-700/70"
      : "bg-white/50 text-gray-700 hover:bg-gray-50/80";

  return (
    <motion.button
      variants={ANIMATIONS.filter}
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      className={`${baseClasses} ${
        isSelected ? selectedClasses : unselectedClasses
      }`}
    >
      <Icon className={`w-4 h-4 ${isSelected ? "scale-110" : "scale-100"}`} />
      <span>{area}</span>
    </motion.button>
  );
};

AreaFilter.propTypes = {
  area: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

AreaFilter.displayName = "AreaFilter";

export { LocationCard, AreaFilter };
