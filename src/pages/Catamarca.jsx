import { useState, useMemo, useCallback } from "react";
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
  chakra,
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
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { FaMapMarkerAlt, FaInfoCircle } from "react-icons/fa";
import { 
  AreaFilter, 
  CatamarcaLocationCard as LocationCard, 
  ANIMATION_PRESETS as animations,
  getAreaTheme 
} from "../components/Catamarca";
import { locations } from "../data/catamarca";
import { filterAnimations } from "../components/Catamarca/config/animations";
import React from "react";

const MotionBox = chakra(motion.div);



const Catamarca = () => {
  // 1. Estados
  const [selectedArea, setSelectedArea] = useState("all");
  const [selectedLocationData, setSelectedLocationData] = useState(null);
  
  // 2. Hooks de Chakra UI
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgGradient = useColorModeValue(
    "linear(to-b, gray.50, white)",
    "linear(to-b, gray.900, gray.800)"
  );
  const textColor = useColorModeValue("gray.600", "gray.300");
  const modalBgColor = useColorModeValue("white", "gray.800");
  const modalTextColor = useColorModeValue("gray.700", "gray.200");
  const columns = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  // 3. Memos
  const themeConfig = useMemo(() => {
    if (!selectedLocationData) return null;
    return getAreaTheme(selectedLocationData.area);
  }, [selectedLocationData]);

  const { filteredLocations, areas } = useMemo(() => {
    const filtered =
      selectedArea === "all"
        ? locations
        : locations.filter((loc) => loc.area === selectedArea);

    const uniqueAreas = [...new Set(locations.map((loc) => loc.area))].sort();
    return { filteredLocations: filtered, areas: uniqueAreas };
  }, [selectedArea]);

  const modalHeaderGradient = useMemo(() => 
    themeConfig?.gradient || 'linear(to-r, gray.400, gray.600)'
  , [themeConfig]);

  // 4. Callbacks
  const handleShowDetails = useCallback(
    (id) => {
      const foundLocation = locations.find((loc) => loc.id === id);
      if (foundLocation) {
        setSelectedLocationData(foundLocation);
        onOpen();
      }
    },
    [onOpen]
  );

  const handleCloseModal = useCallback(() => {
    onClose();
    setSelectedLocationData(null);
  }, [onClose]);

  // 5. Render
  return (
    <LayoutGroup>
      <Box bgGradient={bgGradient} minH="100vh" py={12} role="main">
        <Container maxW="8xl">
          <VStack spacing={10}>
            {/* Header Section */}
            <MotionBox {...animations.fadeInDown}>
              <VStack spacing={6} textAlign="center">
                <Badge
                  colorScheme="yellow"
                  px={6}
                  py={2}
                  borderRadius="full"
                  fontSize="md"
                  textTransform="uppercase"
                  letterSpacing="wide"
                  boxShadow="sm"
                >
                  Capital Histórica
                </Badge>

                <Heading
                  as={motion.h1}
                  size="2xl"
                  bgGradient="linear(to-r, yellow.400, green.400, yellow.400)"
                  bgClip="text"
                  fontWeight="bold"
                  letterSpacing="tight"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  San Fernando del Valle
                </Heading>

                <Text 
                  fontSize="xl" 
                  color={textColor} 
                  maxW="2xl"
                  lineHeight="tall"
                >
                  Descubre los tesoros escondidos de la capital catamarqueña
                </Text>
              </VStack>
            </MotionBox>

            {/* Filter Section */}
            <Wrap 
              justify="center" 
              spacing={4} 
              py={4}
              as={motion.div}
              variants={animations.container}
            >
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

            {/* Grid Section */}
            <SimpleGrid
              columns={columns}
              spacing={8}
              w="full"
              as={motion.div}
              layout
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {filteredLocations.map((location) => (
                  <motion.div
                    key={location.id}
                    variants={filterAnimations}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                  >
                    <LocationCard
                      location={location}
                      onShowDetails={handleShowDetails}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </SimpleGrid>
          </VStack>
        </Container>

        {/* Modal */}
        <Modal
          isOpen={isOpen}
          onClose={handleCloseModal}
          size="xl"
          isCentered
          motionPreset="slideInBottom"
          scrollBehavior="inside"
        >
          <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(5px)" />
          <ModalContent bg={modalBgColor} borderRadius="xl">
            <ModalHeader
              borderTopRadius="xl"
              bgGradient={modalHeaderGradient}
              color="white"
              py={4}
              display="flex"
              alignItems="center"
              gap={2}
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
                <VStack spacing={6} align="stretch">
                  <Box 
                    borderRadius="lg" 
                    overflow="hidden" 
                    h="300px"
                    boxShadow="md"
                    border="1px"
                  >
                    <iframe
                      title={selectedLocationData.title}
                      src={selectedLocationData.mapSrc}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                    />
                  </Box>
                  <Text 
                    fontSize="md" 
                    color={modalTextColor}
                    lineHeight="tall"
                  >
                    {selectedLocationData.description}
                  </Text>
                </VStack>
              )}
            </ModalBody>
            <ModalFooter 
              borderBottomRadius="xl"
              borderTop="1px"
              borderColor={useColorModeValue("gray.100", "gray.700")}
              gap={2}
            >
              {selectedLocationData?.path && (
                <Button
                  as={Link}
                  href={selectedLocationData.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  leftIcon={<FaMapMarkerAlt />}
                  colorScheme="blue"
                  variant="outline"
                  mr={3}
                  size="sm"
                >
                  Ver en Mapa
                </Button>
              )}
              {selectedLocationData?.wiki && (
                <Button
                  as={Link}
                  href={selectedLocationData.wiki}
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
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </LayoutGroup>
  );
};

export default React.memo(Catamarca);
