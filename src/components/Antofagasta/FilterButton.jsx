import { Button } from "@chakra-ui/react";
import React from "react";

// Componente FilterButton memoizado
export const FilterButton = React.memo(({ category, isSelected, onClick }) => (
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
));
