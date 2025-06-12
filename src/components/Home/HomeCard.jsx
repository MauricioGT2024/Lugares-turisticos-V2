import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const HomeCard = ({ image, title, description, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="cursor-pointer overflow-hidden rounded-2xl shadow-xl bg-white dark:bg-gray-800 transition-all group"
    >
      {/* Imagen */}
      <div className="relative h-52 md:h-64 w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-300" />
      </div>

      {/* Contenido */}
      <div className="p-5">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

HomeCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default HomeCard;
