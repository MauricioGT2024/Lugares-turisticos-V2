import React from 'react';
import { motion } from 'framer-motion';

const FiambalaCard = ({ image: imgSrc, title, description, category, onClick }) => {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        cursor: "pointer"
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
      }}
      onClick={onClick}
      className="relative w-full h-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm transition-all duration-300"
    >
      {/* Imagen destacada */}
      <div className="relative w-full h-56 md:h-64 overflow-hidden">
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-full object-cover object-center transition-transform duration-500 transform group-hover:scale-110"
          loading="lazy"
        />
      </div>

      {/* Contenido */}
      <div className="p-6 flex flex-col justify-between space-y-4">
        {/* Categoría */}
        {category && (
          <span className="text-xs text-gray-500 dark:text-gray-400 uppercase font-medium tracking-wide">
            {category}
          </span>
        )}

        {/* Título */}
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>

        {/* Descripción */}
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">{description}</p>

        {/* Botón de explorar */}
        <div className="mt-4 flex justify-between items-center text-gray-500 dark:text-gray-400">
          <span className="text-sm font-medium">Explorar</span>
          <motion.svg
            className="w-5 h-5 transform transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </motion.svg>
        </div>
      </div>
    </motion.article>
  );
};

export default React.memo(FiambalaCard);
