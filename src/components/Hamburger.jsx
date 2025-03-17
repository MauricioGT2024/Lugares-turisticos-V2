import { motion } from "framer-motion";
import { Box } from "@chakra-ui/react";
import PropTypes from "prop-types";

const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    strokeLinecap="round"
    {...props}
  />
);

const Hamburger = ({ isOpen, toggle, color }) => {
  return (
    <Box
      display={{ base: "flex", md: "none" }}
      as="button"
      aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
      onClick={toggle}
      cursor="pointer"
      height="40px"
      width="40px"
      alignItems="center"
      justifyContent="center"
      _hover={{ opacity: 0.8 }}
      transition="all 0.2s"
    >
      <svg width="23" height="23" viewBox="0 0 23 23">
        <Path
          stroke={color}
          variants={{
            closed: { d: "M 2 2.5 L 20 2.5" },
            open: { d: "M 3 16.5 L 17 2.5" },
          }}
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.3 }}
        />
        <Path
          stroke={color}
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.3 }}
        />
        <Path
          stroke={color}
          variants={{
            closed: { d: "M 2 16.346 L 20 16.346" },
            open: { d: "M 3 2.5 L 17 16.346" },
          }}
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.3 }}
        />
      </svg>
    </Box>
  );
};

Hamburger.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  color: PropTypes.string,
};

Hamburger.defaultProps = {
  color: "currentColor",
};

export default Hamburger;
