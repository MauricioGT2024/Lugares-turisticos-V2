import { useState, useMemo } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  SimpleGrid,
  Heading,
  Image,
  Select,
  Text,
  useColorModeValue,
  Link,
  VStack,
  Badge,
  Icon,
  HStack,
  Tooltip,
  Grid,
  GridItem,
  IconButton,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { locations } from "../data/catamarca";
import { FaMapMarkedAlt, FaInfoCircle, FaFilter, FaLandmark, FaTree, FaWater, FaChurch, FaMountain } from "react-icons/fa";

const MotionBox = motion(Box);

// Configuración moderna de estilos por área
const AREA_CONFIG = {
  "Centro": {
    gradient: "linear(to-br, yellow.400, green.400)",
    color: "yellow.600",
    darkColor: "yellow.300",
    icon: FaLandmark,
    description: "Centro histórico y cultural",
    shadow: "0 4px 20px -8px rgba(236, 201, 75, 0.5)"
  },
  "Noroeste": {
    gradient: "linear(to-br, green.400, teal.400)",
    color: "green.600",
    darkColor: "green.300",
    icon: FaTree,
    description: "Zona de vegetación abundante",
    shadow: "0 4px 20px -8px rgba(72, 187, 120, 0.5)"
  },
  "Sureste": {
    gradient: "linear(to-r, blue.400, green.400, blue.500)",
    color: "blue.600",
    darkColor: "blue.300",
    icon: FaWater,
    description: "Región de lagos y naturaleza"
  },
  "Norte": {
    gradient: "linear(to-r, orange.400, yellow.400, green.500)",
    color: "orange.600",
    darkColor: "orange.300",
    icon: FaMountain,
    description: "Área montañosa"
  }
};

// Animaciones
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.5 }
};

const LocationCard = ({ location, isExpanded, onToggle }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const config = AREA_CONFIG[location.area] || {
    gradient: "linear(to-br, teal.400, blue.400)",
    color: "teal.600",
    darkColor: "teal.300",
    icon: FaMapMarkedAlt,
    description: "Área general",
    shadow: "0 4px 20px -8px rgba(129, 230, 217, 0.5)"
  };
  const IconComponent = config.icon;

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      layout
    >
      <Box
        borderRadius="2xl"
        overflow="hidden"
        bg={bgColor}
        position="relative"
        height={isExpanded ? "auto" : "450px"}
        transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
        _hover={{ 
          transform: "translateY(-8px)",
          boxShadow: config.shadow
        }}
        backdropFilter="blur(8px)"
        borderWidth="1px"
        borderColor={useColorModeValue("gray.100", "gray.700")}
      >
        <Box position="relative" height="250px" overflow="hidden">
          <Image
            src={location.imgSrc}
            alt={location.title}
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
                {location.area}
              </Text>
            </HStack>
          </motion.div>
        </Box>

        <VStack p={6} spacing={2} align="stretch">
          <Heading
            size="xs"
            bgGradient={config.gradient}
            bgClip="text"
            fontFamily="JetBrains Mono"
            _hover={{ transform: "translateY(-2px)" }}
            transition="all 0.3s ease"
          >
            {location.title}
          </Heading>

          <Text 
            color={textColor}
            noOfLines={!isExpanded ? 2 : undefined}
            transition="all 0.3s ease"
            onClick={() => onToggle(location.id)}
            cursor="pointer"
            _hover={{ color: config.darkColor }}
          >
            {location.description}
          </Text>

          <Flex gap="4" justify="space-between">
            <Tooltip label={isExpanded ? "Ocultar mapa" : "Ver ubicación"}>
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
            {isExpanded && (
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
                    src={location.mapSrc}
                    title={`Mapa de ${location.title}`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  />
                </Box>

                <Link
                  href={location.wiki}
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
                    Más información
                  </Button>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </VStack>
      </Box>
    </MotionBox>
  );
};

const Catamarca = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [selectedArea, setSelectedArea] = useState("all");
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.100");

  const { filteredLocations, areas } = useMemo(() => {
    const filtered = selectedArea === "all" 
      ? locations 
      : locations.filter(loc => loc.area === selectedArea);
    const uniqueAreas = [...new Set(locations.map(loc => loc.area))];
    return { filteredLocations: filtered, areas: uniqueAreas };
  }, [selectedArea]);

  const handleToggle = (id) => {
    setExpandedId(currentId => currentId === id ? null : id);
  };

  return (
    <Box bg={bgColor} minH="100vh" py={12}>
      <Container maxW="8xl" px={{ base: 4, md: 8 }}>
        <Grid templateColumns={{ base: "1fr", lg: "250px 1fr" }} gap={8}>
          {/* Sidebar con filtros */}
          <GridItem>
            <Box
              position="sticky"
              top="20"
              bg={cardBg}
              p={6}
              borderRadius="xl"
              boxShadow="lg"
              border="1px"
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <VStack spacing={4}>
                <Heading size="md" color={textColor}>
                  Filtrar por área
                </Heading>
                <Select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  bg={cardBg}
                  icon={<FaFilter />}
                  size="lg"
                >
                  <option value="all">Todas las áreas</option>
                  {areas.map(area => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </Select>
              </VStack>
            </Box>
          </GridItem>

          {/* Contenido principal */}
          <GridItem>
            <VStack spacing={8} align="stretch">
              <motion.div {...fadeInUp}>
                <VStack spacing={4} textAlign="center" mb={8}>
                  <Badge
                    colorScheme="yellow"
                    px={4}
                    py={1}
                    borderRadius="full"
                    fontSize="sm"
                  >
                    Explora
                  </Badge>
                  <Heading
                    size="2xl"
                    bgGradient="linear(to-r, yellow.400, green.400, yellow.400)"
                    bgClip="text"
                    fontFamily="JetBrains Mono"
                    letterSpacing="tight"
                    mb={2}
                    _hover={{
                      bgGradient: "linear(to-r, green.400, yellow.400, green.400)"
                    }}
                    transition="all 0.3s ease"
                  >
                    Catamarca Capital
                  </Heading>
                  <Text
                    fontSize="xl"
                    color={textColor}
                    maxW="3xl"
                    mx="auto"
                  >
                    Descubre los tesoros escondidos de la capital catamarqueña
                  </Text>
                </VStack>
              </motion.div>

              <SimpleGrid
                columns={{ base: 1, md: 2, lg: 3 }}
                spacing={8}
                w="full"
              >
                <AnimatePresence mode="sync">
                  {filteredLocations.map((location) => (
                    <LocationCard
                      key={location.id}
                      location={location}
                      isExpanded={expandedId === location.id}
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

export default Catamarca;
