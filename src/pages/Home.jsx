import React from "react";
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

const Home = () => {
  const places = [
    {
      name: "Valle Viejo, Catamarca",
      image: "/img/Valle-Chico/Capital.webp",
      description:
        "Valle Viejo es una ciudad encantadora en la provincia de Catamarca, Argentina, conocida por sus hermosos paisajes, rica historia y cultura vibrante.",
    },
    {
      name: "Amérian Catamarca Park Hotel",
      image: "/img/Hospedaje/Amérian Catamarca Park Hotel.webp",
      description:
        "El Amérian Catamarca Park Hotel es un lujoso hotel ubicado en Catamarca. Ofrece habitaciones elegantes, un restaurante gourmet y una piscina en la azotea con vistas panorámicas de la ciudad.",
    },
    {
      name: "Quebrada Las Angosturas",
      image: "/img/Tinogasta/Quebrada Las Angosturas.webp",
      description:
        "La Quebrada de las Angosturas en Tinogasta, Catamarca, es un impresionante cañón con formaciones rocosas únicas y paisajes desérticos espectaculares.",
    },
  ];

  const textColor = useColorModeValue("gray.700", "gray.300");
  const bgColor = useColorModeValue("blue.400", "gray.700");

  const month = new Date().getMonth();
  const season =
    month >= 11 || month <= 1
      ? "verano"
      : month >= 2 && month <= 4
      ? "otoño"
      : month >= 5 && month <= 7
      ? "invierno"
      : "primavera";

  const [error, setError] = React.useState(null);
  return (
    <Box textAlign="center" color={textColor} mt={3} mb={10}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Heading as="h1" size="2xl" color={textColor}>
          ¡Bienvenidos a la Provincia de Catamarca!
        </Heading>
        <Text fontSize="xl" mt={2} color={textColor}>
          Descubre Lugares Turísticos Asombrosos de Catamarca
        </Text>
        <Text fontSize="lg" mt={1} color={textColor}>
          Estamos en temporada de {season}, el mejor momento para visitar.
        </Text>
        <Text fontSize="xl" mt={2} color={textColor}>
          Explora los destinos más hermosos de la provincia.
        </Text>
      </motion.div>

      {error && (
        <Alert status="error" mb={5}>
          <AlertIcon />
          {error}
        </Alert>
      )}
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={8} mx={6} mt={5}>
        {places.map((place, index) => (
          <Card
            key={index}
            maxW="sm"
            bg={useColorModeValue("gray.100", "gray.700")}
          >
            <CardHeader>
              <Heading size="md" color={textColor}>
                {place.name}
              </Heading>
            </CardHeader>
            <CardBody>
              <Image
                src={place.image}
                alt={place.name}
                height="200px"
                width="100%"
                objectFit="cover"
              />
              <Text mt={2} color={textColor}>
                {place.description}
              </Text>
            </CardBody>
            <CardFooter>
              <Button
                colorScheme="blue"
                onClick={() => (window.location.href = "provincia")}
              >
                Aprende Más
              </Button>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>
      <Button
        mt={6}
        colorScheme="teal"
        variant="link"
        color="white"
        bg={bgColor}
        _hover={{
          bg: {
            teal: "teal.600",
          },
          transform: "scale(1.05)",
          transition: "all 0.2s ease",
        }}
        _active={{
          bg: "teal.700",
        }}
        borderRadius="md"
        px={6}
        py={3}
        onClick={() => {
          window.location.href = "provincia";
        }}
      >
        Ver Provincia
      </Button>
    </Box>
  );
};

export default Home;
