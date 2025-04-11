import { memo } from "react";
import { motion } from "framer-motion";
import { useColorMode } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { filterTransitions } from "../animations";

const FilterGroup = memo(({ 
  title,
  items = [],
  selected,
  onSelect,
  renderItem,
  containerClassName
}) => {
  const { colorMode } = useColorMode();

  return (
    <motion.div
      variants={filterTransitions}
      initial="hidden"
      animate="visible" 
      className={`backdrop-blur-md ${
        colorMode === 'dark' ? 'bg-gray-800/30' : 'bg-white/30'
      } rounded-xl p-6 ${containerClassName}`}
    >
      <h3 className={`text-lg font-medium mb-4 ${
        colorMode === 'dark' ? 'text-gray-200' : 'text-gray-700'
      }`}>
        {title}
      </h3>

      <div className="flex flex-wrap gap-3">
        {items.map((item) => renderItem(item, selected === item, () => onSelect(item)))}
      </div>
    </motion.div>
  );
});

FilterGroup.displayName = "FilterGroup";

FilterGroup.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  selected: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  renderItem: PropTypes.func.isRequired,
  containerClassName: PropTypes.string
};

export default FilterGroup;
