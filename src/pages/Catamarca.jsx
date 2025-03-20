import { useState, useMemo } from "react";
import {
  Box,
  Container,
  SimpleGrid,
  VStack,
  Heading,
  Text,
  Button,
  Badge,
  useColorModeValue,
  Image,
  HStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { locations } from "../data/catamarca";
import { FaMapMarkedAlt, FaExternalLinkAlt, FaLandmark, FaTree, FaWater, FaMountain } from "react-icons/fa";

const MotionBox = motion(Box);
const MotionBadge = motion(Badge);

const FilterButton = ({ area, isSelected, onClick }) => (
  <Button
    size="sm"
    colorScheme={isSelected ? "yellow" : "gray"}
    variant={isSelected ? "solid" : "outline"}
    onClick={onClick}
    _hover={{ transform: "translateY(-2px)" }}
    transition="all 0.2s"
  >
    {area}
  </Button>
);

const LocationFilters = ({ selectedFilter, onFilterChange }) => {
  const areas = ["Todos", "Centro", "Noroeste", "Sureste", "Norte"];
  return (
    <Wrap spacing={2} mb={6}>
      {areas.map((area) => (
        <WrapItem key={area}>
          <FilterButton
            area={area}
            isSelected={selectedFilter === area}
            onClick={() => onFilterChange(area)}
          />
        </WrapItem>
      ))}
    </Wrap>
  );
};

const LocationCard = ({ location, isExpanded, onToggle }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const IconComponent = getAreaIcon(location.area);
  
  return (
    <MotionBox
      layout="position"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, layout: { duration: 0.3 } }}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={bgColor}
      boxShadow={useColorModeValue(
        '0 4px 6px rgba(160, 174, 192, 0.6)',
        '0 4px 6px rgba(0, 0, 0, 0.4)'
      )}
      _hover={{
        transform: "translateY(-8px)",
        boxShadow: useColorModeValue(
          '0 20px 25px -5px rgba(160, 174, 192, 0.4)',
          '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
        ),
      }}
      position="relative"
      height={isExpanded ? "auto" : "450px"}
    >
      <Box position="relative">
        <Image
          src={location.imgSrc}
          alt={location.title}
          objectFit="cover"
          h="200px"
          w="full"
          transition="transform 0.3s ease"
          _hover={{ transform: "scale(1.05)" }}
        />
        <MotionBadge
          position="absolute"
          top={2}
          right={2}
          px={2}
          py={1}
          borderRadius="full"
          bg={getBadgeColor(location.area)}
          color="white"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          backdropFilter="blur(8px)"
        >
          <Box as={IconComponent} display="inline" mr={1} />
          {location.area}
        </MotionBadge>
      </Box>

      <VStack p={6} spacing={4} align="start">
        <motion.div layout="position" style={{ width: "100%" }}>
          <Heading
            size="md"
            bgGradient={getAreaGradient(location.area)}
            bgClip="text"
            fontFamily="JetBrains Mono"
            _hover={{ transform: "translateY(-2px)" }}
            transition="color 0.2s ease"
          >
            {location.title}
          </Heading>
        </motion.div>

        <Text color={useColorModeValue("gray.700", "gray.200")} fontSize="md" noOfLines={3}>
          {location.description}
        </Text>

        <HStack justify="space-between" w="full">
          <Button
            size="sm"
            colorScheme="teal"
            variant="ghost"
            onClick={() => onToggle(location.id)}
            _hover={{ transform: "scale(1.1)" }}
            transition="all 0.2s"
          >
            {isExpanded ? "Ocultar mapa" : "Ver ubicación"}
          </Button>
        </HStack>

        <AnimatePresence>
          {isExpanded && (
            <MotionBox
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              w="full"
              overflow="hidden"
            >
              <iframe
                title={location.title}
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
            </MotionBox>
          )}
        </AnimatePresence>
      </VStack>
    </MotionBox>
  );
};

// Funciones auxiliares para colores y gradientes
const getAreaGradient = (area) => {
  const gradients = {
    "Centro": "linear(to-r, yellow.400, green.500)", // Dorado y verde para arquitectura colonial y valle
    "Noroeste": "linear(to-r, green.400, teal.500)", // Verdes para vegetación abundante
    "Sureste": "linear(to-r, blue.400, green.400)", // Azul y verde para agua y vegetación
    "Norte": "linear(to-r, orange.400, yellow.400, green.400)" // Naranja, amarillo y verde para montañas
  };
  return gradients[area] || "linear(to-r, yellow.400, green.400)";
};

const getBadgeColor = (area) => {
  const colors = {
    "Centro": "rgba(218, 165, 32, 0.9)", // Dorado semi-transparente
    "Noroeste": "rgba(72, 187, 120, 0.9)", // Verde
    "Sureste": "rgba(66, 153, 225, 0.9)", // Azul
    "Norte": "rgba(237, 137, 54, 0.9)" // Naranja
  };
  return colors[area] || "rgba(237, 137, 54, 0.9)";
};

const getAreaIcon = (area) => {
  const icons = {
    "Centro": FaLandmark,
    "Noroeste": FaTree,
    "Sureste": FaWater,
    "Norte": FaMountain
  };
  return icons[area] || FaMapMarkedAlt;
};

const Catamarca = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [selectedArea, setSelectedArea] = useState("Todos");
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.600", "gray.300");

  const { filteredLocations, areas } = useMemo(() => {
    const filtered = selectedArea === "Todos" 
      ? locations 
      : locations.filter(loc => loc.area === selectedArea);
    const uniqueAreas = [...new Set(locations.map(loc => loc.area))];
    return { filteredLocations: filtered, areas: uniqueAreas };
  }, [selectedArea]);

  const handleToggle = (id) => {
    setExpandedId(currentId => currentId === id ? null : id);
  };

  return (
    <Container maxW="7xl" py={12}>
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
              Capital Provincial
            </Badge>
            <Heading
              as="h1"
              size="2xl"
              bgGradient="linear(to-r, yellow.400, green.500, yellow.400)"
              bgClip="text"
              fontFamily="JetBrains Mono"
              letterSpacing="tight"
              textAlign="center"
              fontWeight="bold"
              lineHeight="shorter"
              mb={2}
              _hover={{
                bgGradient: "linear(to-r, green.500, yellow.400, green.500)",
              }}
              transition="all 0.3s ease"
            >
              San Fernando del Valle
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

        <LocationFilters
          selectedFilter={selectedArea}
          onFilterChange={setSelectedArea}
        />

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
    </Container>
  );
};

export default Catamarca;
