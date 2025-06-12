import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const FiambalaCard = ({
  image: imgSrc,
  title,
  description,
  category,
  onClick,
}) => {
  return (
    <motion.article
      onClick={onClick}
      whileHover={{ scale: 1.03, y: -10 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative h-[450px] cursor-pointer rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        <img
          src={imgSrc}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent dark:from-black/90 dark:via-black/60" />
      </div>

      {/* Contenido */}
      <div className="absolute bottom-0 p-6 w-full">
        {category && (
          <span
            className="inline-block px-3 py-1 rounded-full 
                         bg-orange-500/90 dark:bg-orange-600/90 
                         text-white text-sm font-medium"
          >
            {category}
          </span>
        )}
        <h3 className="text-2xl font-bold mt-2 text-white dark:text-gray-100">
          {title}
        </h3>
        <p className="text-gray-200 dark:text-gray-300 line-clamp-2">{description}</p>
      </div>
    </motion.article>
  );
};

FiambalaCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string,
  onClick: PropTypes.func,
};

export default FiambalaCard;
