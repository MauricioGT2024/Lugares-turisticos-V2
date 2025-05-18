import React, { memo, forwardRef } from "react"; // Import forwardRef
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import clsx from "clsx";
import { getAreaTheme } from "@/components/Catamarca/areaThemes";

const filterVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.95 },
};

// Wrap the component with forwardRef
const AreaFilter = memo(forwardRef(({ area, isSelected, onClick }, ref) => { // Added ref here
  const { icon: Icon, gradient } = getAreaTheme(area);

  const baseClasses =
    "inline-flex items-center gap-2 px-5 lg:mx-3 md:m-5 sm:flex-row py-2 rounded-full font-semibold shadow-sm transition-colors duration-300 border border-transparent group";

  const selectedClasses = isSelected
    ? `bg-gradient-to-r ${gradient} text-white`
    : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 hover:text-white";

  return (
    <motion.button
      ref={ref} // Pass the ref to the motion.button
      type="button"
      variants={filterVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      onClick={onClick} // Keep onClick here so Radix UI can use it
      className={clsx(baseClasses, selectedClasses)}
      aria-pressed={isSelected}
      role="radio"
      aria-label={`Filtrar por ${area}`}
    >
      {Icon && <Icon className="w-4 h-4 opacity-70 group-hover:opacity-100" />} {/* Conditionally render Icon */}
      <span>{area}</span>
    </motion.button>
  );
})); // Close forwardRef and memo

AreaFilter.displayName = "AreaFilter";

AreaFilter.propTypes = {
  area: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func, // onClick remains optional as per previous fix
};

export default AreaFilter;
