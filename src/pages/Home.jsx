import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Heading,
  Text,
  Image,
  Flex,
  Button,
  SimpleGrid,
  useColorModeValue,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const textColor = useColorModeValue("gray.700", "gray.300");
  const buttonColor = useColorModeValue("blue.500", "blue.300");
  const bgColor = useColorModeValue("gray.100", "gray.900");

  // Get current month for seasonal greeting
  const month = new Date().getMonth();
  const season =
    month >= 11 || month <= 1
      ? "verano"
      : month >= 2 && month <= 4
      ? "otoño"
      : month >= 5 && month <= 7
      ? "invierno"
      : "primavera";

  // Simulate async data fetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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

  return (
    <Box bg={bgColor} color={textColor} py={10}>
      <Box textAlign="center" mb={10}>
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
      </Box>
      {isLoading ? (
        <Flex justify="center" py={10}>
          <Spinner size="xl" />
        </Flex>
      ) : error ? (
        <Alert status="error" variant="subtle" my={4}>
          <AlertIcon />
          Error al cargar los datos: {error}
        </Alert>
      ) : (
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={8} textAlign>
          {places.map((place, index) => (
            <Box key={index} borderRadius="lg" overflow="hidden" boxShadow="md">
              <Image
                src={place.image}
                alt={place.name}
                height="250px"
                objectFit="contain"
              />
              <Box p={4}>
                <Heading as="h2" size="lg" mb={2} color={textColor}>
                  {place.name}
                </Heading>
                <Text fontSize="md" color={textColor}>
                  {place.description}
                </Text>
                <Button
                  mt={4}
                  colorScheme="blue"
                  onClick={() => (window.location.href = "provincia")}
                >
                  Aprende Más
                </Button>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      )}
      <Flex justify="center" mt={10}>
        <Button
          variant="unstyled"
          colorScheme={buttonColor}
          size="lg"
          onClick={() => (window.location.href = "provincia")}
        >
          Ver Todos Los Destinos
        </Button>
      </Flex>
    </Box>
  );
};

export default Home;
