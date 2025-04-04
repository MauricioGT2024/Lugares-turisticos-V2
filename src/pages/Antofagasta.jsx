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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Link,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMapMarkedAlt, FaInfoCircle } from "react-icons/fa";
import { location } from "../data/antofagasta";
import { animations } from "../components/Antofagasta/animations";
import { categoryConfig } from "../components/Antofagasta/categoryConfig";
import LocationCard from "../components/Antofagasta/LocationCard";
import FilterSystem from "../components/FilterSystem/FilterSystem";

const MotionBox = motion(Box);

const Antofagasta = () => {
  const [filters, setFilters] = useState({
    category: "Todos",
    search: ""
  });
  const [selectedLocationData, setSelectedLocationData] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Hooks de ColorMode llamados en el nivel superior
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const modalBgColor = useColorModeValue("white", "gray.800");
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
              <Text fontSize="xl" color={headerTextColor} maxW="2xl" mx="auto">
                Donde el desierto de altura se encuentra con volcanes milenarios
                y salares brillantes, creando paisajes únicos en la Puna
                catamarqueña
              </Text>
            </VStack>
          </MotionBox>

          {/* Filters */}
          <FilterSystem
            filters={[{
              id: "category",
              label: "Categoría",
              options: categories.map(cat => ({
                value: cat,
                label: cat
              }))
            }]}
            activeFilters={{category: filters.category}}
            onFilterChange={(id, value) => {
              setFilters(prev => ({ ...prev, [id]: value }));
            }}
            searchQuery={filters.search}
            onSearchChange={(query) => {
              setFilters(prev => ({ ...prev, search: query }));
            }}
            onClearAll={() => {
              setFilters({
                category: "Todos",
                search: ""
              });
            }}
          />

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
                  onShowDetails={handleShowDetails}
                />
              ))}
            </AnimatePresence>
          </SimpleGrid>
        </VStack>
      </Container>

      {/* Modal para mostrar detalles */}
      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        size="xl"
        isCentered
        motionPreset="slideInBottom"
      >
        <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(5px)" />
        <ModalContent bg={modalBgColor} borderRadius="xl">
          <ModalHeader
            borderTopRadius="xl"
            bgGradient={
              selectedLocationData
                ? (
                    categoryConfig[selectedLocationData.categoria] ||
                    categoryConfig.Campo
                  ).gradient
                : "linear(to-r, gray.400, gray.600)"
            }
            color="white"
            py={4}
          >
            {selectedLocationData?.title || "Detalles"}
          </ModalHeader>
          <ModalCloseButton
            color="white"
            _focus={{ boxShadow: "none" }}
            _hover={{ bg: "whiteAlpha.300" }}
          />
          <ModalBody py={6}>
            {selectedLocationData && (
              <VStack spacing={4} align="stretch">
                <Box borderRadius="lg" overflow="hidden" h="300px">
                  <iframe
                    title={selectedLocationData.title}
                    src={selectedLocationData.mapSrc} // URL para iframe
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
          </ModalBody>
          <ModalFooter borderBottomRadius="xl" justifyContent="space-between">
            {/* Contenedor para botones de acción */}
            <Box>
              {selectedLocationData?.mapUrl && ( // Botón Ver en Mapa (usa mapUrl)
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
              {selectedLocationData?.path && ( // Botón Más Info (usa path)
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
            </Box>
            {/* Botón Cerrar */}
            <Button colorScheme="gray" onClick={handleCloseModal} size="sm">
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default React.memo(Antofagasta);
