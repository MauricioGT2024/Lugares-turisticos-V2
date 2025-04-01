import { Button, Icon, useColorModeValue, Tooltip } from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import { getIconByArea } from "./icons";
import { useCallback } from "react";
import PropTypes from "prop-types";

const MotionButton = motion(Button);

const AreaFilter = ({ area, isSelected, onClick }) => {
  const controls = useAnimation();
  const bgColor = useColorModeValue("white", "gray.800");
  const AreaIcon = getIconByArea(area);

  const handleClick = useCallback(() => {
    controls.start({
      scale: [0.95, 1],
      transition: { duration: 0.2 },
    });
    onClick();
  }, [controls, onClick]);

  return (
    <Tooltip label={`Filtrar por ${area}`} hasArrow>
      <MotionButton
        size="md"
        variant={isSelected ? "solid" : "outline"}
        colorScheme={isSelected ? "teal" : "gray"}
        bg={isSelected ? undefined : bgColor}
        onClick={handleClick}
        px={6}
        leftIcon={<Icon as={AreaIcon} />}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={controls}
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
};

AreaFilter.propTypes = {
  area: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default AreaFilter;
