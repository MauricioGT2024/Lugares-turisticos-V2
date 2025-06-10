import { memo } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import PropTypes from "prop-types";

const FilterButton = memo(({ label, isSelected, onClick, icon: Icon }) => {
  const { colorMode } = useTheme();
  
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-full
        text-sm font-medium transition-all duration-200
        ${isSelected 
          ? 'bg-teal-500 text-white' 
          : colorMode === 'dark'
            ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            : 'bg-white text-gray-700 hover:bg-gray-50'
        }
        ${!isSelected && (colorMode === 'dark' ? 'border-gray-700' : 'border-gray-200')}
        ${!isSelected && 'border'}
        focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2
      `}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {label}
    </motion.button>
  );
});

FilterButton.displayName = "FilterButton";

FilterButton.propTypes = {
  label: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.elementType,
};

export default FilterButton;
