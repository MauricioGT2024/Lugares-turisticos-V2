import { useState, useMemo, useCallback, useEffect } from "react";
import React from "react";
import {
  Box,
  Container,
  SimpleGrid,
  VStack,
  Heading,
  Text,
  Badge,
  useColorModeValue,
  Wrap,
  WrapItem,
  useBreakpointValue,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMapMarkedAlt, FaInfoCircle, FaChevronDown } from "react-icons/fa";
import { location } from "../data/antofagasta";
import { animations } from "../components/Antofagasta/animations";
import { categoryConfig } from "../components/Antofagasta/categoryConfig";
import { FilterButton } from "../components/Antofagasta/FilterButton";
import { LocationCard } from "../components/Antofagasta/LocationCard";
// Componentes Motion reutilizables
const MotionBox = motion.create(Box);

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
