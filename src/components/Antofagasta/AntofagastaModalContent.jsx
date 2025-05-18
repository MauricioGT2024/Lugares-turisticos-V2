import React from "react";
import PropTypes from "prop-types";
import { FaMapMarkedAlt, FaInfoCircle } from "react-icons/fa";
import * as Dialog from "@radix-ui/react-dialog"; // Import Dialog

const AntofagastaModalContent = ({ location }) => {
  if (!location) return null;

  return (
    <>
      {/* Header Content - Moved from AntofagastaModal */}
      <div className="relative w-full h-[180px] md:h-[220px] overflow-hidden">
        <img
          src={location.imgSrc}
          alt={location.title}
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay - Using Tailwind gradient classes */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/40 to-red-400/40" />

        {/* Modal Header Text - Wrapped with Dialog.Title */}
        <Dialog.Title asChild>
          <h2
            className="absolute bottom-0 left-0 right-0 text-white font-extrabold text-2xl z-10 py-4 px-6
                       bg-gradient-to-r from-orange-400 via-yellow-400 to-red-400 bg-clip-text text-transparent text-shadow-md"
            style={{ WebkitTextStroke: "1px black" }} // Keep webkit stroke for text-shadow effect
          >
            {location.title}
          </h2>
        </Dialog.Title>
      </div>

      {/* Contenido */}
      <div className="flex flex-col md:flex-row gap-0 bg-white dark:bg-gray-900">
        <div className="flex-1 p-4 md:p-8 ">
          <h3 className="text-xl font-bold mb-3 text-orange-600 dark:text-orange-200">
            Descripción
          </h3>
          <p className="text-md leading-relaxed text-gray-700 dark:text-gray-200">
            {location.description}
          </p>
        </div>

        {/* Iframe */}
        <div
          className="flex-1 p-4 md:p-8 flex items-start justify-center
                         bg-gray-50 dark:bg-gray-900"
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
              />
            </div>
          )}
        </div>
      </div>
      {/* Footer */}
      <footer
        className="flex gap-3 justify-end p-4
                   bg-white dark:bg-gray-900
                   border-t border-gray-200 dark:border-gray-800 rounded-b-2xl w-auto h-auto "
      >
        {location.mapUrl && (
          <a
            href={location.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver en mapa"
            className="p-3 rounded-full bg-orange-500 text-white hover:bg-orange-600 focus:outline-none transition-colors"
          >
            <FaMapMarkedAlt className="w-6 h-6" />
          </a>
        )}
        {location.path && (
          <a
            href={location.path}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Más información"
            className="p-3 rounded-full bg-yellow-500 text-white hover:bg-yellow-600 focus:outline-none transition-colors"
          >
            <FaInfoCircle className="w-6 h-6" />
          </a>
        )}
        {/* Close button provided by LocationPage's Dialog.Close */}
      </footer>
    </>
  );
};

AntofagastaModalContent.propTypes = {
  location: PropTypes.shape({
    title: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    mapSrc: PropTypes.string,
    mapUrl: PropTypes.string,
    path: PropTypes.string,
    iframe: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired, // Receive onClose prop from LocationPage
};

export default AntofagastaModalContent;
