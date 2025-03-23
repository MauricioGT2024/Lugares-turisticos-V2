import { useState, useMemo, useCallback, useEffect } from "react";
import React from "react";
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
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaMountain,
  FaMapMarkedAlt,
  FaWater,
  FaCity,
  FaRegCompass,
  FaInfoCircle,
  FaChevronDown,
} from "react-icons/fa";
import { location } from "../data/antofagasta";

// Centralizar animaciones
const animations = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  },
};

// Componentes Motion reutilizables
const MotionBox = motion(Box);
const MotionBadge = motion(Badge);

const categoryConfig = {
  Volcan: {
    icon: FaMountain,
    gradient: "linear(to-r, red.400, orange.400)",
    color: "red.500",
  },
  Laguna: {
    icon: FaWater,
    gradient: "linear(to-r, blue.400, cyan.400)",
    color: "blue.500",
  },
  Capital: {
    icon: FaCity,
    gradient: "linear(to-r, purple.400, pink.400)",
    color: "purple.500",
  },
  Campo: {
    icon: FaRegCompass,
    gradient: "linear(to-r, green.400, teal.400)",
    color: "green.500",
  },
  Salar: {
    icon: FaWater,
    gradient: "linear(to-r, cyan.400, blue.400)",
    color: "cyan.500",
  },
};

// Componente FilterButton memoizado
const FilterButton = React.memo(({ category, isSelected, onClick }) => (
  <Button
    size="sm"
    colorScheme={isSelected ? "teal" : "gray"}
    variant={isSelected ? "solid" : "outline"}
    onClick={onClick}
    _hover={{ transform: "translateY(-2px)" }}
    transition="all 0.2s"
    aria-label={`Filtrar por ${category}`}
  >
    {category}
  </Button>
));

// Componente LocationCard memoizado
const LocationCard = React.memo(({ location, isSelected, onToggle }) => {
  const config = categoryConfig[location.categoria] || categoryConfig.Campo;
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const handleToggleMap = useCallback(() => {
    onToggle(location.id);
  }, [location.id, onToggle]);

  return (
    <MotionBox
      variants={animations.item}
      layout
      height={isSelected ? "auto" : "450px"}
      initial="hidden"
      animate="show"
      exit="hidden"
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="xl"
      overflow="hidden"
      bg={bgColor}
      boxShadow="lg"
      _hover={{
        transform: "translateY(-8px)",
        boxShadow: "2xl",
      }}
      transition="all 0.3s"
    >
      <Box position="relative" height="250px" overflow="hidden">
        <Image
          src={location.imgSrc}
          alt={location.title}
          objectFit="cover"
          w="full"
          h="full"
          transition="transform 0.5s"
          _hover={{ transform: "scale(1.1)" }}
          loading="lazy"
        />
        <MotionBadge
          position="absolute"
          top={4}
          right={4}
          px={3}
          py={1}
          borderRadius="full"
          bgGradient={config.gradient}
          color="white"
          display="flex"
          alignItems="center"
          gap={2}
          boxShadow="md"
          backdropFilter="blur(8px)"
        >
          <Icon as={config.icon} aria-label={location.categoria} />
          {location.categoria}
        </MotionBadge>
      </Box>

      <VStack p={6} align="start" spacing={4}>
        <Heading
          size="md"
          color={config.color}
          _hover={{ transform: "translateX(4px)" }}
          transition="transform 0.2s"
        >
          {location.title}
        </Heading>

        <Text
          fontSize="sm"
          color={useColorModeValue("gray.600", "gray.300")}
          noOfLines={isSelected ? undefined : 2}
        >
          {location.description}
        </Text>

        <AnimatePresence>
          {isSelected && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              style={{ width: "100%" }}
            >
              <Box
                as="iframe"
                title={location.title}
                src={location.mapSrc}
                width="100%"
                height="300px"
                borderRadius="lg"
                border="none"
                mt={4}
                loading="lazy"
              />

              <Wrap spacing={4} mt={4}>
                <WrapItem>
                  <Tooltip label="Ver en Google Maps" hasArrow>
                    <Button
                      as="a"
                      href={location.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      leftIcon={<FaMapMarkedAlt />}
                      colorScheme="blue"
                      variant="outline"
                      size="sm"
                      _hover={{
                        transform: "translateY(-2px)",
                        boxShadow: "md",
                      }}
                    >
                      Ver ubicación
                    </Button>
                  </Tooltip>
                </WrapItem>

                <WrapItem>
                  <Tooltip label="Más información" hasArrow>
                    <Button
                      as="a"
                      href={location.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      leftIcon={<FaInfoCircle />}
                      colorScheme="teal"
                      variant="outline"
                      size="sm"
                      _hover={{
                        transform: "translateY(-2px)",
                        boxShadow: "md",
                      }}
                    >
                      Detalles
                    </Button>
                  </Tooltip>
                </WrapItem>
              </Wrap>
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          leftIcon={<FaMapMarkedAlt />}
          onClick={handleToggleMap}
          colorScheme={config.color.split(".")[0]}
          variant="outline"
          size="sm"
          w="full"
          _hover={{
            transform: "translateY(-2px)",
            boxShadow: "md",
          }}
          rightIcon={
            <Icon
              as={FaChevronDown}
              transform={isSelected ? "rotate(180deg)" : undefined}
              transition="0.2s ease"
            />
          }
          aria-label={isSelected ? "Ocultar mapa" : "Ver ubicación"}
        >
          {isSelected ? "Ver menos" : "Ver más"}
        </Button>
      </VStack>
    </MotionBox>
  );
});

const Antofagasta = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [filter, setFilter] = useState("Todos");
  const bgColor = useColorModeValue("gray.50", "gray.900");

  const columns = useBreakpointValue({
    base: 1,
    md: 2,
    lg: 3,
    xl: 4,
  });

  const categories = useMemo(
    () => ["Todos", ...new Set(location.map((loc) => loc.categoria))],
    []
  );

  const filteredLocations = useMemo(
    () =>
      filter === "Todos"
        ? location
        : location.filter((loc) => loc.categoria === filter),
    [filter]
  );

  const handleToggle = useCallback((id) => {
    setSelectedId((prev) => (prev === id ? null : id));
  }, []);

  useEffect(() => {
    setSelectedId(null); // Reset selection when filter changes
  }, [filter]);

  return (
    <Box bg={bgColor} minH="100vh" py={12}>
      <Container maxW="7xl">
        <VStack spacing={8} align="stretch">
          {/* Header section */}
          <MotionBox
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <VStack spacing={4} textAlign="center" mb={8}>
              <Badge
                colorScheme="orange"
                px={4}
                py={1}
                borderRadius="full"
                fontSize="md"
              >
                Explora la Puna
              </Badge>

              <Heading
                as="h1"
                size="2xl"
                bgGradient="linear(to-r, orange.400, yellow.400, red.400)"
                bgClip="text"
                letterSpacing="tight"
                mb={2}
              >
                Antofagasta de la Sierra
              </Heading>

              <Text
                fontSize="xl"
                color={useColorModeValue("gray.600", "gray.300")}
                maxW="2xl"
                mx="auto"
              >
                Donde el desierto de altura se encuentra con volcanes milenarios
                y salares brillantes, creando paisajes únicos en la Puna
                catamarqueña
              </Text>
            </VStack>
          </MotionBox>

          {/* Filters */}
          <Wrap spacing={2} justify="center">
            {categories.map((category) => (
              <WrapItem key={category}>
                <FilterButton
                  category={category}
                  isSelected={filter === category}
                  onClick={() => setFilter(category)}
                />
              </WrapItem>
            ))}
          </Wrap>

          {/* Location cards grid */}
          <SimpleGrid
            columns={columns}
            spacing={8}
            as={motion.div}
            variants={animations.container}
            initial="hidden"
            animate="show"
          >
            <AnimatePresence mode="wait">
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
      </Container>
    </Box>
  );
};

export default React.memo(Antofagasta);
