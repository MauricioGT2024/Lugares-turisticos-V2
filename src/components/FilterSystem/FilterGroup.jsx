import { memo } from "react";
import { useColorMode } from "@chakra-ui/react";
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
  const { colorMode } = useColorMode();
  const safeItems = Array.isArray(items) ? items : [];

  return (
    <div className="w-full">
      <h3 className={`
        text-sm font-semibold mb-3
        ${colorMode === 'dark' ? 'text-gray-300' : 'text-gray-600'}
      `}>
        {title}
      </h3>
      
      <div className="flex flex-wrap gap-2">
        <FilterButton
          label="Todos"
          isSelected={!selected}
          onClick={() => onSelect("")}
          icon={showIcons ? getIconByCategory("Todos") : null}
        />
        {safeItems.map((item) => (
          <FilterButton
            key={item}
            label={item}
            isSelected={selected === item}
            onClick={() => onSelect(item)}
            icon={showIcons ? getIconByCategory(item) : null}
          />
        ))}
      </div>
    </div>
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
