import React from 'react';
import PropTypes from 'prop-types';
import { useColorMode } from '@chakra-ui/react';

const LocationCard = ({ location, onShowDetails }) => {
  const { colorMode } = useColorMode();

  return (
    <article 
      onClick={() => onShowDetails(location)}
      className={`
        cursor-pointer rounded-xl overflow-hidden
        ${colorMode === 'dark' ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'}
        border shadow-xl relative transition-all duration-200 hover:scale-[1.02]
      `}
    >
      <div className="relative h-60">
        <img
          src={location.imgSrc}
          alt={location.name}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
        <span className={`
          absolute top-4 right-4 px-3 py-1 rounded-full
          bg-purple-500 text-white text-sm font-medium
          shadow-md backdrop-blur-sm
        `}>
          {location.category}
        </span>
      </div>

      <div className="p-6">
        <h2 className={`
          text-lg font-bold mb-2
          bg-gradient-to-r from-purple-400 to-red-400 bg-clip-text text-transparent
        `}>
          {location.name}
        </h2>
        <p className={`
          ${colorMode === 'dark' ? 'text-gray-300' : 'text-gray-600'}
        `}>
          {location.description}
        </p>
      </div>
    </article>
  );
};

LocationCard.propTypes = {
  location: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    wiki: PropTypes.string,
    iframe: PropTypes.string,
    mapUrl: PropTypes.string,
  }).isRequired,
  onShowDetails: PropTypes.func.isRequired,
};

export default React.memo(LocationCard);
