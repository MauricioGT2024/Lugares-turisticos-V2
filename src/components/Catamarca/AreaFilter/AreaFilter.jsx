import { memo } from 'react';
import { Button, Icon, useColorModeValue, Tooltip } from "@chakra-ui/react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { getIconByArea, ANIMATION_PRESETS } from "../";

const MotionButton = motion(Button);

const AreaFilter = memo(({ area, isSelected, onClick }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const AreaIcon = getIconByArea(area);

  return (
    <Tooltip label={`Filtrar por ${area}`} hasArrow>
      <MotionButton
        size="md"
        variant={isSelected ? "solid" : "outline"}
        colorScheme={isSelected ? "teal" : "gray"}
        bg={isSelected ? undefined : bgColor}
        onClick={onClick}
        px={6}
        leftIcon={<Icon as={AreaIcon} />}
        {...ANIMATION_PRESETS.button}
        role="tab"
        aria-selected={isSelected}
        _hover={{
          shadow: "md",
          transform: "translateY(-2px)",
        }}
        transition="all 0.2s"
      >
        {area}
      </MotionButton>
    </Tooltip>
  );
});

AreaFilter.propTypes = {
  area: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

AreaFilter.displayName = 'AreaFilter';

export default AreaFilter;
