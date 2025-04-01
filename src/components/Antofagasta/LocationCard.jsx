import {
  Box,
  Image,
  Badge,
  VStack,
  Heading,
  Text,
  Button,
  useColorModeValue,
  Icon,
  Skeleton,
} from "@chakra-ui/react";
import { motion } from "framer-motion"; // AnimatePresence ya no es necesario aquí
import PropTypes from 'prop-types';
const MotionBadge = motion.create(Badge);
const MotionBox = motion.create(Box);
import { categoryConfig } from "../Antofagasta/categoryConfig";
import React, { useCallback, useState } from "react";
import { animations } from "./animations";
import { FaEye } from "react-icons/fa"; // Cambiado icono del botón

// Componente LocationCard rediseñado para usar Modal (requiere lógica en el padre)
const LocationCardComponent = ({ location, onShowDetails }) => { // Eliminado isSelected, renombrado onToggle
  const [imageLoaded, setImageLoaded] = useState(false);
  const config = categoryConfig[location.categoria] || categoryConfig.Campo;
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const handleImageLoad = useCallback(() => setImageLoaded(true), []);

  // Llama a la función pasada por el padre para mostrar detalles (presumiblemente en un modal)
  const handleShowDetailsClick = useCallback(() => {
    onShowDetails(location.id); // Pasa el ID para que el padre sepa qué mostrar
  }, [location.id, onShowDetails]);

  return (
    <MotionBox
      variants={animations.item}
      layout // Mantenemos animación de layout para filtros
      initial="hidden"
      animate="show"
      exit="hidden"
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      overflow="hidden"
      bg={bgColor}
      boxShadow="md"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "xl",
      }}
      transition="all 0.2s ease-in-out"
      height="400px"
      display="flex"
      flexDirection="column"
    >
      {/* Contenedor de Imagen con Skeleton */}
      <Box position="relative" height="180px" flexShrink={0} overflow="hidden" bg={useColorModeValue("gray.100", "gray.700")}>
        <Skeleton isLoaded={imageLoaded} height="100%">
          <Image
            src={location.imgSrc}
            alt={location.title}
            objectFit="cover"
            w="full"
            h="full"
            transition="transform 0.3s ease-out"
            _hover={{ transform: "scale(1.02)" }}
            loading="lazy"
            onLoad={handleImageLoad}
          />
        </Skeleton>
        {/* Badge de Categoría */}
        <MotionBadge
          position="absolute"
          top={2}
          right={2}
          px={2}
          py={1}
          borderRadius="md"
          bgGradient={config.gradient}
          color="white"
          display="flex"
          alignItems="center"
          gap={1}
          boxShadow="sm"
          backdropFilter="blur(5px)"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Icon as={config.icon} aria-label={location.categoria} size="sm" />
          {location.categoria}
        </MotionBadge>
      </Box>

      {/* Contenido de la tarjeta */}
      <VStack p={4} align="start" spacing={2} flexGrow={1} display="flex" flexDirection="column">
        <Heading
          size="sm"
          color={useColorModeValue(config.color, `${config.color.split('.')[0]}.300`)}
          _hover={{ transform: "translateX(2px)" }}
          transition="transform 0.15s"
          noOfLines={2}
        >
          {location.title}
        </Heading>

        <Text
          fontSize="xs"
          color={useColorModeValue("gray.600", "gray.300")}
          noOfLines={3}
        >
          {location.description}
        </Text>

        {/* Botón para mostrar detalles (en Modal) */}
        <Button
          leftIcon={<FaEye/>}
          onClick={handleShowDetailsClick}
          colorScheme={config.color.split(".")[0]}
          variant="ghost"
          size="xs"
          w="full"
          mt="auto"
          _hover={{
            transform: "translateY(-1px)",
            boxShadow: "sm",
          }}
          aria-label={`Ver detalles de ${location.title}`}
        >
          Ver Detalles
        </Button>
      </VStack>
    </MotionBox>
  );
};

// Definición de PropTypes actualizada
LocationCardComponent.propTypes = {
  location: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    imgSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    categoria: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    mapSrc: PropTypes.string.isRequired, // Aún necesario para el modal
    path: PropTypes.string.isRequired,   // Aún necesario para el modal
  }).isRequired,
  // isSelected ya no se necesita aquí
  onShowDetails: PropTypes.func.isRequired, // Renombrado y requerido para abrir modal
};

// Exportar el componente memoizado
export const LocationCard = React.memo(LocationCardComponent);
