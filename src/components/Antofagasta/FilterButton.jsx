import { Button } from "@chakra-ui/react";
import React from "react";
import PropTypes from 'prop-types'; // Añadir PropTypes

// Componente FilterButton memoizado
const FilterButtonComponent = ({ category, isSelected, onClick }) => (
  <Button
    size="sm"
    colorScheme={isSelected ? "teal" : "gray"}
    variant={isSelected ? "solid" : "outline"}
    onClick={onClick}
    _hover={{ transform: "translateY(-2px)" }}
    transition="all 0.2s"
    aria-label={`Filtrar por ${category}`}
  >
    {category}
  </Button>
);

// Definición de PropTypes
FilterButtonComponent.propTypes = {
  category: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export const FilterButton = React.memo(FilterButtonComponent);
