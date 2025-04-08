import { memo } from "react";
import { motion } from "framer-motion";
import { useColorMode } from "@chakra-ui/react";
import PropTypes from 'prop-types';
import { categoryConfig } from './categoryConfig';

const FilterButton = memo(({ category, isSelected, onClick }) => {
  const { colorMode } = useColorMode();
  const config = categoryConfig[category] || {};
  const Icon = config.icon;
  
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        inline-flex items-center gap-2 px-4 py-2 
        rounded-full text-sm font-medium
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2
        ${isSelected 
          ? `${config.bgClass} text-white` 
          : colorMode === 'dark'
            ? 'bg-gray-800 text-gray-200 hover:bg-gray-700 border-gray-700'
            : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200'
        }
        ${!isSelected ? 'border' : ''}
      `}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {category}
    </motion.button>
  );
});

FilterButton.displayName = "FilterButton";

FilterButton.propTypes = {
  category: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default FilterButton;
