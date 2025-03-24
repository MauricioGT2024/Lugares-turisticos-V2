import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, useColorModeValue } from "@chakra-ui/react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { AREA_CONFIG } from './AreaConfig';

const AreaFilter = React.memo(({ area, isSelected, onClick }) => {
  const bgColor = useColorModeValue("white", "gray.800");

  return (
    <Button
      size="md"
      variant={isSelected ? "solid" : "outline"}
      colorScheme={isSelected ? "teal" : "gray"}
      bg={isSelected ? undefined : bgColor}
      onClick={onClick}
      leftIcon={<Icon as={AREA_CONFIG[area]?.icon || FaMapMarkerAlt} />}
      _hover={{
        transform: "translateY(-2px)",
        shadow: "md",
      }}
      transition="all 0.2s"
      aria-label={`Filtrar por ${area}`}
    >
      {area}
    </Button>
  );
});

AreaFilter.propTypes = {
  area: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

AreaFilter.displayName = 'AreaFilter';

export default AreaFilter;
