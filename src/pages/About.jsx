import React from "react";
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
  Icon,
  Container,
  Divider,
  Badge,
  HStack,
  Tooltip,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { 
  FaMapMarkedAlt, 
  FaBook, 
  FaHiking, 
  FaHotel, 
  FaCalendarAlt, 
  FaInfoCircle,
  FaExternalLinkAlt 
} from "react-icons/fa";

const FeatureCard = ({ icon, title, description }) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const iconBg = useColorModeValue("teal.100", "teal.900");

  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.95 }}
    >
      <Box
        bg={cardBg}
        p={6}
        borderRadius="xl"
        boxShadow="lg"
        position="relative"
        overflow="hidden"
      >
        <Box
          bg={iconBg}
          w={12}
          h={12}
          borderRadius="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
          mb={4}
        >
          <Icon as={icon} w={6} h={6} color="teal.500" />
        </Box>
        <Heading size="md" mb={3} color="teal.500">
          {title}
        </Heading>
        <Text fontSize="md" color={useColorModeValue("gray.600", "gray.300")}>
          {description}
        </Text>
      </Box>
    </motion.div>
  );
};

const ImageCard = ({ image, title, description }) => {
  const cardBg = useColorModeValue("white", "gray.800");
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Box
        bg={cardBg}
        borderRadius="2xl"
        overflow="hidden"
        boxShadow="lg"
      >
        <Box position="relative" height="250px">
          <Image
            src={image}
            alt={title}
            objectFit="cover"
            w="100%"
            h="100%"
            transition="transform 0.3s"
            _hover={{ transform: "scale(1.1)" }}
          />
          <Badge
            position="absolute"
            top="4"
            right="4"
            colorScheme="teal"
            fontSize="sm"
            px="3"
            py="1"
            borderRadius="full"
          >
            Explorar
          </Badge>
        </Box>
        <Box p={6}>
          <Heading size="md" mb={2}>
            {title}
          </Heading>
          <Text color={useColorModeValue("gray.600", "gray.300")}>
            {description}
          </Text>
        </Box>
      </Box>
    </motion.div>
  );
};

const About = () => {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.600", "gray.300");
  
  const features = [
    {
      icon: FaBook,
      title: "Guías Completas",
      description: "Información detallada y actualizada sobre destinos turísticos.",
    },
    {
      icon: FaMapMarkedAlt,
      title: "Mapas Interactivos",
      description: "Ubicaciones precisas y rutas recomendadas para tu viaje.",
    },
    {
      icon: FaHotel,
      title: "Alojamiento",
      description: "Las mejores opciones de hospedaje para cada presupuesto.",
    },
    {
      icon: FaCalendarAlt,
      title: "Eventos Locales",
      description: "Calendario actualizado de festivales y eventos culturales.",
    },
    {
      icon: FaHiking,
      title: "Actividades",
      description: "Experiencias únicas y aventuras al aire libre.",
    },
    {
      icon: FaInfoCircle,
      title: "Información Cultural",
      description: "Historia, tradiciones y consejos para viajeros.",
    },
  ];

  return (
    <Box bg={bgColor} minH="100vh" py={12}>
      <Container maxW="7xl">
        <VStack spacing={12}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <VStack spacing={4} textAlign="center" mb={8}>
              <Heading
                as="h1"
                size="2xl"
                bgGradient="linear(to-r, teal.400, blue.500)"
                bgClip="text"
                letterSpacing="tight"
              >
                Acerca de Catamarca Turismo
              </Heading>
              <Text fontSize="xl" color={textColor} maxW="2xl">
                Tu guía definitiva para explorar las maravillas de Catamarca.
                Descubre paisajes impresionantes, rica cultura y experiencias únicas.
              </Text>
            </VStack>
          </motion.div>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="full">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </SimpleGrid>

          <Divider my={8} />

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} w="full">
            <ImageCard
              image="https://images.unsplash.com/photo-1604537529428-15bcbeecfe4d"
              title="Paisajes Majestuosos"
              description="Explora las impresionantes montañas de los Andes y descubre maravillas naturales únicas."
            />
            <ImageCard
              image="https://images.unsplash.com/photo-1503220317375-aaad61436b1b"
              title="Aventuras Sin Límites"
              description="Vive experiencias inolvidables con actividades al aire libre y deportes de aventura."
            />
          </SimpleGrid>

          <Box textAlign="center" mt={8}>
            <Heading as="h3" size="lg" mb={6} color="teal.500">
              ¿Listo para explorar?
            </Heading>
            <HStack spacing={4} justify="center">
              <Tooltip label="Visita el sitio oficial">
                <Button
                  as={Link}
                  href="https://turismo.catamarca.gob.ar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  colorScheme="teal"
                  size="lg"
                  rightIcon={<FaExternalLinkAlt />}
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "lg",
                  }}
                >
                  Sitio Oficial
                </Button>
              </Tooltip>
            </HStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default About;
