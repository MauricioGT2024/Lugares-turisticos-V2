import { useState, useMemo, useCallback } from "react"; // Añadir useCallback
import {
  Box,
  Container,
  Grid,
  GridItem,
  SimpleGrid,
  VStack,
  Heading,
  Text,
  useColorModeValue,
  Badge,
  Modal, // Añadir Modal
  ModalOverlay, // Añadir ModalOverlay
  ModalContent, // Añadir ModalContent
  ModalHeader, // Añadir ModalHeader
  ModalFooter, // Añadir ModalFooter
  ModalBody, // Añadir ModalBody
  ModalCloseButton, // Añadir ModalCloseButton
  useDisclosure, // Añadir useDisclosure
  Button, // Añadir Button
  Link, // Añadir Link
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { FaInfoCircle } from "react-icons/fa"; // Icono para botón Más Info
import { locations } from "../data/fiambala";
import LocationCard from "../components/Fiambala/LocationCard";
import { CATEGORY_CONFIG } from "../components/Fiambala/CategoryConfig";
import CategoryFilter from "../components/Fiambala/CategoryFilter";

const Fiambala = () => {
  // const [selectedId, setSelectedId] = useState(null); // Eliminado
  const [categoryFilter, setCategoryFilter] = useState("");
  const [selectedLocationData, setSelectedLocationData] = useState(null); // Estado para modal
  const { isOpen, onOpen, onClose } = useDisclosure(); // Hook para modal
  const bgColor = useColorModeValue("gray.50", "gray.900");
  // const cardBg = useColorModeValue("white", "gray.800"); // No usado directamente aquí
  const textColor = useColorModeValue("gray.600", "gray.300");
  const modalBgColor = useColorModeValue("white", "gray.800"); // Hook para modal bg
  const modalTextColor = useColorModeValue("gray.700", "gray.200"); // Hook para modal text

  const categories = Object.keys(CATEGORY_CONFIG);

  // const handleToggle = (id) => { // Eliminado
  //   setSelectedId(selectedId === id ? null : id);
  // };

   // Función para abrir modal
  const handleShowDetails = useCallback((id) => {
    const foundLocation = locations.find(loc => loc.id === id);
    if (foundLocation) {
      setSelectedLocationData(foundLocation);
      onOpen();
    }
  }, [onOpen]); // locations es estable

  // Función para cerrar modal
  const handleCloseModal = () => {
    onClose();
    setTimeout(() => setSelectedLocationData(null), 300); // Delay para animación
  }


  const filteredLocations = useMemo(
    () =>
      categoryFilter
        ? locations.filter((loc) => loc.category === categoryFilter)
        : locations,
    [categoryFilter]
  );

  return (
    <Box bg={bgColor} minH="100vh" py={12}>
      <Container maxW="8xl" px={{ base: 4, md: 8 }}>
        <Grid templateColumns={{ base: "1fr", lg: "250px 1fr" }} gap={8}>
          <GridItem>
            <CategoryFilter
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              categories={categories}
              locations={locations}
            />
          </GridItem>

          <GridItem>
            <VStack spacing={8} align="stretch">
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  type: "spring",
                  bounce: 0.4,
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
                        bgGradient:
                          "linear(to-r, yellow.400, orange.400, red.500)",
                        transform: "scaleX(0)",
                        opacity: 0,
                        transition:
                          "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
                        transformOrigin: "left",
                      },
                      "&:hover::after": {
                        transform: "scaleX(1)",
                        opacity: 1,
                      },
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
                    Donde el desierto se encuentra con las termas, creando un
                    oasis de aventura y relax en el corazón de Catamarca
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
                      // isSelected ya no se pasa
                      onShowDetails={handleShowDetails} // Pasar nueva prop
                    />
                  ))}
                </AnimatePresence>
              </SimpleGrid>
            </VStack>
          </GridItem>
        </Grid>
      </Container>

      {/* Modal para mostrar detalles */}
      <Modal isOpen={isOpen} onClose={handleCloseModal} size="xl" isCentered motionPreset="slideInBottom">
        <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(5px)" />
        <ModalContent bg={modalBgColor} borderRadius="xl">
          <ModalHeader
            borderTopRadius="xl"
            bgGradient={
              selectedLocationData
                ? (CATEGORY_CONFIG[selectedLocationData.category] || {}).gradient
                : 'linear(to-r, gray.400, gray.600)'
            }
            color="white"
            py={4}
            fontFamily="JetBrains Mono" // Mantener fuente si se desea
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
              {/* No hay mapUrl en datos de Fiambalá, omitimos botón "Ver en Mapa" */}
              {selectedLocationData?.path && ( // Botón Más Info (usa path)
                 <Button
                  as={Link}
                  href={selectedLocationData.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  leftIcon={<FaInfoCircle />}
                  colorScheme="teal" // Color diferente a Antofagasta/Catamarca
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

export default Fiambala;
