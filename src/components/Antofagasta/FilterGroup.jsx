import { memo } from "react";
import { motion } from "framer-motion";
import { useColorMode } from "@chakra-ui/react";
import PropTypes from 'prop-types';
import { categoryConfig } from './categoryConfig';
import { filterAnimations } from './config/animations';

const FilterGroup = memo(({ items, selected, onSelect }) => {
  const { colorMode } = useColorMode();

  return (
    <motion.div 
      className="flex flex-wrap gap-2 justify-center"
      variants={filterAnimations}
      initial="hidden"
      animate="visible"
    >
      {items.map((category) => {
        const config = categoryConfig[category] || {};
        const Icon = config.icon;
        const isSelected = selected === category;

        return (
          <motion.button
            key={category}
            onClick={() => onSelect(category)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`
              inline-flex items-center gap-2 px-4 py-2 rounded-full
              text-sm font-medium transition-all duration-200
              ${isSelected ? config.bgClass + ' text-white' : 
                colorMode === 'dark' ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' 
                : 'bg-white text-gray-700 hover:bg-gray-50'}
              ${!isSelected ? 'border border-gray-200 dark:border-gray-700' : ''}
            `}
          >
            {Icon && <Icon className="w-4 h-4" />}
            {category}
          </motion.button>
        );
      })}
    </motion.div>
  );
});

FilterGroup.displayName = "FilterGroup";

FilterGroup.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default FilterGroup;
