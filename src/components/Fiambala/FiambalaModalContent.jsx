import React from "react";
import PropTypes from "prop-types";
import { FaInfoCircle, FaTimes } from 'react-icons/fa';
// No need to import Dialog.Close here, it will be handled by LocationPage's Dialog structure

// Assuming CATEGORY_CONFIG is still needed for category badge colors
import { CATEGORY_CONFIG } from './config';
import * as Dialog from "@radix-ui/react-dialog";

const FiambalaModalContent = ({ location }) => {
  if (!location) return null;

  const { title, description, imgSrc, mapSrc, category, path } = location;

  return (
    // The modal container, overlay, and the main top-right close button are handled by LocationPage.
    // This component provides the content inside the Radix Dialog.Content.
    <div className="flex flex-col h-full rounded-2xl overflow-hidden bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Header: Image with title and category */}
      <div className="relative h-[200px] overflow-hidden flex-shrink-0">
        <img
          src={imgSrc}
          alt={`Imagen de ${title}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-4 left-6 text-white z-10">
          {category && (
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-1 ${
                CATEGORY_CONFIG[category]?.bgClass || "bg-amber-500" // Use config for badge class
              }`}
            >
              {category}
            </span>
          )}
          {/* Wrap title with Dialog.Title */}
          <Dialog.Title asChild>
            <h2 className="text-2xl font-bold font-['JetBrains_Mono']">
              {title}
            </h2>
          </Dialog.Title>
        </div>
        {/* Close button in header - Handled by LocationPage using Dialog.Close */}
        {/* Removed the duplicate Dialog.Close button that was accidentally placed in the iframe div */}
      </div>

      {/* Body: Description and Location/Iframe */}
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 overflow-y-auto flex-grow">
        {/* Description Section */}
        <div> {/* Wrapped description content in a div */}
          <h3
            className="text-lg font-semibold mb-2 text-gray-600 dark:text-gray-400" // Use Tailwind dark classes
          >
            Descripción
          </h3>
          {/* Ensuring description is within a P tag and not embedding block elements */}
          <p
            className="leading-relaxed text-base text-gray-900 dark:text-white" // Use Tailwind dark classes
          >
            {description}
          </p>
        </div>
        {/* Location/Iframe Section */}
        <div> {/* Wrapped location/iframe content in a div */}
          <h3
            className="text-lg font-semibold mb-2 text-gray-600 dark:text-gray-400" // Use Tailwind dark classes
          >
            Ubicación
          </h3>
          {mapSrc && (
            <div className="h-[300px] rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
              {" "}
              {/* Use Tailwind dark classes */}
              <iframe
                title={title}
                src={mapSrc}
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
              />
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer
        className="px-8 py-6 flex justify-between items-center border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900" // Use Tailwind dark classes
      >
        <div
          className="flex items-center text-sm gap-2 text-gray-600 dark:text-gray-400" // Use Tailwind dark classes
        >
          <FaInfoCircle />
          <span>Información actualizada</span>
        </div>
        <div className="space-x-3">
          {path && (
            <a
              href={path}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-2 text-sm font-medium rounded-lg border border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white transition"
            >
              <FaInfoCircle className="mr-2" />
              Más Información
            </a>
          )}
        </div>
      </footer>
    </div>
  );
};

FiambalaModalContent.propTypes = {
  location: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    imgSrc: PropTypes.string,
    mapSrc: PropTypes.string,
    category: PropTypes.string,
    path: PropTypes.string,
    // Add other potential fields from Fiambala data if used
  }).isRequired,
  onClose: PropTypes.func.isRequired, // Receive onClose prop if a close button is needed inside content
};

export default FiambalaModalContent;
