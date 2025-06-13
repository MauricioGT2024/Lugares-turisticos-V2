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
      whileHover={{ scale: 1.02, y: -6 }}
      whileTap={{ scale: 0.98 }}
      className="group cursor-pointer overflow-hidden rounded-2xl shadow-md transition-all duration-300 dark:bg-gray-800 bg-white"
    >
      {/* Image Section */}
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={location.imgSrc}
          alt={location.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {location.category && (
          <span className="absolute top-3 left-3 text-yellow-800 bg-yellow-300 dark:bg-yellow-600 dark:text-yellow-50  text-xs font-medium px-3 py-1 rounded-full backdrop-blur-md shadow-sm">
            {location.category}
          </span>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white line-clamp-1">
          {location.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {location.description}
        </p>
        <button
          type="button"
          className="mt-2 inline-block text-sm font-semibold rounded-full p-2 hover:underline text-yellow-900 dark:text-yellow-600 dark:hover:text-yellow-500"
          aria-label={`Ver más sobre ${location.name}`}
        >
          Ver más
        </button>
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
