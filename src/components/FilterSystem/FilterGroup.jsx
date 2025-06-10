import { memo } from "react";
import { useTheme } from "../../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import FilterButton from "./FilterButton";
import { getIconByCategory } from "./icons";

const FilterGroup = memo(({ 
  title = "Filtros", 
  items = [], 
  selected = "", 
  onSelect = () => {}, 
  showIcons = true 
}) => {
  const { colorMode } = useTheme();
  const safeItems = Array.isArray(items) ? items : [];

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10"
    >
      <h3 className={`
        text-sm font-semibold mb-3
        ${colorMode === 'dark' ? 'text-gray-300' : 'text-gray-600'}
      `}>
        {title}
      </h3>
      
      <AnimatePresence mode="popLayout">
        <motion.div 
          className="flex flex-wrap gap-2"
          layout
        >
          <FilterButton
            label="Todos"
            isSelected={!selected}
            onClick={() => onSelect("")}
            icon={showIcons ? getIconByCategory("Todos") : null}
          />
          {safeItems.map(item => (
            <FilterButton
              key={item}
              label={item}
              isSelected={selected === item}
              onClick={() => onSelect(item)}
              icon={showIcons ? getIconByCategory(item) : null}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
});

FilterGroup.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.string),
  selected: PropTypes.string,
  onSelect: PropTypes.func,
  showIcons: PropTypes.bool,
};

FilterGroup.displayName = "FilterGroup";

export default FilterGroup;
