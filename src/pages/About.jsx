// Suggested code may be subject to a license. Learn more: ~LicenseLog:1780292374.
import {
  Box,
  Heading,
  Text,
  VStack,
  Image,
  SimpleGrid,
  Link,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

const About = () => {
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Box bg={bgColor} minH="100vh" py={10} fontFamily={"JetBrains Mono"}>
      <VStack spacing={8} maxW="1200px" mx="auto" px={4}>
        <Heading as="h1" size="2xl" textAlign="center" color="teal.500">
          Acerca de Catamarca Turismo
        </Heading>

        <Text fontSize="xl" textAlign="center" color={textColor} maxW="800px">
          Bienvenido a la guía oficial de turismo de Catamarca, Argentina.
          Nuestra misión es mostrar la belleza y cultura de esta increíble
          provincia, ayudando a los visitantes a descubrir sus joyas ocultas y
          planificar su viaje perfecto.
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} w="100%">
          <Box>
            <Heading as="h2" size="lg" mb={4} color="teal.500">
              Acerca de Catamarca
            </Heading>
            <Text fontSize="lg" color={textColor}>
              Catamarca es una provincia del noroeste argentino conocida por sus
              impresionantes paisajes, rica historia y cálida hospitalidad.
              Desde las majestuosas montañas de los Andes hasta los coloridos
              festivales locales, Catamarca ofrece una experiencia única para
              cada viajero.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size="lg" mb={4} color="teal.500">
              Nuestras caracteristicas
            </Heading>
            <Text fontSize="lg" color={textColor}>
              • Guías de viaje completas
              <br />
              • Mapas interactivos y ubicaciones
              <br />
              • Recomendaciones de alojamiento
              <br />
              • Eventos y festivales locales
              <br />• Información cultural y consejos
            </Text>
          </Box>
        </SimpleGrid>

        <Box textAlign="center" mt={8}>
          <Heading as="h3" size="md" mb={4} color="teal.500">
            Web Oficial de Turismo{" "}
          </Heading>
          <Button
            as={Link}
            href="https://turismo.catamarca.gob.ar/"
            target="_blank"
            rel="noopener noreferrer"
            colorScheme="teal"
            size="lg"
          >
            Visita el sitio oficial
          </Button>
        </Box>

        <Box mt={10} w="100%">
          <Heading as="h2" size="lg" mb={6} color="teal.500" textAlign="center">
            ¿Porque visitar Catamarca?
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            <Box textAlign="center">
              <Image
                src="https://images.unsplash.com/photo-1604537529428-15bcbeecfe4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Mountains"
                borderRadius="lg"
                mb={4}
              />
              <Text fontWeight="bold" mb={2}>
                Paisajes Impresionantes
              </Text>
              <Text color={textColor}>
                Explora las impresionantes montañas de los Andes y maravillas
                naturales.
              </Text>
            </Box>

            <Box textAlign="center">
              <Image
                src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Adventure"
                borderRadius="lg"
                mb={4}
              />
              <Text fontWeight="bold" mb={2}>
                Actividades de Aventura
              </Text>
              <Text color={textColor}>
                Disfruta de senderismo, trekking y aventuras al aire libre.
              </Text>
            </Box>
          </SimpleGrid>
        </Box>
      </VStack>
    </Box>
  );
};

export default About;
