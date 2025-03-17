import React, { memo } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useColorModeValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { places } from "../data/home";

const MotionCard = motion(Card);

// Componente de tarjeta optimizado
const PlaceCard = memo(({ place, textColor }) => {
  return (
    <MotionCard
      maxW="sm"
      bg={useColorModeValue("gray.100", "gray.700")}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      mx={9}
      p={3}
    >
      <CardHeader py={2} px={3}>
        <Heading size="sm" color={textColor}>
          {place.name}
        </Heading>
      </CardHeader>
      <CardBody py={2} px={3}>
        <Image
          src={place.image}
          alt={place.name}
          height="150px"
          width="100%"
          objectFit="cover"
          loading="lazy"
          fallbackSrc="/placeholder.jpg"
        />
        <Text mt={2} color={textColor} fontSize="sm" noOfLines={3}>
          {place.description}
        </Text>
      </CardBody>
      <CardFooter py={2} px={3}>
        <Link to="/provincia">
          <Button colorScheme="blue" size="sm">
            Aprende Más
          </Button>
        </Link>
      </CardFooter>
    </MotionCard>
  );
});

PlaceCard.propTypes = {
  place: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  textColor: PropTypes.string.isRequired,
};

PlaceCard.displayName = "PlaceCard";

const Home = () => {
  const textColor = useColorModeValue("gray.700", "gray.300");
  const bgColor = useColorModeValue("blue.400", "gray.700");
  const [error, setError] = React.useState(null);

  const getSeason = () => {
    const month = new Date().getMonth();
    if (month >= 11 || month <= 1) return "verano";
    if (month >= 2 && month <= 4) return "otoño";
    if (month >= 5 && month <= 7) return "invierno";
    return "primavera";
  };

  return (
    <Box
      as="main"
      textAlign="center"
      color={textColor}
      mt={3}
      mb={10}
      role="main"
      aria-label="Página principal de Catamarca Turismo"
    >
      <Box
        as={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Heading as="h1" size="2xl" color={textColor}>
          ¡Bienvenidos a la Provincia de Catamarca!
        </Heading>
        <Text fontSize="xl" mt={2} color={textColor}>
          Descubre Lugares Turísticos Asombrosos de Catamarca
        </Text>
        <Text fontSize="lg" mt={1} color={textColor}>
          Estamos en temporada de {getSeason()}, el mejor momento para visitar.
        </Text>
        <Text fontSize="xl" mt={2} color={textColor}>
          Explora los destinos más hermosos de la provincia.
        </Text>
      </Box>

      {error && (
        <Alert status="error" mb={5}>
          <AlertIcon />
          {error}
        </Alert>
      )}

      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4} mx={4} mt={4}>
        {places.map((place, index) => (
          <PlaceCard key={index} place={place} textColor={textColor} />
        ))}
      </SimpleGrid>

      <Link to="/provincia">
        <Button
          mt={6}
          colorScheme="teal"
          variant="solid"
          color="white"
          bg={bgColor}
          _hover={{
            transform: "scale(1.05)",
            boxShadow: "lg",
          }}
          _active={{
            transform: "scale(0.95)",
            bg: "teal.700",
          }}
          borderRadius="md"
          px={6}
          py={3}
          aria-label="Ver más detalles sobre la provincia"
        >
          Ver Provincia
        </Button>
      </Link>
    </Box>
  );
};

export default memo(Home);
