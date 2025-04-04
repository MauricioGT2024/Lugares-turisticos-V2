import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  useColorModeValue,
  Image,
  Skeleton,
  AspectRatio,
  HStack,
  Icon,
  Badge,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaEye } from "react-icons/fa";

const MotionBox = motion(Box);

const LocationCardComponent = ({ location, onShowDetails, config }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const handleImageLoad = useCallback(() => setImageLoaded(true), []);
  const handleShowDetailsClick = useCallback(
    () => onShowDetails(location.id),
    [location.id, onShowDetails]
  );

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const headingColor = useColorModeValue(
    config.color || "gray.800",
    config.darkColor || "whiteAlpha.900"
  );
  const buttonHoverBg = useColorModeValue("gray.100", "whiteAlpha.200");
  const buttonHoverColor = useColorModeValue("gray.700", "white");

  const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  return (
    <MotionBox
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="md"
      overflow="hidden"
      height="420px" // Ajustar la altura para mejor visualización
      display="flex"
      flexDirection="column"
      boxShadow="lg"
      _hover={{
        transform: "translateY(-3px)",
        boxShadow: "xl",
      }}
      transition="0.2s"
    >
      <Box position="relative" height="200px" flexShrink={0}>
        <Skeleton isLoaded={imageLoaded} height="100%">
          <AspectRatio ratio={16 / 9} h="100%">
            <Image
              src={location.imgSrc}
              alt={location.title}
              objectFit="cover"
              onLoad={handleImageLoad}
              w="full"
              h="full"
              transition="0.4s ease-in-out"
              _hover={{ transform: "scale(1.05)" }}
              aria-label={location.title}
            />
          </AspectRatio>
        </Skeleton>
        {config.category && (
          <Badge
            position="absolute"
            top={3}
            right={3}
            px={2}
            py={1}
            borderRadius="full"
            bgGradient={config.gradient}
            color="white"
            display="flex"
            alignItems="center"
            gap={1}
            boxShadow="md"
            backdropFilter="blur(5px)"
            fontSize="sm"
          >
            <Icon as={config.icon} aria-label={location.category} size="sm" />
            {location.category}
          </Badge>
        )}
      </Box>
      <VStack
        p={5}
        align="start"
        spacing={3}
        flexGrow={1}
        display="flex"
        flexDirection="column"
      >
        <HStack spacing={2}>
          {config.icon && (
            <Box as={config.icon} color={config.color} boxSize={5} />
          )}
          <Heading size="md" noOfLines={2} color={headingColor}>
            {location.title}
          </Heading>
        </HStack>
        <Text fontSize="sm" color={textColor} noOfLines={3} lineHeight="1.6">
          {location.description}
        </Text>
        <Button
          leftIcon={<FaEye />}
          onClick={handleShowDetailsClick}
          colorScheme={config.colorScheme || "gray"}
          variant="ghost"
          size="sm"
          w="full"
          mt="auto"
          _hover={{
            bg: buttonHoverBg,
            color: buttonHoverColor,
            transform: "translateY(-2px)",
            boxShadow: "sm",
          }}
          transition="0.2s"
          aria-label={`Ver detalles de ${location.title}`}
        >
          Ver Detalles
        </Button>
      </VStack>
    </MotionBox>
  );
};

LocationCardComponent.propTypes = {
  location: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    imgSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    mapSrc: PropTypes.string.isRequired,
    path: PropTypes.string,
    wiki: PropTypes.string,
    category: PropTypes.string,
    area: PropTypes.string,
  }).isRequired,
  onShowDetails: PropTypes.func.isRequired,
  config: PropTypes.shape({
    colorScheme: PropTypes.string,
    color: PropTypes.string,
    darkColor: PropTypes.string,
    icon: PropTypes.elementType,
    gradient: PropTypes.string,
    category: PropTypes.string,
  }).isRequired,
};

export default React.memo(LocationCardComponent);
