import { motion } from 'framer-motion';
import React from 'react';

const cardVariants = {
  initial: { opacity: 0, y: 15, scale: 0.99 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 120, damping: 15 } },
  hover: { y: -5, scale: 1.01, transition: { duration: 0.2, ease: 'easeOut' } },
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
    className="group relative rounded-xl overflow-hidden shadow-sm bg-white dark:bg-gray-800
               hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-50 dark:border-gray-800 
               transform hover:-translate-y-0.5 focus-within:ring-1 focus-within:ring-blue-400 focus-within:ring-offset-1 focus-within:ring-offset-white dark:focus-within:ring-offset-gray-900"
    tabIndex="0"
    role="button"
    aria-label={`Ver detalles de ${title}`}
  >
    <div className="relative h-52 md:h-60 overflow-hidden rounded-t-xl">
      <img
        src={imgSrc}
        alt={title}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103 brightness-95"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent" />
      <div className="absolute top-3 right-3">
        <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full bg-blue-500/80 text-white uppercase tracking-tight">
          {categoria}
        </span>
      </div>
    </div>

    <div className="p-4 sm:p-5">
      <h3 className="mb-1 text-lg sm:text-xl font-semibold text-gray-800 dark:text-white leading-snug">
        {title}
      </h3>

      <div className="flex items-center justify-between mt-3">
        <span className="text-blue-500 dark:text-blue-400 font-medium text-sm flex items-center group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors duration-200">
          Explorar
          <svg
            className="ml-1 w-3.5 h-3.5 transform transition-transform duration-200 group-hover:translate-x-0.5"
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

    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-linear-to-r from-blue-400 to-indigo-500 origin-left scale-x-0 group-hover:scale-x-100 transform transition-transform duration-200 ease-out" />
  </motion.article>
);

export default React.memo(AntofagastaCard);