import { motion } from "framer-motion";
import PropTypes from "prop-types";

const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeLinecap="round"
    strokeWidth="2.5"
    {...props}
  />
);

const Hamburger = ({ isOpen, toggle }) => {
  return (
    <motion.button
      onClick={toggle}
      aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className="fixed top-4 left-4 z-50 p-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="text-gray-800 dark:text-gray-100"
      >
        <Path
          variants={{
            closed: { d: "M 3 6 L 21 6" },
            open: { d: "M 4 4 L 20 20" },
          }}
          stroke="currentColor"
        />
        <Path
          variants={{
            closed: { opacity: 1, d: "M 3 12 L 21 12" },
            open: { opacity: 0, d: "M 12 12 L 12 12" },
          }}
          transition={{ duration: 0.1 }}
          stroke="currentColor"
        />
        <Path
          variants={{
            closed: { d: "M 3 18 L 21 18" },
            open: { d: "M 4 20 L 20 4" },
          }}
          stroke="currentColor"
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
