import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { FaMapMarkedAlt, FaInfoCircle, FaTimes } from 'react-icons/fa'; // Import icons, including FaTimes
import * as Dialog from '@radix-ui/react-dialog'; // Import Dialog

// Assuming getAreaTheme is still needed for the badge color based on config prop
import { getAreaTheme } from "./areaThemes"; 

const CatamarcaModalContent = ({ location }) => {
  if (!location) return null;

  // Get the theme config for badge color
  const config = getAreaTheme(location.area); // Assuming area is available on location object

  return (
    // The modal container, overlay, and main close button are provided by LocationPage (using Radix Dialog)
    // This component only provides the content INSIDE the modal.
    <div className="flex flex-col h-full relative">
      {" "}
      {/* Added relative positioning for absolute button */}{" "}
      {/* Added relative positioning for absolute button */}
      {/* Close Button */}
      <Dialog.Close asChild>
        <button
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 focus:outline-none transition-colors"
          aria-label="Cerrar modal"
        >
          <FaTimes className="w-5 h-5" />
        </button>
      </Dialog.Close>
      {/* Header: Image with small title */}
      <div className="relative w-full h-[180px] md:h-[220px] overflow-hidden flex-shrink-0">
        <img
          src={location.imgSrc}
          alt={location.title}
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Small Title Overlay - Wrapped with Dialog.Title */}
        <Dialog.Title asChild>
          <h2 className="absolute bottom-4 left-4 text-white text-xl font-bold z-10">
            {location.title}
          </h2>
        </Dialog.Title>
      </div>
      {/* Body: Description (left) and Iframe (right) */}
      <div className="flex flex-col md:flex-row flex-grow overflow-y-auto">
        {/* Description (Left) */}
        <div className="flex-1 p-4 md:p-6  bg-gray-50 dark:bg-gray-950 ">
          <Dialog.Description asChild>
            <div>
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                Descripción
              </h3>
              <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                {location.description}
              </p>
            </div>
          </Dialog.Description>

          {/* Category Badge - Can be here or in header depending on desired look */}
          {location.category && config && (
            <div className="mt-4">
              <span
                className={clsx(
                  config.badgeColor, // Use badgeColor from getAreaTheme config
                  "text-xs font-semibold p-2 rounded-full"
                )}
              >
                {location.category}
              </span>
            </div>
          )}
        </div>

        {/* Iframe (Right) */}
        <div
          className="flex-1 p-4 md:p-6 flex items-start justify-center
                     bg-gray-50 dark:bg-gray-950 flex-shrink-0"
        >
          {(location.mapSrc || location.iframe) && (
            <div className="w-full max-w-sm h-[180px] md:h-[260px] overflow-hidden rounded-lg shadow-md bg-white">
              <iframe
                src={location.mapSrc || location.iframe}
                title={location.title}
                width="100%"
                height="100%"
                loading="lazy"
                style={{
                  border: "0",
                  borderRadius: "8px",
                  minHeight: "180px",
                  background: "white",
                }}
                allowFullScreen // Added allowFullScreen based on snippet
              />
            </div>
          )}
        </div>
      </div>
      {/* Footer: Buttons */}
      <footer
        className="flex gap-3 justify-center p-4 flex-shrink-0
                   bg-white dark:bg-gray-900
                   border-t border-gray-200 dark:border-gray-800"
      >
        {location.mapUrl && (
          <a
            href={location.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver en mapa"
            className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none transition-colors"
          >
            <FaMapMarkedAlt className="w-6 h-6" />
          </a>
        )}
        {location.wiki && (
          <a
            href={location.wiki}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Más información"
            className="p-3 rounded-full bg-green-500 text-white hover:bg-green-600 focus:outline-none transition-colors"
          >
            <FaInfoCircle className="w-6 h-6" />
          </a>
        )}
        {/* Close button handled by LocationPage */}
      </footer>
    </div>
  );
};

CatamarcaModalContent.propTypes = {
  location: PropTypes.shape({
    imgSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string,
    area: PropTypes.string.isRequired, // Assuming area is needed for badge color
    mapSrc: PropTypes.string,
    iframe: PropTypes.string,
    mapUrl: PropTypes.string,
    wiki: PropTypes.string,
  }).isRequired,
};

export default CatamarcaModalContent;
