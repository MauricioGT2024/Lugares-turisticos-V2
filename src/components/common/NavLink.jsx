import { Link as RouterLink, useLocation } from "react-router-dom";
import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import clsx from "clsx";

/**
 * Componente reutilizable NavLink para navegación (Navbar, Sidebar)
 */
const NavLink = ({ to, label, icon: Icon, onClick, sidebar = false }) => {
  const { pathname } = useLocation();
  const isActive = pathname === to;

  const baseClasses = sidebar
    ? clsx(
        "flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium transition-colors",
        isActive
          ? "bg-teal-500 text-white" // Active state
          : "text-gray-700 hover:bg-teal-100 dark:text-gray-300 dark:hover:bg-teal-800" // Non-active state (light and dark combined)
      )
    : clsx(
        "flex items-center space-x-2 py-2 px-4 rounded-lg transition-all",
        "text-gray-600 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-300",
        "hover:bg-gray-100 dark:hover:bg-gray-700",
        {
          "font-bold text-teal-600 dark:text-teal-300": isActive,
        }
      );

  return (
    <motion.div whileHover={!sidebar ? { x: 4 } : false} className="w-full">
      <RouterLink to={to} onClick={onClick} className={baseClasses}>
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

export default React.memo(NavLink);
