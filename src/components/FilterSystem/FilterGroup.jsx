import { Box, Wrap, WrapItem, Text, useColorModeValue } from "@chakra-ui/react";
import PropTypes from "prop-types";
import FilterButton from "./FilterButton";
import { getIconByCategory } from "./icons";

const FilterGroup = ({ 
  title = "Filtros", 
  items = [], 
  selected = "", 
  onSelect = () => {}, 
  showIcons = true 
}) => {
  // Validar que items sea un array
  const safeItems = Array.isArray(items) ? items : [];

  return (
    <Box>
      <Text
        fontSize="sm"
        fontWeight="semibold"
        mb={3}
        color={useColorModeValue("gray.600", "gray.300")}
      >
        {title}
      </Text>
      <Wrap spacing={2}>
        <WrapItem>
          <FilterButton
            label="Todos"
            isSelected={!selected}
            onClick={() => onSelect("")}
            icon={showIcons ? getIconByCategory("Todos") : null}
          />
        </WrapItem>
        {safeItems.map((item) => (
          <WrapItem key={item}>
            <FilterButton
              label={item}
              isSelected={selected === item}
              onClick={() => onSelect(item)}
              icon={showIcons ? getIconByCategory(item) : null}
            />
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
};

FilterGroup.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.string),
  selected: PropTypes.string,
  onSelect: PropTypes.func,
  showIcons: PropTypes.bool,
};

FilterGroup.defaultProps = {
  title: "Filtros",
  items: [],
  selected: "",
  onSelect: () => {},
  showIcons: true,
};

export default FilterGroup;
