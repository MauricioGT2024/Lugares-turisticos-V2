import React from 'react';
import { Button, Icon, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { getIconByCategory } from './icons';

const AreaFilter = ({ category, isSelected, onClick }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        size="md"
        variant={isSelected ? "solid" : "outline"}
        colorScheme={isSelected ? "purple" : "gray"}
        bg={isSelected ? undefined : bgColor}
        onClick={onClick}
        px={6}
        leftIcon={<Icon as={getIconByCategory(category)} />}
        _hover={{
          shadow: "md",
        }}
      >
        {category}
      </Button>
    </motion.div>
  );
};

export default React.memo(AreaFilter);
