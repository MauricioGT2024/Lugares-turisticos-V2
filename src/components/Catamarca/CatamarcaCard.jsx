import React from "react";
import { motion } from "framer-motion";

const CatamarcaCard = ({
  item,
  onClick,
  accentColor = "#556B2F", // Verde oliva
}) => {
  // Estilos dinámicos
  const styles = {
    border: `1.5px solid ${accentColor}33`, // borde más sutil con transparencia
    badgeBg: accentColor,
    titleColor: accentColor,
    buttonBg: accentColor,
    buttonShadow: `0 6px 12px ${accentColor}33`,
    hoverShadow: `0 12px 24px ${accentColor}55`,
  };

  // Keyboard handler
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.95, transition: { duration: 0.25 } }}
      whileHover={{
        scale: 1.06,
        boxShadow: styles.hoverShadow,
        transition: { type: "spring", stiffness: 260, damping: 20 },
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={`Ver detalles de ${item.title}`}
      onKeyDown={handleKeyDown}
      className="group relative bg-white dark:bg-gray-900 rounded-xl shadow-md  focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-opacity-80 transition-all duration-400"
      style={{ border: styles.border }}
    >
      {/* Imagen con esquinas redondeadas y zoom suave */}
      <div className="relative h-56 overflow-hidden rounded-t-xl">
        <img
          src={item.imgSrc}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
        <span
          className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold text-white uppercase tracking-wider shadow-lg select-none"
          style={{ backgroundColor: styles.badgeBg }}
        >
          {item.area}
        </span>
      </div>

      {/* Texto y botón */}
      <div className="p-5">
        <h3
          className="mb-2 text-xl font-bold leading-tight line-clamp-2"
          style={{ color: styles.titleColor }}
        >
          {item.title}
        </h3>
        <p className="mb-4 text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
          {item.description}
        </p>

        <motion.button
          type="button"
          aria-label={`Explorar ${item.title}`}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          onKeyDown={(e) => e.stopPropagation()}
          whileTap={{ scale: 0.95 }}
          className="inline-flex cursor-pointer items-center gap-2 px-6 py-2 rounded-md font-semibold text-white shadow-md transition-colors duration-300 hover:bg-opacity-90 focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-opacity-90"
          style={{
            backgroundColor: styles.buttonBg,
            boxShadow: styles.buttonShadow,
          }}
        >
          Explorar
          <svg
            className="w-5 h-5"
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
        </motion.button>
      </div>
    </motion.div>
  );
};

export default React.memo(CatamarcaCard);
