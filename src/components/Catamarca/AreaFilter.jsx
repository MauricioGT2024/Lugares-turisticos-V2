import { memo, useMemo } from "react";
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

export const AreaFilter = memo(({ area, isSelected, onClick }) => {
  const { icon: Icon, gradient } = getAreaTheme(area);

  const buttonClasses = clsx(
    "inline-flex items-center gap-2 px-5 py-2 rounded-full font-semibold shadow-sm transition-colors duration-300 border border-transparent group",
    {
      // Estilo seleccionado
      [`bg-gradient-to-r ${gradient} text-white`]: isSelected,

      // Estilo no seleccionado
      "dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 hover:text-white":
        !isSelected,
      "bg-white text-gray-700 hover:bg-gray-100": !isSelected,
    }
  );

  return (
    <motion.button
      variants={filterVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      className={buttonClasses}
      aria-pressed={isSelected}
      role="radio"
      aria-label={`Filtrar por ${area}`}
    >
      <Icon className="w-4 h-4 opacity-70 group-hover:opacity-100" />
      <span>{area}</span>
    </motion.button>
  );
});

AreaFilter.displayName = "AreaFilter";

AreaFilter.propTypes = {
  area: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
