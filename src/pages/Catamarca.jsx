import { useState, useMemo, useCallback } from "react";
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
  Wrap,
  WrapItem,
  useBreakpointValue,
  Icon,
  Tooltip,
  Collapse,
  AspectRatio,
  chakra,
} from "@chakra-ui/react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  FaMapMarkedAlt,
  FaLandmark,
  FaTree,
  FaWater,
  FaChevronDown,
  FaMountain,
  FaInfoCircle,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { locations } from "../data/catamarca";
import React from "react";

// Componentes Motion reutilizables
const MotionBox = chakra(motion.div);
const MotionBadge = chakra(motion.div, {
  baseStyle: {
    display: "inline-flex",
    alignItems: "center",
  },
});

// Animaciones centralizadas
const animations = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  },
  scale: {
    initial: { scale: 0 },
    animate: { scale: 1 },
    hover: { scale: 1.05 },
  },
  rotate: {
    animate: { rotate: 180 },
    exit: { rotate: 0 },
  },
};

// Configuración de estilos por área
const AREA_CONFIG = {
  Centro: {
    gradient: "linear(to-r, yellow.400, green.400)",
    badge: "rgba(255, 214, 0, 0.9)",
    icon: FaLandmark,
    hover: "yellow.400",
  },
  Noroeste: {
    gradient: "linear(to-r, green.400, teal.400)",
    badge: "rgba(72, 187, 120, 0.9)",
    icon: FaTree,
    hover: "green.400",
  },
  Sureste: {
    gradient: "linear(to-r, blue.400, cyan.400)",
    badge: "rgba(66, 153, 225, 0.9)",
    icon: FaWater,
    hover: "blue.400",
  },
  Norte: {
    gradient: "linear(to-r, orange.400, yellow.400)",
    badge: "rgba(237, 137, 54, 0.9)",
    icon: FaMountain,
    hover: "orange.400",
  },
};

// Componente de imagen optimizado
const LocationImage = React.memo(({ src, alt }) => (
  <AspectRatio ratio={16 / 9}>
    <Image
      as={motion.img}
      src={src}
      alt={alt}
      objectFit="cover"
      w="full"
      h="full"
      transition="0.3s ease"
      _hover={{ transform: "scale(1.05)" }}
      loading="lazy"
      fallbackSrc="/placeholder.jpg"
    />
  </AspectRatio>
));

// Componente de filtro de área optimizado
const AreaFilter = React.memo(({ area, isSelected, onClick }) => {
  const bgColor = useColorModeValue("white", "gray.800");

  return (
    <Button
      size="md"
      variant={isSelected ? "solid" : "outline"}
      colorScheme={isSelected ? "teal" : "gray"}
      bg={isSelected ? undefined : bgColor}
      onClick={onClick}
      leftIcon={<Icon as={AREA_CONFIG[area]?.icon || FaMapMarkerAlt} />}
      _hover={{
        transform: "translateY(-2px)",
        shadow: "md",
      }}
      transition="all 0.2s"
      aria-label={`Filtrar por ${area}`}
    >
      {area}
    </Button>
  );
});

// Componente de tarjeta de ubicación
const LocationCard = React.memo(({ location, isExpanded, onToggle }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const areaConfig = AREA_CONFIG[location.area] || AREA_CONFIG.Centro;

  const handleToggle = useCallback(() => {
    onToggle(location.id);
  }, [location.id, onToggle]);

  return (
    <MotionBox
      layout
      {...animations.fadeIn}
      borderWidth="1px"
      borderRadius="xl"
      overflow="hidden"
      bg={bgColor}
      boxShadow="lg"
      _hover={{
        transform: "translateY(-8px)",
        shadow: "2xl",
      }}
      role="group"
      height={isExpanded ? "auto" : "450px"}
    >
      <Box position="relative">
        <LocationImage src={location.imgSrc} alt={location.title} />
        <MotionBadge
          position="absolute"
          top={4}
          right={4}
          px={3}
          py={1}
          borderRadius="full"
          bg={areaConfig.badge}
          color="white"
          {...animations.scale}
          whileHover={animations.scale.hover}
          backdropFilter="blur(8px)"
        >
          <Icon as={areaConfig.icon} mr={2} />
          {location.area}
        </MotionBadge>
      </Box>

      <VStack p={6} spacing={4} align="start">
        <Heading
          size="md"
          bgGradient={areaConfig.gradient}
          bgClip="text"
          _groupHover={{ transform: "translateX(4px)" }}
          transition="0.2s ease"
        >
          {location.title}
        </Heading>

        <Text
          color={textColor}
          noOfLines={isExpanded ? undefined : 3}
          cursor="pointer"
          onClick={handleToggle}
        >
          {location.description}
        </Text>

        <Collapse in={isExpanded} animateOpacity>
          <Box w="full" borderRadius="md" overflow="hidden">
            <iframe
              title={`Mapa de ${location.title}`}
              src={location.mapSrc}
              width="100%"
              height="300"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
            />
          </Box>

          <Wrap spacing={4} mt={4}>
            <WrapItem>
              <Tooltip label="Ver en Google Maps">
                <Button
                  as="a"
                  href={location.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  leftIcon={<FaMapMarkedAlt />}
                  colorScheme="blue"
                  variant="outline"
                  size="sm"
                >
                  Ver ubicación
                </Button>
              </Tooltip>
            </WrapItem>

            <WrapItem>
              <Tooltip label="Más información">
                <Button
                  as="a"
                  href={location.wiki}
                  target="_blank"
                  rel="noopener noreferrer"
                  leftIcon={<FaInfoCircle />}
                  colorScheme="teal"
                  variant="outline"
                  size="sm"
                >
                  Detalles
                </Button>
              </Tooltip>
            </WrapItem>
          </Wrap>
        </Collapse>

        <Button
          onClick={handleToggle}
          variant="ghost"
          colorScheme="teal"
          size="sm"
          width="full"
          rightIcon={
            <MotionBox
              as={Icon}
              {...(isExpanded ? animations.rotate : {})}
            >
              <FaChevronDown />
            </MotionBox>
          }
          aria-label={isExpanded ? "Ver menos" : "Ver más"}
        >
          {isExpanded ? "Ver menos" : "Ver más"}
        </Button>
      </VStack>
    </MotionBox>
  );
});

// Componente principal
const Catamarca = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [selectedArea, setSelectedArea] = useState("all");
  const bgGradient = useColorModeValue(
    "linear(to-b, gray.50, white)",
    "linear(to-b, gray.900, gray.800)"
  );
  const textColor = useColorModeValue("gray.600", "gray.300");
  const columns = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  const handleToggle = useCallback((id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  const { filteredLocations, areas } = useMemo(() => {
    const filtered =
      selectedArea === "all"
        ? locations
        : locations.filter((loc) => loc.area === selectedArea);

    const uniqueAreas = [...new Set(locations.map((loc) => loc.area))];
    return { filteredLocations: filtered, areas: uniqueAreas };
  }, [selectedArea]);

  return (
    <LayoutGroup>
      <Box bgGradient={bgGradient} minH="100vh" py={12} role="main">
        <Container maxW="7xl">
          <VStack spacing={8}>
            <MotionBox {...animations.fadeIn}>
              <VStack spacing={4} textAlign="center">
                <Badge
                  colorScheme="yellow"
                  px={4}
                  py={1}
                  borderRadius="full"
                  fontSize="sm"
                >
                  Capital Histórica
                </Badge>

                <Heading
                  as={motion.h1}
                  size="2xl"
                  bgGradient="linear(to-r, yellow.400, green.400, yellow.400)"
                  bgClip="text"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  San Fernando del Valle
                </Heading>

                <Text fontSize="xl" color={textColor} maxW="2xl">
                  Descubre los tesoros escondidos de la capital catamarqueña
                </Text>
              </VStack>
            </MotionBox>

            <Wrap justify="center" spacing={4}>
              <WrapItem>
                <AreaFilter
                  area="Todos"
                  isSelected={selectedArea === "all"}
                  onClick={() => setSelectedArea("all")}
                />
              </WrapItem>
              {areas.map((area) => (
                <WrapItem key={area}>
                  <AreaFilter
                    area={area}
                    isSelected={selectedArea === area}
                    onClick={() => setSelectedArea(area)}
                  />
                </WrapItem>
              ))}
            </Wrap>

            <SimpleGrid
              columns={columns}
              spacing={8}
              w="full"
              as={motion.div}
              layout
            >
              <AnimatePresence mode="popLayout">
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
      </Box>
    </LayoutGroup>
  );
};

export default React.memo(Catamarca);
