import PropTypes from "prop-types";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog } from "@headlessui/react";

const Modal = ({ isOpen, onClose, location }) => {
  return (
    <AnimatePresence>
      <Dialog
        open={isOpen && !!location}
        onClose={onClose}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          aria-hidden="true"
        />

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center p-4"
        >
          <Dialog.Panel className="relative w-full max-w-4xl p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <IoClose size={24} />
            </button>

            <div className="space-y-4">
              <Dialog.Title className="text-2xl font-bold text-gray-900 dark:text-white">
                {location?.title}
              </Dialog.Title>

              <p className="text-gray-600 dark:text-gray-300">
                {location?.description}
              </p>

              {location?.iframe && (
                <div className="aspect-video w-full rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <iframe
                    src={location.iframe}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Mapa de ${location?.title}`}
                    className="w-full h-full"
                  />
                </div>
              )}

              <div className="flex justify-between items-center mt-4">
                <span className="text-gray-600 dark:text-gray-300">
                  Ubicación: {location?.location}
                </span>
                <a
                  href={location?.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Ver en Google Maps
                </a>
              </div>
            </div>
          </Dialog.Panel>
        </motion.div>
      </Dialog>
    </AnimatePresence>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  location: PropTypes.shape({
    // location can be null initially
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    mapUrl: PropTypes.string.isRequired,
    iframe: PropTypes.string.isRequired,
  }),
};

export default Modal;
