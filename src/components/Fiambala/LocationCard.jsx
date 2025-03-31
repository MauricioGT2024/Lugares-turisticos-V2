import React, { useState, useCallback } from "react";
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
  Icon,
  Skeleton, // Añadir Skeleton
  AspectRatio, // Añadir AspectRatio
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaEye } from "react-icons/fa"; // Icono para el botón
import { CATEGORY_CONFIG } from "./CategoryConfig";
const MotionBox = motion(Box);

// Componente LocationCard rehecho para Fiambalá (estilo modal)
const LocationCardComponent = ({ location, onShowDetails }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Colores y configuración
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const config = CATEGORY_CONFIG[location.category] || {};
  const IconComponent = config.icon || FaEye; // Icono de categoría o fallback
  const headingColor = useColorModeValue(
    config.color || "gray.800",
    config.darkColor || "whiteAlpha.900"
  ); // Mover hook
  const buttonHoverBg = useColorModeValue("yellow.50", "yellow.800"); // Ajustar colores hover si es necesario
  const buttonHoverColor = useColorModeValue("yellow.600", "yellow.200"); // Mover hook

  // Callbacks
  const handleImageLoad = useCallback(() => setImageLoaded(true), []);
  const handleShowDetailsClick = useCallback(() => {
    onShowDetails(location.id);
  }, [location.id, onShowDetails]);

  // Animación
  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -15, transition: { duration: 0.2, ease: "easeIn" } },
  };

  return (
    <MotionBox
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      boxShadow="md"
      overflow="hidden"
      height="430px" // Altura consistente
      display="flex"
      flexDirection="column"
      _hover={{
        boxShadow: "xl",
        transform: "translateY(-5px)",
      }}
      transition="all 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
    >
      {/* Sección de Imagen */}
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
            />
          </AspectRatio>
        </Skeleton>
      </Box>

      {/* Sección de Contenido */}
      <VStack
        p={5}
        align="stretch"
        spacing={3}
        flexGrow={1}
        display="flex"
        flexDirection="column"
      >
        {/* Título */}
        <Heading
          size="md"
          noOfLines={2}
          title={location.title}
          mb={1}
          color={headingColor} // Usar variable
        >
          {location.title}
        </Heading>

        {/* Badge de Categoría */}
        <Badge
          bgGradient={config.gradient || "linear(to-r, gray.400, gray.600)"}
          color="white"
          variant="solid"
          alignSelf="flex-start"
          display="inline-flex"
          alignItems="center"
          gap={1.5}
          px={2}
          py={0.5}
          borderRadius="md"
          textTransform="capitalize"
        >
          <Icon as={IconComponent} boxSize="3.5" />
          {location.category}
        </Badge>

        {/* Descripción */}
        <Text fontSize="sm" color={textColor} noOfLines={3} lineHeight="short">
          {location.description}
        </Text>

        {/* Botón de Acción */}
        <Button
          leftIcon={<FaEye />}
          onClick={handleShowDetailsClick}
          variant="ghost"
          colorScheme="yellow"
          size="sm"
          w="full"
          mt="auto"
          _hover={{
            bg: buttonHoverBg, // Usar variable
            color: buttonHoverColor, // Usar variable
          }}
          aria-label={`Ver detalles de ${location.title}`}
        >
          Ver Detalles
        </Button>
      </VStack>
    </MotionBox>
  );
};

// PropTypes
LocationCardComponent.propTypes = {
  location: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    imgSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    // Props necesarios para el modal
    mapSrc: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired, // Asumiendo que path es para Más Info
    // Añadir mapUrl si existe en los datos de fiambala para el link de mapa
  }).isRequired,
  onShowDetails: PropTypes.func.isRequired,
};

export default React.memo(LocationCardComponent);
