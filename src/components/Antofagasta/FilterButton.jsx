import { Button, useColorModeValue } from "@chakra-ui/react";
import { memo } from "react";
import PropTypes from 'prop-types';

const FilterButtonComponent = ({ category, isSelected, onClick, bgColor, textColor, hoverBgColor }) => {
  return (
    <Button
      size="sm"
      bg={isSelected ? hoverBgColor : bgColor}
      color={textColor}
      variant="solid"
      onClick={onClick}
      _hover={{
        bg: isSelected ? hoverBgColor : bgColor,
        transform: "translateY(-1px)",
        boxShadow: "sm",
      }}
      transition="all 0.15s ease-in-out"
      aria-label={`Filtrar por ${category}`}
    >
      {category}
    </Button>
  );
};

FilterButtonComponent.propTypes = {
  category: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  bgColor: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  hoverBgColor: PropTypes.string.isRequired,
};

const FilterButtonWithTheme = (props) => {
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.100");
  const hoverBgColor = useColorModeValue("gray.200", "gray.600");

  return (
    <FilterButtonComponent
      {...props}
      bgColor={bgColor}
      textColor={textColor}
      hoverBgColor={hoverBgColor}
    />
  );
};

export const FilterButton = memo(FilterButtonWithTheme);
