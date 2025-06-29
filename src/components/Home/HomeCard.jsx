import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const HomeCard = ({ image, title, description, onClick }) => {
  return (
    <motion.article
      whileHover={{ y: -8, rotate: 0.5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="cursor-pointer overflow-hidden rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out bg-gradient-to-br from-teal-500 to-blue-600 dark:from-gray-700 dark:to-gray-900 text-white"
    >
      <div className="relative h-48 md:h-56 w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80 hover:opacity-60 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-xl md:text-2xl font-bold text-white drop-shadow-lg">
            {title}
          </h3>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-4 md:p-5">
        <p className="text-white text-opacity-90 dark:text-gray-300 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </motion.article>
  );
};

HomeCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default HomeCard;
