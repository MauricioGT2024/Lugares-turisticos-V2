import PropTypes from "prop-types";
import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { FaMapMarkedAlt, FaInfoCircle, FaTimes } from "react-icons/fa";
import { modalVariants } from "./animations"; // Asegurate que esté definido ahí

const AntofagastaModal = ({ isOpen, onClose, location }) => {
  // Remove useColorMode as we are using Tailwind dark classes
  // const { colorMode } = useColorMode();
  // const isDark = colorMode === 'dark';

  if (!location) return null;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm data-[state=open]:animate-overlayShow" />
      <Dialog.Content asChild>
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={modalVariants}
          // Using inset-0 and m-auto for centering with Tailwind
          className="fixed inset-0 m-auto max-h-[85vh] w-[90vw] max-w-2xl z-50 rounded-2xl shadow-2xl focus:outline-none overflow-hidden p-0
                     bg-white text-gray-900 dark:bg-gray-900 dark:text-white"
        >
          {/* Imagen de cabecera */}
          <div className="relative w-full h-[180px] md:h-[220px] overflow-hidden">
            <motion.img
              src={location.imgSrc}
              alt={location.title}
              className="w-full h-full object-cover"
              initial={{ scale: 1.08, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            />
            {/* Gradient Overlay - Using Tailwind gradient classes */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/40 to-red-400/40" />

            {/* Modal Header Content */}
            <h2
              className="absolute bottom-0 left-0 right-0 text-white font-extrabold text-2xl z-10 py-4 px-6
                         bg-gradient-to-r from-orange-400 via-yellow-400 to-red-400 bg-clip-text text-transparent text-shadow-md"
              style={{ WebkitTextStroke: "1px black" }} // Keep webkit stroke for text-shadow effect
            >
              {location.title}
            </h2>

            {/* Close Button */}
            <Dialog.Close asChild>
              <button
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 focus:outline-none transition-colors"
                aria-label="Cerrar"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </Dialog.Close>
          </div>

          {/* Contenido */}
          <div className="flex flex-col md:flex-row gap-0">
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
                         bg-gray-50 dark:bg-gray-950"
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
                       border-t border-gray-200 dark:border-gray-800 rounded-b-2xl"
          >
            {location.mapUrl && (
              <a
                href={location.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ver en mapa"
                className="p-3 w- rounded-full bg-orange-500 text-white hover:bg-orange-600 focus:outline-none transition-colors"
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
            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="p-3 rounded-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white focus:outline-none transition-colors"
            >
              <FaTimes className="w-6 h-6" />
            </button>
          </footer>
        </motion.div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

AntofagastaModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  location: PropTypes.shape({
    title: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    mapSrc: PropTypes.string,
    mapUrl: PropTypes.string,
    path: PropTypes.string,
    iframe: PropTypes.string,
  }).isRequired,
};

export default AntofagastaModal;
