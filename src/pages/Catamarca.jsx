import { useState } from "react";
import "./Catamarca.css";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Select,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { locations } from "../data/catamarca";

const LocationCard = ({ location, expandedId, setExpandedId }) => {
  LocationCard.propTypes = {
    location: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      imgSrc: PropTypes.string.isRequired,
      mapSrc: PropTypes.string.isRequired,
      area: PropTypes.string.isRequired,
    }).isRequired,
    expandedId: PropTypes.number,
    setExpandedId: PropTypes.func.isRequired,
  };
  const isExpanded = expandedId === location.id;
  const bgColor = useColorModeValue("white", "gray.700");

  return (
    <Box
      maxW="sm"
      borderRadius="xl"
      overflow="hidden"
      boxShadow="lg"
      bg={bgColor}
      position="relative"
      className={`location-card ${isExpanded ? "expanded" : ""}`}
      transition="all 0.3s ease"
      _hover={{ transform: "translateY(-5px)" }}
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

      <Box p={4} className="card-content">
        <Heading size="md" mb={2}>
          {location.title}
        </Heading>
        <Text mb={3} fontSize="sm">
          {location.description}
        </Text>
        <Button
          colorScheme="teal"
          size="sm"
          onClick={() => setExpandedId(isExpanded ? null : location.id)}
        >
          {isExpanded ? "Ocultar Mapa" : "Ver Mapa"}
        </Button>
        {isExpanded && (
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
        )}
      </Box>
    </Box>
  );
};

const Catamarca = () => {
  const [selectedArea, setSelectedArea] = useState("all");
  const [expandedId, setExpandedId] = useState(null);

  const filteredLocations =
    selectedArea === "all"
      ? locations
      : locations.filter((loc) => loc.area === selectedArea);

  const areas = [...new Set(locations.map((loc) => loc.area))];

  return (
    <Box p={6}>
      <Heading as="h1" size="xl" mb={6}>
        Catamarca
      </Heading>
      <Text mb={6}>
        Catamarca, ubicada en el noroeste de Argentina, es una provincia rica en
        historia y cultura, con paisajes naturales impresionantes y experiencias
        turísticas variadas.
      </Text>
      <Flex mb={6} align="center">
        <Text mr={2}>Filtrar por área:</Text>
        <Select
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
          maxW="200px"
        >
          <option value="all">Todas</option>
          {areas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </Select>
      </Flex>

      <Grid
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
            expandedId={expandedId}
            setExpandedId={setExpandedId}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default Catamarca;
