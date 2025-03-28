import React from 'react';
import { Button, Icon, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { getIconByArea } from './icons';

const AreaFilter = ({ area, isSelected, onClick }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const AreaIcon = getIconByArea(area);
  
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        size="md"
        variant={isSelected ? "solid" : "outline"}
        colorScheme={isSelected ? "teal" : "gray"}
        bg={isSelected ? undefined : bgColor}
        onClick={onClick}
        px={6}
        leftIcon={<Icon as={AreaIcon} />}
        _hover={{
          shadow: "md",
        }}
      >
        {area}
      </Button>
    </motion.div>
  );
};

export default React.memo(AreaFilter);
