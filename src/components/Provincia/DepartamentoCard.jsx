import { memo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const DepartamentoCard = memo(function DepartamentoCard({ loc }) {
  return (
    <article
      whileHover={{ y: -4, scale: 1.01 }}
      className="group rounded-xl overflow-hidden border bg-white dark:bg-gray-800 dark:border-gray-800 transition-all duration-300 shadow hover:shadow-md"
    >
      <Link
        to={loc.path}
        className="block focus:outline-none focus-visible:ring-2 ring-offset-2 ring-blue-400 rounded-xl"
      >
        <div className="relative h-48 sm:h-56 overflow-hidden">
          <img
            src={loc.image}
            alt={loc.name}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <span className="absolute top-3 left-3 text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-700/60 dark:text-white">
            {loc.description}
          </span>
        </div>
        <div className="p-3">
          <h3 className="text-base font-medium text-gray-900 dark:text-white truncate">
            {loc.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Explorá más sobre este lugar.
          </p>
        </div>
      </Link>
    </article>
  );
});

DepartamentoCard.propTypes = {
  loc: PropTypes.shape({
    // Added id as per shape
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default DepartamentoCard;
