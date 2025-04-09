import React from "react";
import PropTypes from "prop-types";
import { useColorMode } from "@chakra-ui/react";
import { CATEGORY_CONFIG } from "./CategoryConfig";

const LocationCard = ({ location, onShowDetails }) => {
  const config = CATEGORY_CONFIG[location.category] || {};
  const { colorMode } = useColorMode();

  return (
    <article
      onClick={() => onShowDetails(location)}
      className={`
        group relative overflow-hidden rounded-2xl cursor-pointer
        ${colorMode === 'dark' ? 'bg-gray-800/90' : 'bg-white/90'}
        backdrop-blur-sm border border-transparent
        hover:border-current/10 shadow-xl
        transition-all duration-500 ease-out
        hover:shadow-2xl hover:-translate-y-1
      `}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={location.imgSrc}
          alt={location.title}
          className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <span className={`
          absolute top-4 right-4 px-4 py-1.5 rounded-full
          ${config.bgClass} text-white text-sm font-medium
          shadow-lg backdrop-blur-md
          transition-transform duration-300 group-hover:scale-105
        `}>
          {location.category}
        </span>
      </div>

      <div className="p-6">
        <h3 className={`
          text-xl font-bold mb-3
          ${config.textClass}
          transition-colors duration-300
        `}>
          {location.title}
        </h3>
        <p className={`
          text-sm line-clamp-3
          ${colorMode === 'dark' ? 'text-gray-300' : 'text-gray-600'}
          transform transition-all duration-300
          group-hover:text-opacity-90
        `}>
          {location.description}
        </p>
      </div>
    </article>
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
