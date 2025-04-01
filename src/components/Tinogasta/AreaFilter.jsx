import React from 'react';
import { Button, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import PropTypes from 'prop-types';

const AreaFilter = ({ category, isSelected, onClick }) => {
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.100");

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Button
        bg={isSelected ? "purple.500" : bgColor}
        color={isSelected ? "white" : textColor}
        onClick={onClick}
        size="sm"
        fontWeight="bold"
        _hover={{ bg: "purple.300" }}
        _active={{ bg: "purple.500" }}
      >
        {category}
      </Button>
    </motion.div>
  );
};

AreaFilter.propTypes = {
  category: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default React.memo(AreaFilter);
