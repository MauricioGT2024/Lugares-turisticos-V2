import {
  Box,
  Image,
  Badge,
  VStack,
  Heading,
  Text,
  Wrap,
  WrapItem,
  Tooltip,
  Button,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
const MotionBadge = motion.create(Badge);
const MotionBox = motion.create(Box);
import { categoryConfig } from "../Antofagasta/categoryConfig";
import React, { useCallback } from "react";
import { animations } from "./animations";
import { FaMapMarkedAlt, FaChevronDown, FaInfoCircle } from "react-icons/fa";

// Componente LocationCard memoizado
export const LocationCard = React.memo(({ location, isSelected, onToggle }) => {
  const config = categoryConfig[location.categoria] || categoryConfig.Campo;
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const handleToggleMap = useCallback(() => {
    onToggle(location.id);
  }, [location.id, onToggle]);

  return (
    <MotionBox
      variants={animations.item}
      layout
      height={isSelected ? "auto" : "450px"}
      initial="hidden"
      animate="show"
      exit="hidden"
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="xl"
      overflow="hidden"
      bg={bgColor}
      boxShadow="lg"
      _hover={{
        transform: "translateY(-8px)",
        boxShadow: "2xl",
      }}
      transition="all 0.3s"
    >
      <Box position="relative" height="250px" overflow="hidden">
        <Image
          src={location.imgSrc}
          alt={location.title}
          objectFit="cover"
          w="full"
          h="full"
          transition="transform 0.5s"
          _hover={{ transform: "scale(1.1)" }}
          loading="lazy"
        />
        <MotionBadge
          position="absolute"
          top={4}
          right={4}
          px={3}
          py={1}
          borderRadius="full"
          bgGradient={config.gradient}
          color="white"
          display="flex"
          alignItems="center"
          gap={2}
          boxShadow="md"
          backdropFilter="blur(8px)"
        >
          <Icon as={config.icon} aria-label={location.categoria} />
          {location.categoria}
        </MotionBadge>
      </Box>

      <VStack p={6} align="start" spacing={4}>
        <Heading
          size="md"
          color={config.color}
          _hover={{ transform: "translateX(4px)" }}
          transition="transform 0.2s"
        >
          {location.title}
        </Heading>

        <Text
          fontSize="sm"
          color={useColorModeValue("gray.600", "gray.300")}
          noOfLines={isSelected ? undefined : 2}
        >
          {location.description}
        </Text>

        <AnimatePresence>
          {isSelected && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              style={{ width: "100%" }}
            >
              <Box
                as="iframe"
                title={location.title}
                src={location.mapSrc}
                width="100%"
                height="300px"
                borderRadius="lg"
                border="none"
                mt={4}
                loading="lazy"
              />

              <Wrap spacing={4} mt={4}>
                <WrapItem>
                  <Tooltip label="Ver en Google Maps" hasArrow>
                    <Button
                      as="a"
                      href={location.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      leftIcon={<FaMapMarkedAlt />}
                      colorScheme="blue"
                      variant="outline"
                      size="sm"
                      _hover={{
                        transform: "translateY(-2px)",
                        boxShadow: "md",
                      }}
                    >
                      Ver ubicación
                    </Button>
                  </Tooltip>
                </WrapItem>

                <WrapItem>
                  <Tooltip label="Más información" hasArrow>
                    <Button
                      as="a"
                      href={location.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      leftIcon={<FaInfoCircle />}
                      colorScheme="teal"
                      variant="outline"
                      size="sm"
                      _hover={{
                        transform: "translateY(-2px)",
                        boxShadow: "md",
                      }}
                    >
                      Detalles
                    </Button>
                  </Tooltip>
                </WrapItem>
              </Wrap>
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          leftIcon={<FaMapMarkedAlt />}
          onClick={handleToggleMap}
          colorScheme={config.color.split(".")[0]}
          variant="outline"
          size="sm"
          w="full"
          _hover={{
            transform: "translateY(-2px)",
            boxShadow: "md",
          }}
          rightIcon={
            <Icon
              as={FaChevronDown}
              transform={isSelected ? "rotate(180deg)" : undefined}
              transition="0.2s ease"
            />
          }
          aria-label={isSelected ? "Ocultar mapa" : "Ver ubicación"}
        >
          {isSelected ? "Ver menos" : "Ver más"}
        </Button>
      </VStack>
    </MotionBox>
  );
});
