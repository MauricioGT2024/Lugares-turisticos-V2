import React from "react";
import PropTypes from "prop-types";
import { FaMapMarkedAlt, FaInfoCircle, FaTimes, FaBook } from 'react-icons/fa'; // Import FaBook for wiki icon option
import * as Dialog from '@radix-ui/react-dialog';

// Assuming getTinogastaTheme might be needed for badge colors
// import { getTinogastaTheme } from './tinogastaThemes';

const TinogastaModalContent = ({ location,  }) => {
  if (!location) return null;

  const { name, description, imgSrc, iframe, path, mapUrl, category, wiki } = location; // Added wiki to destructuring

  // Placeholder for category badge class if needed and not using a config file
  const getTinogastaCategoryBadgeClass = (cat) => {
    switch (cat) {
      case 'Termas': return 'bg-purple-600';
      case 'Dunas': return 'bg-pink-600';
      case 'Museo': return 'bg-teal-600';
      case 'Mirador': return 'bg-indigo-600';
      case 'Iglesia': return 'bg-red-600'; // Added example
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="flex flex-col h-full rounded-2xl overflow-hidden bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Header: Image with title and category */}
      <div className="relative h-[200px] overflow-hidden flex-shrink-0">
        <img
          src={imgSrc}
          alt={`Imagen de ${name}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-4 left-6 text-white z-10">
          {category && (
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-1 ${getTinogastaCategoryBadgeClass(
                category
              )}`}
            >
              {category}
            </span>
          )}
          {/* Wrap title with Dialog.Title */}
          <Dialog.Title asChild>
            <h2 className="text-2xl font-bold font-['JetBrains_Mono']">
              {name}
            </h2>
          </Dialog.Title>
        </div>
        {/* Close button in header */}
        <Dialog.Close asChild>
          <button
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 text-white hover:bg-white/20 focus:outline-none transition-colors"
            aria-label="Cerrar"
          >
            <FaTimes size={18} />
          </button>
        </Dialog.Close>
      </div>

      {/* Body: Description and Location/Iframe */}
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 overflow-y-auto flex-grow">
        {/* Description */}
        <Dialog.Description>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-600 dark:text-gray-400">
              Descripción
            </h3>
            <p className="leading-relaxed text-base text-gray-900 dark:text-white">
              {description}
            </p>
          </div>
        </Dialog.Description>
        {/* Location/Iframe */}
        {(iframe || mapUrl) && (
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-600 dark:text-gray-400">
              Ubicación
            </h3>
            <div className="h-[300px] rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
              <iframe
                title={name}
                src={iframe || mapUrl}
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="px-8 py-6 flex justify-center items-center border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="flex gap-3">
          {mapUrl && (
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ver en mapa"
              className="p-3 rounded-full bg-orange-500 text-white hover:bg-orange-600 focus:outline-none transition-colors"
            >
              <FaMapMarkedAlt className="w-6 h-6" />
            </a>
          )}
          {path && (
            <a
              href={path}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Más información"
              className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none transition-colors"
            >
              <FaInfoCircle className="w-6 h-6" />
            </a>
          )}
          {wiki && ( // Added Wiki button check
            <a
              href={wiki}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ver en Wikipedia"
              className="p-3 rounded-full bg-purple-600 text-white hover:bg-purple-700 focus:outline-none transition-colors"
            >
              {" "}
              {/* Styled as a purple icon button */}
              <FaBook className="w-6 h-6" /> {/* Using FaBook for wiki */}
            </a>
          )}
        </div>
      </footer>
    </div>
  );
};

TinogastaModalContent.propTypes = {
  location: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    iframe: PropTypes.string,
    path: PropTypes.string,
    mapUrl: PropTypes.string,
    category: PropTypes.string,
    wiki: PropTypes.string, // Added wiki to propTypes
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TinogastaModalContent;
