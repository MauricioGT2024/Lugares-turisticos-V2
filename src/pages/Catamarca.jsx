import { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Flex,
  SimpleGrid,
  Heading,
  Image,
  Select,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { locations } from "../data/catamarca";
import { motion } from "framer-motion";

const LocationCard = ({ location, expandedId, setExpandedId }) => {
  LocationCard.propTypes = {
    location: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
      mapSrc: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    }).isRequired,
    expandedId: PropTypes.number,
    setExpandedId: PropTypes.func.isRequired,
  };
  const isExpanded = expandedId === location.id;
  const bgColor = useColorModeValue("white", "gray.700");

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        maxW="md"
        borderRadius="xl"
        overflow="hidden"
        boxShadow="lg"
        bg={bgColor}
        position="relative"
        height={isExpanded ? "auto" : "485px"}
        transition="all 0.3s ease"
        _hover={{ transform: "translateY(-10px)" }}
      >
        <Box position="relative" height="300px" overflow="hidden">
          <Image
            src={location.imgSrc}
            alt={location.title}
            objectFit="cover"
            height="100%"
            width="100%"
          />
        </Box>

        <Box p={4} display="flex" flexDirection="column" height="100%">
          <Heading size="md" mb={2}>
            {location.title}
          </Heading>
          <Text mb={3} fontSize="sm">
            {location.description}
          </Text>

          {/* Contenedor flex para los botones */}
          <Box display="flex" flexDirection="row" gap={4} mt={3}>
            <Button
              colorScheme="teal"
              size="md"
              onClick={() => setExpandedId(isExpanded ? null : location.id)}
            >
              {isExpanded ? "Ocultar Mapa" : "Mostrar Mapa"}
            </Button>

            <Link
              href={location.wiki}
              isExternal
              style={{ textDecoration: "none" }}
            >
              <Button colorScheme="blue">Ver en Wikipedia</Button>
            </Link>
          </Box>
          {isExpanded && (
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              exit={{ scaleY: 0, opacity: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                overflow: "hidden",
                transformOrigin: "top",
                position: "relative",
                width: "100%",
              }}
            >
              <Box mt={3}>
                <Text fontSize="sm" mb={2}>
                  Área: {location.area}
                </Text>
                <Box height="200px" className="map-container">
                  <iframe
                    src={location.mapSrc}
                    title={`Map of ${location.title}`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                  />
                </Box>
              </Box>
            </motion.div>
          )}
        </Box>
      </Box>
    </motion.div>
  );
};

const Catamarca = () => {
  const [selectedArea, setSelectedArea] = useState("all");
  const [openLocationId, setOpenLocationId] = useState(null);
  const handleToggle = (id) => {
    setOpenLocationId((prevId) => (prevId === id ? null : id));
  };
  const filteredLocations =
    selectedArea === "all"
      ? locations
      : locations.filter((loc) => loc.area === selectedArea);

  const areas = [...new Set(locations.map((loc) => loc.area))];
  const bgColor = useColorModeValue("white", "gray.700");

  return (
    <Box p={6}>
      <Heading as="h1" size="xl" mb={6} fontFamily="JetBrains Mono">
        Catamarca
      </Heading>
      <Text mb={6} fontStyle="oblique">
        Catamarca, ubicada en el noroeste de Argentina, es una provincia rica en
        historia y cultura, con paisajes naturales impresionantes y experiencias
        turísticas variadas.
      </Text>
      <SimpleGrid gap={3} alignItems="center" mb={6}>
        <Flex alignItems="center" gap={3} justifyContent="center" mb={6}>
          <Text textAlign="center" fontWeight="bold">
            Filtrar por:
          </Text>
          <Select
            color={useColorModeValue("gray.700", "gray.300")}
            size="md"
            maxW="150px"
            alignItems="center"
            bg={bgColor}
            onChange={(e) => setSelectedArea(e.target.value)}
          >
            <option value="all">Todas</option>
            {areas.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </Select>
        </Flex>
      </SimpleGrid>

      <SimpleGrid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={6}
      >
        {filteredLocations.map((location) => (
          <LocationCard
            key={location.id}
            location={location}
            isOpen={openLocationId === location.id}
            onToggle={handleToggle}
            expandedId={openLocationId}
            setExpandedId={setOpenLocationId}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Catamarca;
