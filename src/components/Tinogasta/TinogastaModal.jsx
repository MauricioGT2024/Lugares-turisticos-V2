import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import PropTypes from "prop-types"; // Import PropTypes
import { FaXmark } from "react-icons/fa6";

const TinogastaModal = ({ isOpen, onClose, location }) => {
  // Basic check for location prop existence
  if (!location) return null;

  // Destructure location for easier access
  const { imgSrc, name, description, iframe, mapUrl, wiki } = location;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div className="fixed inset-0 bg-black/70" aria-hidden="true" />

      {/* Modal content with Framer Motion animations */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }} // Add a transition duration
        className={`relative max-w-4xl w-full bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
          aria-label="Close modal" // Accessibility improvement
        >
          <FaXmark className="w-6 h-6" />
        </button>

        {/* Main content layout */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Location image */}
          <img
            src={imgSrc}
            alt={name}
            className="w-full h-64 md:h-full object-cover object-center" // Added object-center for better image fitting
          />
          {/* Location details and links */}
          <div className="p-6 space-y-4">
            <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {name}
            </h2>
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
              {description}
            </p>{" "}
            {/* Added leading-relaxed for better readability */}
            {/* Embedded iframe */}
            <div className="aspect-video rounded-md overflow-hidden mt-4">
              <iframe
                src={iframe}
                title={`Map or video of ${name}`} // Added title for accessibility
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-presentation" // Enhanced security with sandbox
              />
            </div>
            <div className="flex justify-between pt-4 text-sm">
              {/* Google Maps link */}
              <a
                href={location.wiki}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Más información
              </a>
              {/* More info link */}
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Ver en Google Maps
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </Dialog>
  );
};

TinogastaModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  location: PropTypes.shape({
    imgSrc: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    iframe: PropTypes.string,
    mapUrl: PropTypes.string,
    wiki: PropTypes.string,
  }),
};
export default TinogastaModal;
