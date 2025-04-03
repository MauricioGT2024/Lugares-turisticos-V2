import {
  Box,
  useColorModeValue,
  Button,
  Wrap,
  WrapItem
} from "@chakra-ui/react";
import { memo } from "react";
import PropTypes from 'prop-types';

const CategoryButtonComponent = ({ category, isSelected, onClick, bgColor, textColor, hoverBgColor }) => {
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
      _active={{ transform: "scale(0.95)" }}
      borderRadius="full"
      px={4}
    >
      {category}
    </Button>
  );
};

CategoryButtonComponent.propTypes = {
  category: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  bgColor: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  hoverBgColor: PropTypes.string.isRequired,
};

const CategoryButtonWithTheme = (props) => {
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.100");
  const hoverBgColor = useColorModeValue("gray.200", "gray.600");

  return (
    <CategoryButtonComponent
      {...props}
      bgColor={bgColor}
      textColor={textColor}
      hoverBgColor={hoverBgColor}
    />
  );
};

const CategoryButton = memo(CategoryButtonWithTheme);
CategoryButton.displayName = "CategoryButton";

const CategoryFilter = memo(({ categories, categoryFilter, setCategoryFilter }) => {
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.100");
  const hoverBgColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Box
      position="relative"
      bg={bgColor}
      p={6}
      mx="auto"
      borderRadius="xl"
      boxShadow="lg"
      border="1px"
      borderColor={useColorModeValue("gray.200", "gray.700")}
    >
      <Wrap spacing={4}>
        <WrapItem>
          <CategoryButton
            category="Todas las categorías"
            isSelected={!categoryFilter}
            onClick={() => setCategoryFilter("")}
            bgColor={bgColor}
            textColor={textColor}
            hoverBgColor={hoverBgColor}
          />
        </WrapItem>
        {categories.map((category) => (
          <WrapItem key={category}>
            <CategoryButton
              category={category}
              isSelected={categoryFilter === category}
              onClick={() => setCategoryFilter(category)}
              bgColor={bgColor}
              textColor={textColor}
              hoverBgColor={hoverBgColor}
            />
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
});
CategoryFilter.displayName = "CategoryFilter";

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  categoryFilter: PropTypes.string.isRequired,
  setCategoryFilter: PropTypes.func.isRequired,
};

export default CategoryFilter;
