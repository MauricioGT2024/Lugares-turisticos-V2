import PropTypes from 'prop-types';
import {
  Box,
  VStack,
  Heading,
  Select,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { FaFilter } from "react-icons/fa";
const CategoryFilter = ({ categoryFilter, setCategoryFilter, categories }) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");
  

  return (
    <Box
      position="sticky"
      top="20"
      bg={cardBg}
      p={6}
      borderRadius="xl"
      boxShadow="lg"
      border="1px"
      borderColor={useColorModeValue("gray.200", "gray.700")}
    >
      <VStack spacing={4}>
        <Heading size="md" color={textColor}>
          Filtrar por categoría
        </Heading>
        <Select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          bg={cardBg}
          icon={<Icon as={FaFilter} />}
          size="lg"
        >
          <option value="">Todas las categorías</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
      </VStack>
    </Box>
  );
};

CategoryFilter.propTypes = {
  categoryFilter: PropTypes.string.isRequired,
  setCategoryFilter: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  locations: PropTypes.array.isRequired,
};

export default CategoryFilter;
