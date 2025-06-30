import PropTypes from "prop-types";
import { motion } from "framer-motion";

/**
 * @typedef {object} Location
 * @property {number} id
 * @property {string} name
 * @property {string} description
 * @property {string} imgSrc
 * @property {string} [category]
 */

/**
 * Card component to display a tourist location.
 * @param {object} props - Component props.
 * @param {Location} props.location - The location data.
 * @param {() => void} props.onClick - Function to call when the card is clicked.
 * @returns {JSX.Element | null} The card component or null if location is not provided.
 */
const TinogastaCard = ({ location, onClick }) =>
  location ? (
    <motion.article
      onClick={onClick}
      whileHover={{ y: -6, boxShadow: "0 15px 20px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.04)" }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="group cursor-pointer relative overflow-hidden rounded-2xl shadow-md transition-all duration-200 
                 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
    >
      {/* Image Section */}
      <div className="relative w-full h-48 overflow-hidden rounded-t-2xl">
        <img
          src={location.imgSrc}
          alt={location.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {location.category && (
          <span className="absolute top-3 left-3 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide 
                           bg-gradient-to-r from-amber-400 to-yellow-500 text-yellow-900 
                           dark:from-yellow-600 dark:to-orange-700 dark:text-white 
                           shadow-sm backdrop-blur-sm">
            {location.category}
          </span>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">
          {location.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
          {location.description}
        </p>
        <motion.button
          type="button"
          onClick={onClick}
          whileHover={{ x: 3 }}
          className="mt-2 inline-flex items-center text-sm font-semibold text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 transition-colors duration-200"
          aria-label={`Ver más sobre ${location.name}`}
        >
          <span>Ver más</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>
    </motion.article>
  ) : null;

// PropTypes for type checking and documentation
TinogastaCard.propTypes = {
  /**
   * The location data to display.
   */
  location: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    category: PropTypes.string,
  }).isRequired,
  /**
   * Function to call when the card is clicked.
   */
  onClick: PropTypes.func.isRequired,
};

// Set a display name for the component
TinogastaCard.displayName = "TinogastaCard";

export default TinogastaCard;
