import { motion } from 'framer-motion';
import React from 'react';

const cardVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 12 } },
  hover: { y: -7, scale: 1.03, transition: { duration: 0.3, ease: 'easeOut' } },
};

const AntofagastaCard = ({ item: { title, categoria, imgSrc, id }, onClick }) => (
  <motion.article
    variants={cardVariants}
    initial="initial"
    animate="animate"
    whileHover="hover"
    onClick={() => onClick(id)}
    onKeyDown={e => {
      if (e.key === 'Enter' || e.key === ' ') {
        onClick(id);
      }
    }}
    className="group relative rounded-2xl overflow-hidden shadow-xl bg-white dark:bg-gray-800 
               hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700 
               transform hover:-translate-y-1 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent"
    tabIndex="0"
    role="button"
    aria-label={`Ver detalles de ${title}`}
  >
    <div className="relative h-56 md:h-64 overflow-hidden">
      <img
        src={imgSrc}
        alt={title}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 brightness-90 group-hover:brightness-100"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <div className="absolute top-4 right-4">
        <span className="inline-flex items-center px-4 py-1.5 text-xs font-semibold rounded-full bg-blue-600/90 text-white shadow-md">
          {categoria}
        </span>
      </div>
    </div>

    <div className="p-5 sm:p-6">
      <h3 className="mb-2 text-xl sm:text-2xl font-bold text-gray-800 dark:text-white leading-tight">
        {title}
      </h3>

      <div className="flex items-center justify-between mt-4">
        <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm flex items-center">
          Explorar
          <svg
            className="ml-1 w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </span>
      </div>
    </div>

    <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 origin-left scale-x-0 group-hover:scale-x-100 transform transition-transform duration-300 ease-out" />
  </motion.article>
);

export default React.memo(AntofagastaCard);
