import { Button, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const MotionButton = motion(Button);

const FilterButton = ({ label, isSelected, onClick }) => {
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const selectedBg = useColorModeValue("teal.500", "teal.200");
  const textColor = useColorModeValue("gray.700", "white");
  const selectedTextColor = useColorModeValue("white", "gray.800");

  return (
    <MotionButton
      size="sm"
      bg={isSelected ? selectedBg : bgColor}
      color={isSelected ? selectedTextColor : textColor}
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      _hover={{
        boxShadow: "md",
      }}
      borderRadius="full"
      px={4}
    >
      {label}
    </MotionButton>
  );
};

FilterButton.propTypes = {
  label: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default FilterButton;
