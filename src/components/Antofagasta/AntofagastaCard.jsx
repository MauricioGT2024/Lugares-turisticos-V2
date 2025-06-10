import { motion } from 'framer-motion';

const AntofagastaCard = ({ item: { imgSrc, title, description }, onClick }) => {
  // Animación de hover para la tarjeta
  const hoverEffect = { scale: 1.02 };

  return (
    <motion.div
      whileHover={hoverEffect}
      className="relative overflow-hidden rounded-xl shadow-lg bg-white dark:bg-gray-800 cursor-pointer"
      onClick={onClick}
    >
      {/* Contenedor de la imagen */}
      <div className="relative h-64">
        <img
          src={imgSrc}
          alt={title || "Imagen del lugar turístico"}
          className="w-full h-full object-cover"
          loading="lazy" // Optimización de carga de imagen
        />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-900/90 via-transparent to-transparent dark:from-teal-600/80" />
      </div>

      {/* Contenedor del texto */}
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-teal-900 dark:text-teal-200 mb-2">{title}</h3>
        <p className="text-teal-700 line-clamp-3 dark:text-teal-400">{description}</p>

        <div className="mt-4 flex items-center text-teal-600 dark:text-teal-300">
          <span className="text-sm font-medium">Leer más</span>
          <svg
            className="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-label="Icono de leer más"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>

      {/* Línea superior */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-teal-600 dark:from-teal-500 dark:to-teal-700" />
    </motion.div>
  );
};

export default AntofagastaCard;
