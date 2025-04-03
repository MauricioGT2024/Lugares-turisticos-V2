import {
  Box,
  Button,
  useColorModeValue,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { memo } from "react";
import PropTypes from "prop-types";

const AreaFilter = memo(({ categories, areaFilter, setAreaFilter }) => {
  const bgColor = useColorModeValue("gray.50", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const selectedBgColor = useColorModeValue("purple.500", "purple.200");
  const selectedTextColor = useColorModeValue("white", "gray.800");

  return (
    <Box
      bg={bgColor}
      p={4}
      borderRadius="md"
      boxShadow="sm"
    >
      <Wrap spacing={2}>
        {categories.map((category) => (
          <WrapItem key={category}>
            <Button
              size="sm"
              borderRadius="full"
              px={4}
              fontSize="sm"
              fontWeight="medium"
              color={areaFilter === category ? selectedTextColor : textColor}
              bg={areaFilter === category ? selectedBgColor : bgColor}
              _hover={{ bg: areaFilter === category ? selectedBgColor : "gray.200" }}
              _focus={{ boxShadow: "none" }}
              onClick={() => setAreaFilter(category)}
              aria-label={`Filtrar por ${category}`}
            >
              {category}
            </Button>
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
});

AreaFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  areaFilter: PropTypes.string.isRequired,
  setAreaFilter: PropTypes.func.isRequired,
};

AreaFilter.displayName = "AreaFilter";

export default AreaFilter;
