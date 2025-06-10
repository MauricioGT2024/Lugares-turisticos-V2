import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const Card = ({ 
  image, 
  title, 
  description, 
  category, 
  onClick, 
  className = '',
  styles = {}
}) => {
  const { colorMode } = useTheme();
  const isDark = colorMode === 'dark';

  const {
    card = "group relative h-[400px] cursor-pointer rounded-xl overflow-hidden shadow-lg"
  } = styles;

  return (
    <motion.article
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onClick}
      className={`${card} ${className}`}
    >
      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
      </div>

      {/* Contenido */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        {category && (
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/90 text-sm font-medium mb-3 backdrop-blur-sm">
            {category}
          </span>
        )}
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="line-clamp-2 text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {description}
        </p>
      </div>
    </motion.article>
  );
};

Card.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Card;
