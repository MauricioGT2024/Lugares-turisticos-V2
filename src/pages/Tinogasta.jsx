import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Container,
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
  useDisclosure,
} from "@chakra-ui/react";
import { locations } from "../data/tinogasta";
import { motion, AnimatePresence } from "framer-motion";
import { FaMapMarkedAlt, FaInfoCircle } from "react-icons/fa";

const LocationCard = ({ location, isOpen, onToggle }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const { isOpen: isTooltipOpen, onToggle: onTooltipToggle } = useDisclosure();

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
        <Box position="relative" height="300px">
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
          >
            {location.category}
          </Badge>
        </Box>

        <VStack p="6" align="stretch" spacing="4">
          <Heading size="md" color={textColor}>
            {location.name}
          </Heading>
          
          <Text color={textColor} fontSize="sm" noOfLines={3}>
            {location.description}
          </Text>

          <Box display="flex" gap="4">
            <Tooltip label={isOpen ? "Ocultar mapa" : "Ver ubicación"}>
              <IconButton
                icon={<FaMapMarkedAlt />}
                colorScheme="teal"
                variant="outline"
                onClick={() => onToggle(location.id)}
                aria-label="Toggle map"
                isRound
                _hover={{ transform: "scale(1.1)" }}
              />
            </Tooltip>

            <Tooltip label="Más información">
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
                  _hover={{ transform: "translateY(-2px)" }}
                >
                  Más detalles
                </Button>
              </Link>
            </Tooltip>
          </Box>

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
                  height="250px"
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
    <Container maxW="8xl" py="12" px={{ base: "4", md: "8" }}>
      <VStack spacing="8" as={motion.div} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <Heading
          as="h1"
          size="2xl"
          textAlign="center"
          fontFamily="JetBrains Mono"
          color={textColor}
        >
          Tinogasta
        </Heading>
        
        <Text
          fontSize="xl"
          textAlign="center"
          color={textColor}
          maxW="3xl"
          mx="auto"
        >
          Descubre Tinogasta, una joya en el oeste de Catamarca, donde la tradición 
          vitivinícola se une con paisajes impresionantes y una rica historia cultural.
        </Text>

        <Box w={{ base: "100%", md: "300px" }}>
          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            bg={useColorModeValue("white", "gray.700")}
            placeholder="Filtrar por categoría"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
        </Box>

        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing="8"
          w="full"
          as={motion.div}
          layout
        >
          <AnimatePresence>
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
    </Container>
  );
};

export default Tinogasta;
