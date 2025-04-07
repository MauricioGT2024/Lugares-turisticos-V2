import { useState, useMemo, useCallback } from "react";
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
  useBreakpointValue,
  Button,
  Link,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMapMarkedAlt, FaInfoCircle } from "react-icons/fa";
import { location } from "../data/antofagasta";
import { categoryConfig } from "../components/Antofagasta/categoryConfig";
import LocationCard from "../components/Antofagasta/LocationCard";
import CustomModal from "../components/UI/CustomModal";
import { useDisclosure } from "@chakra-ui/react";
import FilterGroup from "../components/FilterSystem/FilterGroup";
import { ANTOFAGASTA_ANIMATIONS } from "../components/Antofagasta/config/animations";
import { filterAnimations } from "../components/Antofagasta/config/animations";

const MotionBox = motion.create(Box);

const Antofagasta = () => {
  const [filters, setFilters] = useState({
    category: "Todos",
    search: ""
  });
  const [selectedLocationData, setSelectedLocationData] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Hooks de ColorMode llamados en el nivel superior
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const modalTextColor = useColorModeValue("gray.700", "gray.200");
  const headerTextColor = useColorModeValue("gray.600", "gray.300"); // Para el texto del header

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

  const filteredLocations = useMemo(() => {
    return location.filter((loc) => {
      const matchesCategory = 
        filters.category === "Todos" || 
        loc.categoria === filters.category;
      const matchesSearch = 
        !filters.search ||
        loc.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        (loc.description && 
         loc.description.toLowerCase().includes(filters.search.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [filters]);

  // Función para manejar la apertura del modal
  const handleShowDetails = useCallback(
    (id) => {
      const foundLocation = location.find((loc) => loc.id === id);
      if (foundLocation) {
        setSelectedLocationData(foundLocation);
        onOpen();
      }
    },
    [onOpen] // location es estable
  );

  // Limpia los datos seleccionados cuando el modal se cierra
  const handleCloseModal = () => {
    onClose();
    // Pequeño delay para evitar ver el cambio de datos antes de que cierre la animación
    setTimeout(() => setSelectedLocationData(null), 300);
  };

  const modalFooter = selectedLocationData && (
    <Box>
      {selectedLocationData?.mapUrl && (
        <Button
          as={Link}
          href={selectedLocationData.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          leftIcon={<FaMapMarkedAlt />}
          colorScheme="blue"
          variant="outline"
          mr={3}
          size="sm"
        >
          Ver en Mapa
        </Button>
      )}
      {selectedLocationData?.path && (
        <Button
          as={Link}
          href={selectedLocationData.path}
          target="_blank"
          rel="noopener noreferrer"
          leftIcon={<FaInfoCircle />}
          colorScheme="teal"
          variant="outline"
          mr={3}
          size="sm"
        >
          Más Info
        </Button>
      )}
      <Button colorScheme="gray" onClick={handleCloseModal} size="sm">
        Cerrar
      </Button>
    </Box>
  );

  return (
    <Box
      as={motion.div}
      variants={ANTOFAGASTA_ANIMATIONS.pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      bg={bgColor}
      minH="100vh"
      py={12}
    >
      <Container maxW="7xl">
        <VStack spacing={8} align="stretch">
          <MotionBox variants={ANTOFAGASTA_ANIMATIONS.headerVariants}>
            <VStack spacing={6} textAlign="center" mb={8}>
              <Badge
                colorScheme="orange"
                px={6}
                py={2}
                borderRadius="full"
                fontSize="md"
                textTransform="uppercase"
                letterSpacing="wide"
                boxShadow="lg"
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
              <Text fontSize="xl" color={headerTextColor} maxW="2xl" mx="auto">
                Donde el desierto de altura se encuentra con volcanes milenarios
                y salares brillantes, creando paisajes únicos en la Puna
                catamarqueña
              </Text>
            </VStack>
          </MotionBox>

          <VStack spacing={8}>
            <FilterGroup
              title="Categorías"
              items={categories.filter(cat => cat !== "Todos")}
              selected={filters.category}
              onSelect={(value) => setFilters(prev => ({ 
                ...prev, 
                category: value || "Todos"
              }))}
              colorScheme="orange"
            />

            <SimpleGrid
              columns={columns}
              spacing={8}
              as={motion.div}
              layout
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {filteredLocations.map((loc) => (
                  <motion.div
                    key={loc.id}
                    variants={filterAnimations}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                  >
                    <LocationCard
                      location={loc}
                      onShowDetails={handleShowDetails}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </SimpleGrid>
          </VStack>
        </VStack>
      </Container>

      <CustomModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        title={selectedLocationData?.title || "Detalles"}
        headerGradient={
          selectedLocationData
            ? (categoryConfig[selectedLocationData.categoria] || categoryConfig.Campo)
                .gradient
            : "linear(to-r, gray.400, gray.600)"
        }
        footer={modalFooter}
        motionPreset="slideInBottom"
        scrollBehavior="inside"
      >
        {selectedLocationData && (
          <VStack spacing={4} align="stretch">
            <Box borderRadius="lg" overflow="hidden" h="300px">
              <iframe
                title={selectedLocationData.title}
                src={selectedLocationData.mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              />
            </Box>
            <Text fontSize="md" color={modalTextColor}>
              {selectedLocationData.description}
            </Text>
          </VStack>
        )}
      </CustomModal>
    </Box>
  );
};

export default React.memo(Antofagasta);
