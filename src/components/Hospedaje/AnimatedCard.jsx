import {
  Box,
  Image,
  Heading,
  Text,
  Button,
  useColorModeValue,
  Icon,
  Badge,
  VStack,
  HStack,
  Spinner,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  FaMapMarkedAlt,
  FaHotel,
  FaLocationArrow,
  FaStar,
} from "react-icons/fa";
import PropTypes from "prop-types";
import CustomModal from "../UI/CustomModal";
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

const MotionBox = motion(Box);

// Añadido colorScheme a las props con 'teal' como fallback
const AnimatedCard = ({
  image,
  title,
  description,
  iframe,
  location,
  mapUrl,
  colorScheme = "teal",
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [imageLoaded, setImageLoaded] = useState(false);

  // Colores derivados del colorScheme
  const badgeBg = useColorModeValue(`${colorScheme}.50`, `${colorScheme}.800`);
  const badgeColor = useColorModeValue(
    `${colorScheme}.800`,
    `${colorScheme}.100`
  );
  const iconColor = useColorModeValue(
    `${colorScheme}.500`,
    `${colorScheme}.300`
  );
  const buttonHoverBg = useColorModeValue(
    `${colorScheme}.600`,
    `${colorScheme}.300`
  );
  const modalButtonColorScheme = colorScheme; // Usar el mismo colorScheme para el botón del modal

  const modalFooter = (
    <>
      <Button
        as="a"
        href={mapUrl}
        isExternal
        variant="solid"
        colorScheme={modalButtonColorScheme}
        leftIcon={<FaMapMarkedAlt />}
      >
        Ver Mapa de {title}
      </Button>
      <Button
        variant="ghost"
        colorScheme={modalButtonColorScheme}
        onClick={onClose}
        ml={3}
      >
        Cerrar Mapa
      </Button>
    </>
  );

  return (
    <MotionBox
      maxW="full"
      borderRadius="2xl"
      overflow="hidden"
      bg={useColorModeValue("white", "gray.800")}
      borderWidth="1px" // Borde estándar
      borderColor={useColorModeValue("gray.200", "gray.700")}
      boxShadow="md" // Sombra más sutil
      position="relative"
      initial={{ opacity: 0, scale: 0.95 }} // Animación inicial sutil
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }} // Reducir la escala para una animación más sutil
      transition={{ duration: 0.15 }} // Reducir duración para mejor performance
      role="article" // Añadir rol para accesibilidad
      aria-label={`Hospedaje ${title}`} // Añadir aria-label
    >
      <Box position="relative" height="200px">
        {" "}
        {/* Altura de imagen ajustada */}
        <Image
          src={image}
          alt={title}
          objectFit="cover"
          width="100%"
          height="100%"
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          opacity={imageLoaded ? 1 : 0}
          transition="opacity 0.3s ease"
        />
        {!imageLoaded && (
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Spinner size="sm" color={`${colorScheme}.500`} />
          </Box>
        )}
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 100%)"
        />
        <Badge
          position="absolute"
          top={4}
          right={4}
          px={3}
          py={1}
          borderRadius="lg"
          bg={badgeBg} // Aplicar color derivado
          color={badgeColor} // Aplicar color derivado
          display="flex"
          alignItems="center"
          gap={1.5} // Espacio ajustado en badge
          boxShadow="sm" // Sombra sutil en badge
        >
          <Icon as={FaLocationArrow} /> {/* Color heredado */}
          {location}
        </Badge>
      </Box>

      <VStack p={6} spacing={4} align="stretch">
        <HStack justify="space-between">
          <Heading size="md" display="flex" alignItems="center" gap={2}>
            <Icon as={FaHotel} color={iconColor} />{" "}
            {/* Aplicar color derivado */}
            {title}
          </Heading>
          <Icon as={FaStar} color="yellow.400" />{" "}
          {/* Mantener estrella amarilla */}
        </HStack>

        <Text fontSize="md" color={useColorModeValue("gray.600", "gray.300")}>
          {description}
        </Text>

        <Button
          onClick={onOpen}
          size="md"
          colorScheme={colorScheme} // Aplicar colorScheme
          variant="solid"
          width="full"
          leftIcon={<FaMapMarkedAlt />}
          mt={2}
          _hover={{
            bg: buttonHoverBg, // Aplicar color derivado
          }}
        >
          Ver Mapa
        </Button>
      </VStack>

      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        title={`Ubicación: ${title}`}
        headerGradient={`linear(to-r, ${colorScheme}.400, ${colorScheme}.600)`}
        size="2xl"
        footer={modalFooter}
      >
        <Box height={{ base: "300px", md: "450px" }} width="100%">
          <iframe
            src={iframe}
            title={`Mapa de ${title}`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
          />
        </Box>
      </CustomModal>
    </MotionBox>
  );
};

AnimatedCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  iframe: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  colorScheme: PropTypes.string, // Añadir propType para colorScheme
  mapUrl: PropTypes.string.isRequired,
};

export default AnimatedCard;
