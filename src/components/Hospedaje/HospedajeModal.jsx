import React from "react";
import PropTypes from "prop-types";
import * as Dialog from '@radix-ui/react-dialog';
import { FaMapMarkerAlt, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from "framer-motion";

const modalVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

const HospedajeModal = ({ isOpen, onClose, hospedaje }) => {
  if (!hospedaje) return null;

  const { title, description, image, location, mapUrl, iframe, precioARS } = hospedaje;

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm data-[state=open]:animate-overlayShow" />
          <Dialog.Content asChild>
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={modalVariants}
              // Centering with inset-0 and m-auto
              className="fixed inset-0 m-auto max-h-[85vh] w-[90vw] max-w-xl z-50 rounded-2xl shadow-2xl focus:outline-none overflow-hidden bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              {/* Header: Image with Title and Location */}
              <div className="relative h-48 overflow-hidden flex-shrink-0">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white z-10">
                  {/* Wrap title with Dialog.Title for accessibility */}
                  <Dialog.Title asChild>
                    <h2 className="text-xl font-bold drop-shadow-md">
                      {title}
                    </h2>
                  </Dialog.Title>
                  <Dialog.Description asChild>
                    <p className="text-sm mt-1 flex items-center gap-1 drop-shadow-md">
                      <FaMapMarkerAlt className="w-3 h-3" /> {location}
                    </p>
                  </Dialog.Description>
                </div>
                {/* Close Button */}
                <Dialog.Close asChild>
                  <button
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 text-white hover:bg-white/20 focus:outline-none transition-colors"
                    aria-label="Cerrar"
                  >
                    <FaTimes size={18} />
                  </button>
                </Dialog.Close>
              </div>

              {/* Body: Description and Price */}
              <div className="p-6 overflow-y-auto flex-grow">
                <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">
                  Descripción
                </h3>
                <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300 mb-4">
                  {description}
                </p>

                {precioARS && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">
                      Precio Estimado
                    </h3>
                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {precioARS}
                    </span>
                  </div>
                )}

                {/* Iframe if available - Following the pattern */}
                {(iframe || mapUrl) && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">
                      Ubicación
                    </h3>
                    <div className="h-[200px] rounded-lg overflow-hidden shadow-md border border-gray-200 dark:border-gray-700">
                      <iframe
                        title="Ubicación"
                        src={iframe || mapUrl}
                        className="w-full h-full border-0"
                        loading="lazy"
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Footer: Map Link */}
              <footer className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex justify-center">
                {mapUrl && (
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Ver en mapa"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transition-colors text-sm font-medium"
                  >
                    <FaMapMarkerAlt className="w-4 h-4" /> Ver en Mapa
                  </a>
                )}
                {/* No separate info/wiki button shown in data, keeping it simple */}
              </footer>
            </motion.div>
          </Dialog.Content>
        </Dialog.Root>
      )}{" "}
      {/* Close AnimatePresence conditional rendering */}
    </AnimatePresence>
  );
};

HospedajeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  hospedaje: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    mapUrl: PropTypes.string,
    iframe: PropTypes.string,
    precioARS: PropTypes.string,
  }), // hospedaje can be null initially, so not .isRequired at shape level
};
export default HospedajeModal;
