import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  Image,
  Select,
  Text,
  useColorModeValue,
  Link,
  SimpleGrid,
  VStack,
  Badge,
  IconButton,
  Tooltip,
  Flex,
} from "@chakra-ui/react";
import { locations } from "../data/tinogasta";
import { motion, AnimatePresence } from "framer-motion";
import { FaMapMarkedAlt, FaInfoCircle, FaFilter } from "react-icons/fa";

const LocationCard = ({ location, isOpen, onToggle }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.200");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      layout
    >
      <Box
        borderRadius="2xl"
        overflow="hidden"
        bg={bgColor}
        boxShadow="xl"
        position="relative"
        height={isOpen ? "auto" : "500px"}
        transition="all 0.3s"
        _hover={{ transform: "translateY(-8px)", boxShadow: "2xl" }}
      >
        <Box position="relative" height="300px" overflow="hidden">
          <Image
            src={location.imgSrc}
            alt={location.name}
            objectFit="cover"
            w="100%"
            h="100%"
            transition="transform 0.5s"
            _hover={{ transform: "scale(1.05)" }}
          />
          <Badge
            position="absolute"
            top="4"
            right="4"
            colorScheme="teal"
            fontSize="sm"
            borderRadius="full"
            px="3"
            py="1"
            backdropFilter="blur(8px)"
          >
            {location.category}
          </Badge>
        </Box>

        <VStack p="6" align="stretch" spacing="2">
          <Heading size="md" color={textColor}>
            {location.name}
          </Heading>
          
          <Text color={textColor} fontSize="md" noOfLines={3}>
            {location.description}
          </Text>

          <Flex gap="4" mt="2">
            <Tooltip label={isOpen ? "Ocultar mapa" : "Ver ubicación"}>
              <IconButton
                icon={<FaMapMarkedAlt />}
                colorScheme="teal"
                variant="outline"
                onClick={() => onToggle(location.id)}
                aria-label="Toggle map"
                size="lg"
                isRound
                _hover={{ 
                  transform: "scale(1.1)",
                  boxShadow: "md" 
                }}
              />
            </Tooltip>

            <Link
              href={location.path}
              isExternal
              style={{ textDecoration: "none" }}
              flex="1"
            >
              <Button
                leftIcon={<FaInfoCircle />}
                colorScheme="blue"
                width="full"
                size="lg"
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "md"
                }}
              >
                Más detalles
              </Button>
            </Link>
          </Flex>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Box
                  mt="4"
                  borderRadius="lg"
                  overflow="hidden"
                  height="300px"
                  boxShadow="inner"
                >
                  <iframe
                    src={location.mapUrl}
                    title={`Mapa de ${location.name}`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  />
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        </VStack>
      </Box>
    </motion.div>
  );
};

LocationCard.propTypes = {
  location: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    mapUrl: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

const Tinogasta = () => {
  const [openLocationId, setOpenLocationId] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("");
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.800", "gray.100");

  const handleToggle = (id) => {
    setOpenLocationId((prevId) => (prevId === id ? null : id));
  };

  const filteredLocations = useMemo(
    () =>
      categoryFilter
        ? locations.filter((loc) => loc.category === categoryFilter)
        : locations,
    [categoryFilter]
  );

  const categories = [
    "Plazas",
    "Iglesias",
    "Museos",
    "Balnearios",
    "Naturaleza",
    "Camping",
    "Miradores"
  ];

  return (
    <Box bg={bgColor} minH="100vh" py="12">
      <Container maxW="8xl" px={{ base: 4, md: 8 }}>
        <Grid
          templateColumns={{ base: "1fr", lg: "250px 1fr" }}
          gap={8}
        >
          {/* Sidebar */}
          <GridItem>
            <Box
              position="sticky"
              top="20"
              bg={useColorModeValue("white", "gray.800")}
              p={6}
              borderRadius="xl"
              boxShadow="sm"
            >
              <VStack spacing={4}>
                <Heading size="md" color={textColor}>
                  Filtrar por categoría
                </Heading>
                <Select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  bg={useColorModeValue("white", "gray.700")}
                  icon={<FaFilter />}
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

          {/* Main Content */}
          <GridItem>
            <VStack spacing={8} align="stretch">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <VStack spacing={4} textAlign="center" mb={8}>
                  <Badge
                    colorScheme="teal"
                    px="4"
                    py="1"
                    borderRadius="full"
                    fontSize="sm"
                  >
                    Explora
                  </Badge>
                  <Heading
                    as="h1"
                    size="2xl"
                    bgGradient="linear(to-r, teal.400, blue.500)"
                    bgClip="text"
                    fontFamily="JetBrains Mono"
                  >
                    Tinogasta
                  </Heading>
                  <Text
                    fontSize="xl"
                    color={textColor}
                    maxW="3xl"
                    mx="auto"
                  >
                    Descubre Tinogasta, una joya en el oeste de Catamarca, donde la tradición 
                    vitivinícola se une con paisajes impresionantes y una rica historia cultural.
                  </Text>
                </VStack>
              </motion.div>

              <SimpleGrid
                columns={{ base: 1, lg: 2, xl: 3 }}
                spacing={8}
                as={motion.div}
                layout
              >
                <AnimatePresence mode="wait">
                  {filteredLocations.map((location) => (
                    <LocationCard
                      key={location.id}
                      location={location}
                      isOpen={openLocationId === location.id}
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

export default Tinogasta;
