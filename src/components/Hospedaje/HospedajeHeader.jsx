import { Box, Stack, Heading, Text, useColorModeValue, Icon } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaBed, FaCompass } from "react-icons/fa";

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

const HospedajeHeader = () => {
  const headingColor = useColorModeValue("gray.700", "whiteAlpha.900");
  const textColor = useColorModeValue("gray.500", "gray.400");
  const iconColor = useColorModeValue("teal.200", "teal.700");

  return (
    <Stack spacing={4} textAlign="center" position="relative" mb={6}> {/* Ajuste de espaciado y margen inferior */}
      <MotionBox
        initial={{ opacity: 0, scale: 0.8 }} // Animación inicial ajustada
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        position="relative"
        py={4} // Padding vertical
      >
        {/* Iconos de fondo más sutiles */}
        <Icon
          as={FaBed}
          position="absolute"
          top="0"
          right="15%"
          w={8} // Tamaño reducido
          h={8}
          color={iconColor}
          opacity={0.2} // Opacidad reducida
          transform="rotate(-15deg)"
        />
        <Icon
          as={FaCompass}
          position="absolute"
          bottom="0"
          left="15%"
          w={6} // Tamaño reducido
          h={6}
          color={iconColor}
          opacity={0.2} // Opacidad reducida
          transform="rotate(10deg)"
        />
        <MotionHeading
          as="h1"
          size="xl" // Tamaño ajustado
          color={headingColor} // Color sólido
          fontWeight="bold" // Peso de fuente explícito
          letterSpacing="tight"
          // whileHover eliminado para simplificar
          transition={{ duration: 0.2 }}
        >
          Encuentra tu Hospedaje Ideal
        </MotionHeading>
      </MotionBox>

      <MotionText
        fontSize="lg" // Tamaño de fuente ajustado
        color={textColor} // Color de texto más sutil
        maxW="xl" // Ancho máximo ajustado
        mx="auto"
        initial={{ opacity: 0, y: 15 }} // Animación ajustada
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }} // Delay y duración ajustados
      >
        Explora nuestra selección de alojamientos en Catamarca para una estadía perfecta.
      </MotionText>
    </Stack>
  );
};

export default HospedajeHeader;
