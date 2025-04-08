import { memo } from "react";
import { motion } from "framer-motion";
import { useColorMode } from "@chakra-ui/react";
import PropTypes from 'prop-types';
import { CATEGORY_CONFIG } from "./CategoryConfig";

const CategoryButton = memo(({ category, isSelected, onClick }) => {
  const { colorMode } = useColorMode();
  const config = CATEGORY_CONFIG[category] || {};
  const Icon = config.icon;
  
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-full
        text-sm font-medium transition-all duration-200
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

CategoryButton.displayName = "CategoryButton";

CategoryButton.propTypes = {
  category: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

const CategoryFilter = memo(({ categories, categoryFilter, setCategoryFilter }) => {
  const { colorMode } = useColorMode();
  
  return (
    <div className={`
      p-6 rounded-xl shadow-lg border
      ${colorMode === 'dark' 
        ? 'bg-gray-800/50 border-gray-700' 
        : 'bg-white/50 border-gray-200'
      }
      backdrop-blur-sm
    `}>
      <div className="flex flex-wrap gap-3">
        <CategoryButton
          category="Todas"
          isSelected={!categoryFilter}
          onClick={() => setCategoryFilter("")}
        />
        {categories.map((category) => (
          <CategoryButton
            key={category}
            category={category}
            isSelected={categoryFilter === category}
            onClick={() => setCategoryFilter(category)}
          />
        ))}
      </div>
    </div>
  );
});

CategoryFilter.displayName = "CategoryFilter";

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  categoryFilter: PropTypes.string.isRequired,
  setCategoryFilter: PropTypes.func.isRequired,
};

export default CategoryFilter;
