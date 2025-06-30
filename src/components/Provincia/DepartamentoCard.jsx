import { memo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Componente de tarjeta de departamento con animaciones y enlace
const DepartamentoCard = memo(function DepartamentoCard({ loc }) {
  return (
    <motion.article 
      initial={{
        y: 0, // Ensure y is initialized for consistency with whileHover
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)" // Explicitly define initial shadow (Tailwind's shadow-lg)
      }}
      whileHover={{
        y: -8,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative rounded-2xl overflow-hidden bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 transition-all duration-300"
    >
      <Link
        to={loc.path}
        className="block focus:outline-none focus-visible:ring-4 ring-offset-2 ring-blue-500 rounded-2xl"
      >
        <div className="relative h-56 md:h-64 overflow-hidden">
          <img
            src={loc.image}
            alt={loc.name}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          <span className="absolute bottom-4 left-4 text-sm font-semibold px-3 py-1 rounded-full bg-blue-500 text-white shadow-md">
            {loc.description}
          </span>
        </div>
        <div className="p-5">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white truncate mb-2">
            {loc.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            Explora los encantos de {loc.name} y sumérgete en su cultura.
          </p>
        </div>
      </Link>
    </motion.article>
  );
});

DepartamentoCard.propTypes = {
  loc: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default DepartamentoCard;
