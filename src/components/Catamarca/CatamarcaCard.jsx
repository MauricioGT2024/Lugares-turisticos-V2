import { motion } from "framer-motion";
import React from "react";

const CatamarcaCard = ({
  item,
  onClick,
  accentColor = "#556B2F" /* verde oliva para San Fernando del Valle de Catamarca */,
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9, transition: { duration: 0.2 } }}
      whileHover={{ scale: 1.05, boxShadow: `0 10px 20px ${accentColor}88` }}
      whileTap={{ scale: 0.97 }}
      transition={{
        type: "spring",
        stiffness: 160,
        damping: 18,
        duration: 0.35,
      }}
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={`Ver detalles de ${item.title}`}
      className="group relative rounded-2xl overflow-hidden shadow-md bg-white dark:bg-gray-900 cursor-pointer border border-transparent focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-opacity-75 transition-all duration-300"
      style={{ borderColor: accentColor }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Imagen con overlay y zoom */}
      <div className="relative h-56 md:h-64 overflow-hidden rounded-t-2xl">
        <img
          src={item.imgSrc}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110 brightness-95 group-hover:brightness-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
        <span
          className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold text-white uppercase tracking-wide shadow-md select-none"
          style={{ backgroundColor: accentColor }}
        >
          {item.area}
        </span>
      </div>

      {/* Texto y botón */}
      <div className="p-6 bg-white dark:bg-gray-900 rounded-b-2xl">
        <h3
          className="mb-2 text-2xl font-extrabold leading-snug line-clamp-2"
          style={{ color: accentColor }}
        >
          {item.title}
        </h3>
        <p className="mb-6 text-gray-700 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
          {item.description}
        </p>

        <button
          type="button"
          className="inline-flex items-center px-5 py-2 font-semibold text-white rounded-md shadow-md transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={{
            background: `linear-gradient(90deg, ${accentColor}cc 0%, ${accentColor}aa 100%)`,
            boxShadow: `0 4px 10px ${accentColor}aa`,
          }}
          aria-label={`Explorar ${item.title}`}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          onKeyDown={(e) => e.stopPropagation()}
        >
          Explorar
          <svg
            className="ml-2 w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
};

export default React.memo(CatamarcaCard);
