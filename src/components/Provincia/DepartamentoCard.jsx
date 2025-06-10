import { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const DepartamentoCard = memo(({ loc }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-shadow duration-300 hover:shadow-lg dark:hover:shadow-blue-900/20"
    >
      <Link
        to={loc.path}
        className="block focus:outline-none focus-visible:ring-2 ring-offset-2 ring-blue-400"
      >
        <div className="relative h-52 sm:h-64 overflow-hidden">
          <motion.img
            src={loc.image}
            alt={loc.name}
            className="object-cover w-full h-full transition-transform duration-500"
            animate={{ scale: hovered ? 1.05 : 1 }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-gray-800/60 via-gray-800/30 to-transparent dark:from-gray-900/70 dark:via-gray-900/40" />

          <div className="absolute top-3 left-3">
            <span className="text-xs px-3 py-1 rounded-full font-medium bg-blue-100 text-blue-800 dark:bg-blue-700/60 dark:text-white">
              {loc.description}
            </span>
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">
            {loc.name}
          </h3>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Explorá más sobre este lugar.
            </p>
          </motion.div>
        </div>
      </Link>
    </motion.article>
  );
});

DepartamentoCard.displayName = 'DepartamentoCard';

DepartamentoCard.propTypes = {
  loc: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default DepartamentoCard;
