import { motion } from "framer-motion";
import PropTypes from "prop-types";

const Path = motion.path;

const Hamburger = ({ isOpen, toggle }) => {
  // Usamos el color del trazo dependiendo del modo oscuro o claro
  const strokeColor = "text-gray-800 dark:text-gray-100"; // Color en claro y oscuro

  return (
    <motion.button
      onClick={toggle}
      aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className="p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400 fixed top-4 left-4 z-50"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" className="w-6 h-6">
        <Path
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          variants={{
            closed: { d: "M 3 6 L 21 6" }, // Línea superior
            open: { d: "M 4 4 L 20 20" }, // "X" al abrir
          }}
        />
        <Path
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          variants={{
            closed: { opacity: 1, d: "M 3 12 L 21 12" }, // Línea del medio
            open: { opacity: 0, d: "M 12 12 L 12 12" }, // "X" al abrir
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          variants={{
            closed: { d: "M 3 18 L 21 18" }, // Línea inferior
            open: { d: "M 4 20 L 20 4" }, // "X" al abrir
          }}
        />
      </svg>
    </motion.button>
  );
};

Hamburger.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default Hamburger;
