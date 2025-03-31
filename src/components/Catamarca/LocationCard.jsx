import React, { useState, useCallback } from "react";
import PropTypes from 'prop-types';
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  useColorModeValue,
  Image,
  AspectRatio,
  Skeleton,
  Badge, // Usaremos Badge en lugar de Box+Tooltip para el área
  Icon,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaEye } from "react-icons/fa";
import { getIconByArea } from "./icons";
import { AREA_CONFIG } from "./AreaConfig"; // Necesario para colores/iconos

const MotionBox = motion(Box);

// Componente LocationCard rehecho desde cero
const LocationCardComponent = ({ location, onShowDetails }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Colores y configuración
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const areaConfig = AREA_CONFIG[location.area] || {};
  const AreaIcon = getIconByArea(location.area);
  const buttonHoverBg = useColorModeValue("teal.50", "teal.800"); // Mover hook aquí
  const buttonHoverColor = useColorModeValue("teal.600", "teal.200"); // Mover hook aquí

  // Callbacks
  const handleImageLoad = useCallback(() => setImageLoaded(true), []);
  const handleShowDetailsClick = useCallback(() => {
    onShowDetails(location.id);
  }, [location.id, onShowDetails]);

  // Animación básica para la tarjeta
  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.2, ease: "easeIn" } },
  };

  return (
    <MotionBox
      layout // Importante para animaciones de filtro/ordenación
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg" // Bordes ligeramente menos redondeados
      boxShadow="md" // Sombra inicial más sutil
      overflow="hidden"
      height="430px" // Ajustar altura si es necesario
      display="flex"
      flexDirection="column"
      _hover={{
        boxShadow: "xl", // Sombra más pronunciada al pasar el mouse
        transform: "translateY(-5px)", // Elevación ligera
      }}
      transition="all 0.25s cubic-bezier(0.4, 0, 0.2, 1)" // Transición suave
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
      <VStack p={5} align="stretch" spacing={3} flexGrow={1} display="flex" flexDirection="column">

        {/* Título */}
        <Heading
          size="md"
          noOfLines={2}
          title={location.title} // Tooltip con título completo si se corta
          mb={1} // Margen inferior ligero
        >
          {location.title}
        </Heading>

        {/* Badge de Área */}
        <Badge
          colorScheme={areaConfig.colorScheme || "gray"} // Usar un colorScheme si está definido en AREA_CONFIG
          variant="subtle" // Variante sutil para el badge
          alignSelf="flex-start" // Alinear a la izquierda
          display="inline-flex"
          alignItems="center"
          gap={1.5}
          px={2}
          py={0.5}
          borderRadius="md"
        >
          <Icon as={AreaIcon} boxSize="3.5" />
          {location.area}
        </Badge>

        {/* Descripción */}
        <Text
          fontSize="sm"
          color={textColor}
          noOfLines={3} // Limitar a 3 líneas
          lineHeight="short" // Ajustar interlineado si es necesario
        >
          {location.description}
        </Text>

        {/* Botón de Acción */}
        <Button
          leftIcon={<FaEye />}
          onClick={handleShowDetailsClick}
          variant="ghost" // Variante fantasma para un look más limpio
          colorScheme="teal"
          size="sm"
          w="full"
          mt="auto" // Empujar al fondo
          _hover={{
             bg: buttonHoverBg, // Usar variable
             color: buttonHoverColor // Usar variable
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
    area: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    // Props necesarios para el modal (aunque no se usen directamente aquí)
    mapSrc: PropTypes.string.isRequired,
    path: PropTypes.string,
    wiki: PropTypes.string,
  }).isRequired,
  onShowDetails: PropTypes.func.isRequired,
};

// Exportar con memoización
export default React.memo(LocationCardComponent);
