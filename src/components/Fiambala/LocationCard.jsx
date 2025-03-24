import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Badge,
  useColorModeValue,
  Image,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMapMarkedAlt, FaExternalLinkAlt } from "react-icons/fa";
import { CATEGORY_CONFIG } from './CategoryConfig';

const LocationCard = ({ location, isSelected, onToggle }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const config = CATEGORY_CONFIG[location.category] || {
    gradient: "linear(to-r, teal.400, blue.400)",
    color: "teal.600",
    darkColor: "teal.300",
    icon: FaMapMarkedAlt
  };
  const IconComponent = config.icon;

  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        borderRadius="xl"
        overflow="hidden"
        bg={bgColor}
        boxShadow="xl"
        _hover={{ 
          transform: "translateY(-8px)",
          boxShadow: "2xl",
        }}
        transition="all 0.3s"
        height={isSelected ? "auto" : "500px"}
      >
        <Box position="relative" height="300px" overflow="hidden">
          <Image
            src={location.imgSrc}
            alt={location.title}
            objectFit="cover"
            w="100%"
            h="100%"
            transition="transform 0.5s"
            _hover={{ transform: "scale(1.05)" }}
          />
          <HStack
            position="absolute"
            top="4"
            right="4"
            spacing="2"
            bgGradient={config.gradient}
            color="white"
            borderRadius="full"
            px="3"
            py="1"
            backdropFilter="blur(8px)"
          >
            <IconComponent />
            <Text fontSize="sm" fontWeight="medium">
              {location.category}
            </Text>
          </HStack>
        </Box>

        <VStack p={6} spacing={4} align="start">
          <motion.div layout="position" style={{ width: "100%" }}>
            <Heading
              size="md"
              color={config.color}
              fontFamily="JetBrains Mono"
              _hover={{ color: config.darkColor }}
              transition="color 0.2s ease"
            >
              {location.title}
            </Heading>
          </motion.div>
          
          <motion.div layout="position" style={{ width: "100%" }}>
            <Text
              fontSize="sm"
              color={textColor}
              noOfLines={!isSelected ? 3 : undefined}
              transition="all 0.3s ease"
              onClick={() => onToggle(location.id)}
              cursor="pointer"
              _hover={{ color: config.darkColor }}
            >
              {location.description}
            </Text>
          </motion.div>

          <motion.div layout="position" style={{ width: "100%" }}>
            <Button
              leftIcon={<FaMapMarkedAlt />}
              colorScheme="yellow"
              variant="outline"
              onClick={() => onToggle(location.id)}
              w="full"
              _hover={{
                transform: "translateY(-2px)",
                bg: "yellow.50",
                borderColor: "yellow.400"
              }}
            >
              {isSelected ? "Ver menos" : "Ver más"}
            </Button>
          </motion.div>

          <AnimatePresence mode="wait">
            {isSelected && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                style={{ width: "100%" }}
              >
                <iframe
                  title={`Mapa de ${location.title}`}
                  src={location.mapSrc}
                  width="100%"
                  height="300"
                  style={{ border: 0, borderRadius: "8px" }}
                  allowFullScreen
                  loading="lazy"
                />
                
                <Button
                  as="a"
                  href={location.path}
                  target="_blank"
                  rightIcon={<FaExternalLinkAlt />}
                  colorScheme="blue"
                  variant="ghost"
                  mt={4}
                  w="full"
                >
                  Más información
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </VStack>
      </Box>
    </motion.div>
  );
};

LocationCard.propTypes = {
  location: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    mapSrc: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default LocationCard;
