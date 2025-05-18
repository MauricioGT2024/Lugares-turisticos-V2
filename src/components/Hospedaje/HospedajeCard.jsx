import { motion } from "framer-motion";
import PropTypes from "prop-types";
import React from 'react';

// HospedajeCard component accepts onClick prop
const HospedajeCard = ({ hospedaje, onClick }) => {
  const { title, description, image, alt } = hospedaje;

  return (
    // Wrap the card content with a button or div that has the onClick handler
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="rounded-xl overflow-hidden shadow-lg dark:shadow-black/20 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 transition-colors cursor-pointer"
      onClick={onClick} // Added onClick handler here
      role="button" // Indicate it's clickable
      tabIndex={0} // Make it focusable
      onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }} // Handle keyboard interaction
    >
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={image}
          alt={alt}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      <div className="p-4 flex flex-col h-full gap-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            {description}
          </p>
        </div>


        {/* Keeping the map link inside the card as well, but note that clicking the card also opens the modal */}
        {/* You might want to rethink the interaction: either click card opens modal OR click map link opens map/modal */}
       
      </div>
    </motion.div>
  );
};

HospedajeCard.propTypes = {
  hospedaje: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    mapUrl: PropTypes.string,
    iframe: PropTypes.string,
    precioARS: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func, // onClick prop added, optional if not always clickable
};

export default React.memo(HospedajeCard);
