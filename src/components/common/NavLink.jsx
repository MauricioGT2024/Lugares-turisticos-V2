import { Link as RouterLink, useLocation } from "react-router-dom";
import { useColorMode } from "@chakra-ui/react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

/**
 * NavLink reutilizable para Navbar y Footer
 * Props:
 * - to: string (ruta)
 * - label: string (texto)
 * - icon: componente de ícono
 * - onClick: función opcional
 * - sidebar (opcional): si es true, aplica estilos de sidebar
 */
const NavLink = ({ to, label, icon: Icon, onClick, sidebar }) => {
  const location = useLocation();
  const { colorMode } = useColorMode();
  const isActive = location.pathname === to;

  // Estilos base
  const baseClass = sidebar
    ? `flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium transition-colors
      ${isActive
        ? "bg-teal-500 text-white"
        : colorMode === "light"
          ? "text-gray-700 hover:bg-teal-100"
          : "text-gray-200 hover:bg-teal-800"
      }`
    : `flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-300 py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all ${isActive ? "font-bold text-teal-600 dark:text-teal-300" : ""}`;

  return (
    <motion.div whileHover={sidebar ? undefined : { x: 4 }} className="w-full">
      <RouterLink to={to} onClick={onClick} className={baseClass}>
        {Icon && <Icon className="w-5 h-5" />}
        <span>{label}</span>
      </RouterLink>
    </motion.div>
  );
};

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  onClick: PropTypes.func,
  sidebar: PropTypes.bool,
};

export default NavLink;
