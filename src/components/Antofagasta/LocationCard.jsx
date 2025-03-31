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
      borderRadius="xl"
      overflow="hidden"
      bg={bgColor}
      boxShadow="lg"
      _hover={{
        transform: "translateY(-8px)",
        boxShadow: "2xl",
      }}
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      // Altura fija para consistencia antes de la interacción
      height="420px"
      display="flex"
      flexDirection="column" // Asegura que el VStack ocupe el espacio
    >
      {/* Contenedor de Imagen con Skeleton */}
      <Box position="relative" height="200px" flexShrink={0} overflow="hidden" bg={useColorModeValue("gray.100", "gray.700")}>
        <Skeleton isLoaded={imageLoaded} height="100%">
          <Image
            src={location.imgSrc}
            alt={location.title}
            objectFit="cover"
            w="full"
            h="full"
            transition="transform 0.5s ease-out"
            _hover={{ transform: "scale(1.05)" }}
            loading="lazy"
            onLoad={handleImageLoad}
          />
        </Skeleton>
        {/* Badge de Categoría */}
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
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Icon as={config.icon} aria-label={location.categoria} />
          {location.categoria}
        </MotionBadge>
      </Box>

      {/* Contenido de la tarjeta */}
      {/* Usamos flexGrow para que ocupe el espacio restante y mt="auto" en el botón */}
      <VStack p={6} align="start" spacing={3} flexGrow={1} display="flex" flexDirection="column">
        <Heading
          size="md"
          color={useColorModeValue(config.color, `${config.color.split('.')[0]}.300`)}
          _hover={{ transform: "translateX(4px)" }}
          transition="transform 0.2s"
          noOfLines={2} // Permitir dos líneas para títulos largos
        >
          {location.title}
        </Heading>

        <Text
          fontSize="sm"
          color={useColorModeValue("gray.600", "gray.300")}
          noOfLines={4} // Limita líneas de descripción en la tarjeta
        >
          {location.description}
        </Text>

        {/* Botón para mostrar detalles (en Modal) */}
        <Button
          leftIcon={<FaEye />} // Icono cambiado
          onClick={handleShowDetailsClick} // Llama a la nueva función
          colorScheme={config.color.split(".")[0]}
          variant="outline"
          size="sm"
          w="full"
          mt="auto" // Empuja el botón al final del VStack
          _hover={{
            transform: "translateY(-2px)",
            boxShadow: "md",
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
