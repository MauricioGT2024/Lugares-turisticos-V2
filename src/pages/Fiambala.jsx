import { useState, useMemo } from "react";
import {
  Box,
  Container,
  Grid,
  GridItem,
  SimpleGrid,
  VStack,
  Heading,
  Text,
  Button,
  Badge,
  useColorModeValue,
  Image,
  Select,
  HStack,
  Icon
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMountain, FaMapMarkedAlt, FaExternalLinkAlt, FaFilter, FaUmbrellaBeach, FaLandmark, FaArchway, FaSun } from "react-icons/fa";
import { locations } from "../data/fiambala";

// Configuración de estilos por categoría
const CATEGORY_CONFIG = {
  "Desierto": {
    gradient: "linear(to-r, yellow.400, orange.400)",
    color: "yellow.600",
    darkColor: "yellow.300",
    icon: FaSun
  },
  "Cultura": {
    gradient: "linear(to-r, purple.400, pink.400)",
    color: "purple.600",
    darkColor: "purple.300",
    icon: FaArchway
  },
  "Termas": {
    gradient: "linear(to-r, blue.400, cyan.400)",
    color: "blue.600",
    darkColor: "blue.300",
    icon: FaUmbrellaBeach
  },
  "Mirador": {
    gradient: "linear(to-r, green.400, teal.400)",
    color: "green.600",
    darkColor: "green.300",
    icon: FaMountain
  },
  "Montañas": {
    gradient: "linear(to-r, gray.600, blue.400)",
    color: "gray.600",
    darkColor: "gray.300",
    icon: FaMountain
  },
  "Centro": {
    gradient: "linear(to-r, yellow.400, red.400)",
    color: "yellow.600",
    darkColor: "yellow.300",
    icon: FaLandmark
  }
};

const LocationCard = ({ location, isSelected, onToggle }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const config = CATEGORY_CONFIG[location.category] || {
    gradient: "linear(to-r, teal.400, blue.400)",
    color: "teal.600",
    darkColor: "teal.300",
    icon: FaMapMarkedAlt
  };
  const IconComponent = config.icon;

  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        borderRadius="xl"
        overflow="hidden"
        bg={bgColor}
        boxShadow="xl"
        _hover={{ 
          transform: "translateY(-8px)",
          boxShadow: "2xl",
        }}
        height={isSelected ? "auto" : "500px"}
        transition="all 0.3s"
      >
        <Box position="relative" height="300px" overflow="hidden">
          <Image
            src={location.imgSrc}
            alt={location.title}
            objectFit="cover"
            w="100%"
            h="100%"
            transition="transform 0.5s"
            _hover={{ transform: "scale(1.05)" }}
          />
          <HStack
            position="absolute"
            top="4"
            right="4"
            spacing="2"
            bgGradient={config.gradient}
            color="white"
            borderRadius="full"
            px="3"
            py="1"
            backdropFilter="blur(8px)"
          >
            <IconComponent />
            <Text fontSize="sm" fontWeight="medium">
              {location.category}
            </Text>
          </HStack>
        </Box>

        <VStack p={6} spacing={4} align="start">
          <motion.div layout="position" style={{ width: "100%" }}>
            <Heading
              size="md"
              color={config.color}
              fontFamily="JetBrains Mono"
              _hover={{ color: config.darkColor }}
              transition="color 0.2s ease"
            >
              {location.title}
            </Heading>
          </motion.div>
          
          <motion.div layout="position" style={{ width: "100%" }}>
            <Text
              fontSize="sm"
              color={textColor}
              noOfLines={!isSelected ? 3 : undefined}
              transition="all 0.3s ease"
              onClick={() => onToggle(location.id)}
              cursor="pointer"
              _hover={{ color: config.darkColor }}
            >
              {location.description}
            </Text>
          </motion.div>

          <motion.div layout="position" style={{ width: "100%" }}>
            <Button
              leftIcon={<FaMapMarkedAlt />}
              colorScheme="yellow"
              variant="outline"
              onClick={() => onToggle(location.id)}
              w="full"
              _hover={{
                transform: "translateY(-2px)",
                bg: "yellow.50",
                borderColor: "yellow.400"
              }}
            >
              {isSelected ? "Ver menos" : "Ver más"}
            </Button>
          </motion.div>

          <AnimatePresence mode="wait">
            {isSelected && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                style={{ width: "100%" }}
              >
                <iframe
                  title={`Mapa de ${location.title}`}
                  src={location.mapSrc}
                  width="100%"
                  height="300"
                  style={{ border: 0, borderRadius: "8px" }}
                  allowFullScreen
                  loading="lazy"
                />
                
                <Button
                  as="a"
                  href={location.path}
                  target="_blank"
                  rightIcon={<FaExternalLinkAlt />}
                  colorScheme="blue"
                  variant="ghost"
                  mt={4}
                  w="full"
                >
                  Más información
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </VStack>
      </Box>
    </motion.div>
  );
};

const Fiambala = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("");
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");
  
  const categories = Object.keys(CATEGORY_CONFIG);

  const handleToggle = (id) => {
    setSelectedId(selectedId === id ? null : id);
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
              bg={cardBg}
              p={6}
              borderRadius="xl"
              boxShadow="lg"
              border="1px"
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <VStack spacing={4}>
                <Heading size="md" color={textColor}>
                  Filtrar por categoría
                </Heading>
                <Select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  bg={cardBg}
                  icon={<Icon as={FaFilter} />}
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
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8,
                  type: "spring",
                  bounce: 0.4
                }}
              >
                <VStack spacing={4} textAlign="center" mb={8}>
                  <Badge
                    colorScheme="yellow"
                    px={4}
                    py={1}
                    borderRadius="full"
                    fontSize="sm"
                    bg="yellow.400"
                    color="white"
                  >
                    Explora Fiambalá
                  </Badge>
                  <Heading
                    as="h1"
                    size="2xl"
                    bgGradient="linear(to-r, yellow.400, orange.400, red.500)"
                    bgClip="text"
                    fontFamily="JetBrains Mono"
                    letterSpacing="tight"
                    mb={2}
                    position="relative"
                    sx={{
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: "-2px",
                        left: "0",
                        width: "100%",
                        height: "2px",
                        bgGradient: "linear(to-r, yellow.400, orange.400, red.500)",
                        transform: "scaleX(0)",
                        opacity: 0,
                        transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
                        transformOrigin: "left"
                      },
                      "&:hover::after": {
                        transform: "scaleX(1)",
                        opacity: 1
                      }
                    }}
                  >
                    Fiambalá
                  </Heading>
                  <Text
                    fontSize="xl"
                    color={textColor}
                    maxW="3xl"
                    mx="auto"
                    fontStyle="italic"
                    as={motion.p}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    Donde el desierto se encuentra con las termas, creando un oasis de aventura y relax
                    en el corazón de Catamarca
                  </Text>
                </VStack>
              </motion.div>

              <SimpleGrid
                columns={{ base: 1, lg: 2, xl: 3 }}
                spacing={8}
                as={motion.div}
                layout
              >
                <AnimatePresence mode="sync">
                  {filteredLocations.map((loc) => (
                    <LocationCard
                      key={loc.id}
                      location={loc}
                      isSelected={selectedId === loc.id}
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

export default Fiambala;
