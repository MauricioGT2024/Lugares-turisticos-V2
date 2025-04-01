import {
  Box,
  Image,
  Heading,
  Text,
  Button,
  useColorModeValue,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Badge,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  FaMapMarkedAlt,
  FaHotel,
  FaLocationArrow,
  FaStar,
} from "react-icons/fa";
import PropTypes from "prop-types";

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
      whileHover={{ scale: 1.03 }} // Animación hover de escalado
      transition={{ duration: 0.2 }}
      // Se eliminó el _before para un borde más simple
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
          transition="0.3s ease"
          _groupHover={{ transform: "scale(1.05)" }}
        />
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

      {/* Modal rediseñado */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="2xl"
        isCentered
        motionPreset="slideInBottom"
      >
        <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(3px)" />
        <ModalContent
          borderRadius="xl"
          bg={useColorModeValue("white", "gray.800")}
        >
          <ModalHeader
            borderBottomWidth="1px"
            borderColor={useColorModeValue("gray.100", "gray.700")}
          >
            Ubicación: {title}
          </ModalHeader>
          <ModalCloseButton _focus={{ boxShadow: "none" }} />
          <ModalBody p={0}>
            <Box height={{ base: "300px", md: "450px" }} width="100%">
              {" "}
              {/* Altura responsiva */}
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
          </ModalBody>
          <ModalFooter
            borderTopWidth="1px"
            borderColor={useColorModeValue("gray.100", "gray.700")}
          >
            {/* Botón del modal también usa el colorScheme */}
            <Button
              as="a"
              href={mapUrl}
              isExternal
              variant="solid"
              colorScheme={modalButtonColorScheme}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver Mapa de {title}
            </Button>
            <Button
              variant="ghost"
              colorScheme={modalButtonColorScheme}
              onClick={onClose}
            >
              Cerrar Mapa
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
