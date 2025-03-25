import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Heading,
  Image,
  Text,
  useColorModeValue,
  Link,
  HStack,
  IconButton,
  Tooltip,
  Flex,
  VStack,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMapMarkedAlt, FaInfoCircle } from "react-icons/fa";
import { CATEGORY_CONFIG } from './CategoryConfig';

const LocationCard = ({ location, isOpen, onToggle }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const config = CATEGORY_CONFIG[location.category] || {
    gradient: "linear(to-br, teal.400, blue.400)",
    color: "teal.600",
    darkColor: "teal.300",
    icon: FaMapMarkedAlt,
    shadow: "0 4px 20px -8px rgba(129, 230, 217, 0.5)"
  };
  const IconComponent = config.icon;

  return (
    <motion.div 
      layout 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Box
        borderRadius="2xl"
        overflow="hidden"
        bg={bgColor}
        position="relative"
        height={isOpen ? "auto" : "500px"}
        transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
        _hover={{ 
          transform: "translateY(-8px)",
          boxShadow: config.shadow
        }}
        backdropFilter="blur(8px)"
        borderWidth="1px"
        borderColor={useColorModeValue("gray.100", "gray.700")}
      >
        <Box position="relative" height="300px" overflow="hidden">
          <Image
            src={location.imgSrc}
            alt={location.name}
            objectFit="cover"
            w="100%"
            h="100%"
            transition="transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
            _hover={{ transform: "scale(1.08)" }}
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <HStack
              position="absolute"
              top="4"
              right="4"
              spacing="2"
              bgGradient={config.gradient}
              color="white"
              borderRadius="full"
              px="4"
              py="2"
              backdropFilter="blur(12px)"
              boxShadow="lg"
            >
              <IconComponent />
              <Text fontSize="sm" fontWeight="bold">
                {location.category}
              </Text>
            </HStack>
          </motion.div>
        </Box>

        <VStack p="6" align="stretch" spacing="4">
          <Heading
            size="md"
            bgGradient={config.gradient}
            bgClip="text"
            fontFamily="JetBrains Mono"
            _hover={{ transform: "translateY(-2px)" }}
            transition="all 0.3s ease"
          >
            {location.name}
          </Heading>

          <Text color={textColor} fontSize="md" noOfLines={3}>
            {location.description}
          </Text>

          <Flex gap="4" justify="space-between">
            <Tooltip label={isOpen ? "Ocultar mapa" : "Ver ubicación"}>
              <IconButton
                icon={<FaMapMarkedAlt />}
                colorScheme="teal"
                variant="ghost"
                onClick={() => onToggle(location.id)}
                aria-label="Toggle map"
                size="lg"
                isRound
                _hover={{ 
                  transform: "scale(1.1)",
                  bgGradient: config.gradient,
                  color: "white"
                }}
              />
            </Tooltip>
          </Flex>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Box
                  mt="4"
                  borderRadius="xl"
                  overflow="hidden"
                  height="300px"
                  boxShadow="inner"
                >
                  <iframe
                    src={location.mapUrl}
                    title={`Mapa de ${location.name}`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  />
                </Box>
                
                <Link
                  href={location.path}
                  isExternal
                  style={{ textDecoration: "none" }}
                  display="block"
                  mt={4}
                >
                  <Button
                    leftIcon={<FaInfoCircle />}
                    width="full"
                    size="lg"
                    bgGradient={config.gradient}
                    color="white"
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: config.shadow
                    }}
                    transition="all 0.3s ease"
                  >
                    Más detalles
                  </Button>
                </Link>
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
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    mapUrl: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default React.memo(LocationCard);
