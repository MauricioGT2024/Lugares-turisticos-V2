import React from "react";
import {
  Box, VStack, Heading, Text, IconButton, Image, 
  HStack, Tooltip, useColorModeValue, Icon
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaInfoCircle, FaExpand, FaCompress } from "react-icons/fa";
import { getIconByCategory } from './icons';

const LocationCard = ({ location, isOpen, onToggle }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        bg={bgColor}
        rounded="xl"
        shadow="lg"
        overflow="hidden"
        _hover={{ transform: "translateY(-4px)", shadow: "xl" }}
        transition="all 0.3s"
      >
        <Box position="relative">
          <Image
            src={location.imgSrc}
            alt={location.name}
            h="200px"
            w="full"
            objectFit="cover"
          />
          <Box
            position="absolute"
            top={4}
            right={4}
            bg="rgba(0,0,0,0.6)"
            color="white"
            px={3}
            py={1}
            borderRadius="full"
            display="flex"
            alignItems="center"
            gap={2}
          >
            <Icon as={getIconByCategory(location.category)} />
            {location.category}
          </Box>
        </Box>

        <VStack p={6} align="stretch" spacing={4}>
          <Heading size="md">{location.name}</Heading>
          
          <Text color={textColor} noOfLines={isOpen ? undefined : 2}>
            {location.description}
          </Text>

          {isOpen && (
            <Box borderRadius="md" overflow="hidden" h="300px">
              <iframe
                title={location.name}
                src={location.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              />
            </Box>
          )}

          <HStack justify="space-between">
            <Tooltip label="Ver en mapa">
              <IconButton
                as="a"
                href={location.path}
                target="_blank"
                icon={<FaMapMarkerAlt />}
                colorScheme="purple"
                variant="ghost"
              />
            </Tooltip>

            <IconButton
              icon={isOpen ? <FaCompress /> : <FaExpand />}
              onClick={() => onToggle(location.id)}
              variant="ghost"
              colorScheme="purple"
              aria-label={isOpen ? "Contraer" : "Expandir"}
            />
          </HStack>
        </VStack>
      </Box>
    </motion.div>
  );
};

export default React.memo(LocationCard);
