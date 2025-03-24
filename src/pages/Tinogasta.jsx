import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  Image,
  Select,
  Text,
  useColorModeValue,
  Link,
  SimpleGrid,
  VStack,
  Badge,
  IconButton,
  Tooltip,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMapMarkedAlt, FaInfoCircle, FaFilter, FaMountain, FaWater, FaChurch, FaTree, FaBook, FaCampground, FaBinoculars } from "react-icons/fa";
import { locations } from "../data/tinogasta";

// Configuración de estilos moderna por categoría
const CATEGORY_CONFIG = {
  "Plazas": {
    gradient: "linear(to-br, green.400, teal.400)",
    color: "green.600",
    darkColor: "green.300",
    icon: FaTree,
    shadow: "0 4px 20px -8px rgba(104, 211, 145, 0.5)"
  },
  "Iglesias": {
    gradient: "linear(to-br, purple.400, blue.400)",
    color: "purple.600",
    darkColor: "purple.300",
    icon: FaChurch,
    shadow: "0 4px 20px -8px rgba(159, 122, 234, 0.5)"
  },
  "Museos": {
    gradient: "linear(to-r, yellow.400, orange.400)",
    color: "yellow.600", 
    darkColor: "yellow.300",
    icon: FaBook
  },
  "Balnearios": {
    gradient: "linear(to-r, cyan.400, blue.400)",
    color: "cyan.600",
    darkColor: "cyan.300", 
    icon: FaWater
  },
  "Naturaleza": {
    gradient: "linear(to-r, green.400, yellow.400)",
    color: "green.600",
    darkColor: "green.300",
    icon: FaMountain
  },
  "Camping": {
    gradient: "linear(to-r, green.400, brown.400)",
    color: "green.600",
    darkColor: "green.300",
    icon: FaCampground
  },
  "Miradores": {
    gradient: "linear(to-r, blue.400, purple.400)",
    color: "blue.600",
    darkColor: "blue.300",
    icon: FaBinoculars
  }
};

// Animaciones
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.5 }
};

const LocationCard = ({ location, isOpen, onToggle }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const config = CATEGORY_CONFIG[location.category] || {
    gradient: "linear(to-br, teal.400, blue.400)",
    color: "teal.600",
    darkColor: "teal.300",
    icon: FaMapMarkedAlt,
    shadow: "0 4px 20px -8px rgba(129, 230, 217, 0.5)"
  };
  const IconComponent = config.icon;

  return (
    <motion.div 
      layout 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Box
        borderRadius="2xl"
        overflow="hidden"
        bg={bgColor}
        position="relative"
        height={isOpen ? "auto" : "500px"}
        transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
        _hover={{ 
          transform: "translateY(-8px)",
          boxShadow: config.shadow
        }}
        backdropFilter="blur(8px)"
        borderWidth="1px"
        borderColor={useColorModeValue("gray.100", "gray.700")}
      >
        <Box position="relative" height="300px" overflow="hidden">
          <Image
            src={location.imgSrc}
            alt={location.name}
            objectFit="cover"
            w="100%"
            h="100%"
            transition="transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
            _hover={{ transform: "scale(1.08)" }}
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <HStack
              position="absolute"
              top="4"
              right="4"
              spacing="2"
              bgGradient={config.gradient}
              color="white"
              borderRadius="full"
              px="4"
              py="2"
              backdropFilter="blur(12px)"
              boxShadow="lg"
            >
              <IconComponent />
              <Text fontSize="sm" fontWeight="bold">
                {location.category}
              </Text>
            </HStack>
          </motion.div>
        </Box>

        <VStack p="6" align="stretch" spacing="4">
          <Heading
            size="md"
            bgGradient={config.gradient}
            bgClip="text"
            fontFamily="JetBrains Mono"
            _hover={{ transform: "translateY(-2px)" }}
            transition="all 0.3s ease"
          >
            {location.name}
          </Heading>

          <Text color={textColor} fontSize="md" noOfLines={3}>
            {location.description}
          </Text>

          <Flex gap="4" justify="space-between">
            <Tooltip label={isOpen ? "Ocultar mapa" : "Ver ubicación"}>
              <IconButton
                icon={<FaMapMarkedAlt />}
                colorScheme="teal"
                variant="ghost"
                onClick={() => onToggle(location.id)}
                aria-label="Toggle map"
                size="lg"
                isRound
                _hover={{ 
                  transform: "scale(1.1)",
                  bgGradient: config.gradient,
                  color: "white"
                }}
              />
            </Tooltip>
          </Flex>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Box
                  mt="4"
                  borderRadius="xl"
                  overflow="hidden"
                  height="300px"
                  boxShadow="inner"
                >
                  <iframe
                    src={location.mapUrl}
                    title={`Mapa de ${location.name}`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  />
                </Box>
                
                <Link
                  href={location.path}
                  isExternal
                  style={{ textDecoration: "none" }}
                  display="block"
                  mt={4}
                >
                  <Button
                    leftIcon={<FaInfoCircle />}
                    width="full"
                    size="lg"
                    bgGradient={config.gradient}
                    color="white"
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: config.shadow
                    }}
                    transition="all 0.3s ease"
                  >
                    Más detalles
                  </Button>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </VStack>
      </Box>
    </motion.div>
  );
};

LocationCard.propTypes = {
  location: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    mapUrl: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

const Tinogasta = () => {
  const [openLocationId, setOpenLocationId] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("");
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.100");
  
  const categories = Object.keys(CATEGORY_CONFIG);

  const handleToggle = (id) => {
    setOpenLocationId((prevId) => (prevId === id ? null : id));
  };

  const filteredLocations = useMemo(
    () => categoryFilter
      ? locations.filter((loc) => loc.category === categoryFilter)
      : locations,
    [categoryFilter]
  );

  return (
    <Box bg={bgColor} minH="100vh" py={12}>
      <Container maxW="8xl" px={{ base: 4, md: 8 }}>
        <Grid templateColumns={{ base: "1fr", lg: "250px 1fr" }} gap={8}>
          <GridItem>
            <Box
              position="sticky"
              top="20"
              bg={useColorModeValue("white", "gray.800")}
              p={6}
              borderRadius="xl"
              boxShadow="lg"
              backdropFilter="blur(12px)"
              borderWidth="1px"
              borderColor={useColorModeValue("gray.100", "gray.700")}
            >
              <VStack spacing={4}>
                <Heading size="md" color={textColor}>
                  Filtrar por categoría
                </Heading>
                <Select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  bg={cardBg}
                  icon={<FaFilter />}
                  size="lg"
                >
                  <option value="">Todas las categorías</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </Select>
              </VStack>
            </Box>
          </GridItem>

          <GridItem>
            <VStack spacing={8} align="stretch">
              <motion.div {...fadeInUp}>
                <VStack spacing={4} textAlign="center" mb={8}>
                  <Badge
                    colorScheme="purple"
                    px={4}
                    py={1}
                    borderRadius="full"
                    fontSize="sm"
                  >
                    Explora Tinogasta
                  </Badge>
                  <Heading
                    as="h1"
                    size="2xl"
                    bgGradient="linear(to-r, purple.400, red.400, orange.400)"
                    bgClip="text"
                    fontFamily="JetBrains Mono"
                    letterSpacing="tight"
                    mb={2}
                    _hover={{
                      bgGradient: "linear(to-r, red.400, orange.400, purple.400)"
                    }}
                    transition="all 0.3s ease"
                  >
                    Tinogasta
                  </Heading>
                  <Text
                    fontSize="xl"
                    color={textColor}
                    maxW="3xl"
                    mx="auto"
                  >
                    Descubre Tinogasta, una joya en el oeste de Catamarca, donde la tradición 
                    vitivinícola se une con paisajes impresionantes y una rica historia cultural.
                  </Text>
                </VStack>
              </motion.div>

              <SimpleGrid
                columns={{ base: 1, lg: 2, xl: 3 }}
                spacing={8}
                as={motion.div}
                layout
              >
                <AnimatePresence mode="wait">
                  {filteredLocations.map((location) => (
                    <LocationCard
                      key={location.id}
                      location={location}
                      isOpen={openLocationId === location.id}
                      onToggle={handleToggle}
                    />
                  ))}
                </AnimatePresence>
              </SimpleGrid>
            </VStack>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default Tinogasta;
