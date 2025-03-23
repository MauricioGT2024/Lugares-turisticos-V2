import { motion } from "framer-motion";
import { Box, useColorModeValue } from "@chakra-ui/react";
import PropTypes from "prop-types";

const Path = ({ color, ...props }) => (
  <motion.path
    fill="transparent"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    stroke={color}
    {...props}
  />
);

Path.propTypes = {
  color: PropTypes.string.isRequired
};

const pathVariants = {
  closed: {
    transition: { duration: 0.2, ease: "easeInOut" }
  },
  open: {
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
  }
};

const Hamburger = ({ isOpen, toggle, color }) => (
  <Box
    as={motion.button}
    display={{ base: "flex", lg: "none" }}
    aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
    onClick={toggle}
    cursor="pointer"
    height="40px"
    width="40px"
    alignItems="center"
    justifyContent="center"
    borderRadius="md"
    _hover={{ 
      bg: useColorModeValue("gray.100", "whiteAlpha.200"),
      transform: "scale(1.05)" 
    }}
    _active={{ transform: "scale(0.95)" }}
    transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
    position="relative"
    role="button"
    whileTap={{ scale: 0.95 }}
    whileHover={{ scale: 1.05 }}
  >
    <svg 
      width="20" 
      height="20" 
      viewBox="0 0 20 20"
      style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}
    >
      <Path
        color={color}
        variants={{
          closed: { d: "M 2 4 L 18 4", opacity: 1 },
          open: { d: "M 4 16 L 16 4", opacity: 1 }
        }}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        {...pathVariants}
      />
      <Path
        color={color}
        variants={{
          closed: { d: "M 2 10 L 18 10", opacity: 1 },
          open: { d: "M 2 10 L 18 10", opacity: 0 }
        }}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        {...pathVariants}
      />
      <Path
        color={color}
        variants={{
          closed: { d: "M 2 16 L 18 16", opacity: 1 },
          open: { d: "M 4 4 L 16 16", opacity: 1 }
        }}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        {...pathVariants}
      />
    </svg>
  </Box>
);

Hamburger.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  color: PropTypes.string
};

Hamburger.defaultProps = {
  color: "currentColor"
};

export default Hamburger;
