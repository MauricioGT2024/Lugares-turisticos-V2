import { motion } from "framer-motion";
import { Box, useColorModeValue } from "@chakra-ui/react";
import PropTypes from "prop-types";

const Path = ({ d, opacity = 1, ...props }) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    initial={false}
    transition={{ duration: 0.3 }}
    d={d}
    opacity={opacity}
    {...props}
  />
);

Path.propTypes = {
  d: PropTypes.string.isRequired,
  opacity: PropTypes.number
};

const Hamburger = ({ isOpen, toggle }) => {
  const color = useColorModeValue("gray.600", "gray.200");
  
  return (
    <Box
      as={motion.button}
      onClick={toggle}
      aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className={`
        flex items-center justify-center p-2
        rounded-xl transition-colors
        hover:bg-gray-100 dark:hover:bg-gray-700
      `}
    >
      <svg width="24" height="24" viewBox="0 0 24 24">
        <Path
          stroke={color}
          animate={isOpen ? { d: "M 5 19 L 19 5" } : { d: "M 4 6 L 20 6" }}
        />
        <Path
          stroke={color}
          animate={isOpen 
            ? { opacity: 0, d: "M 12 12 L 12 12" }
            : { opacity: 1, d: "M 4 12 L 20 12" }
          }
          transition={{ duration: 0.1 }}
        />
        <Path
          stroke={color}
          animate={isOpen ? { d: "M 5 5 L 19 19" } : { d: "M 4 18 L 20 18" }}
        />
      </svg>
    </Box>
  );
};

Hamburger.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired
};

export default Hamburger;
