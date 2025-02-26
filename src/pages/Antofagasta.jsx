import { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Heading,
  Image,
  SimpleGrid,
  Text,
  useColorModeValue,
  Link,
  Select,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { location } from "../data/antofagasta";

const LocationCard = ({ location, isOpen, onToggle }) => {
  const bgColor = useColorModeValue("white", "gray.700");
  const selectVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9 } },
  };

  return (
    <motion.div variants={selectVariants} initial="hidden" animate="visible">
      <Box
        maxW="sm"
        borderRadius="xl"
        overflow="hidden"
        boxShadow="lg"
        bg={bgColor}
        position="relative"
        minHeight="400px"
        height={isOpen ? "auto" : "485px"}
        transition="all 0.3s ease"
        _hover={{ transform: "translateY(-10px)" }}
      >
        <Box position="relative" height="300px" overflow="hidden">
          <Image
            src={location.imgSrc}
            alt={location.area}
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
              onClick={() => onToggle(location.id)}
            >
              {isOpen ? "Ocultar Mapa" : "Mostrar Mapa"}
            </Button>

            <Link
              href={location.path}
              isExternal
              style={{ textDecoration: "none" }}
            >
              <Button colorScheme="blue">Ver en Wikipedia</Button>
            </Link>
          </Box>

          {isOpen && (
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              exit={{ scaleY: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                overflow: "hidden",
                transformOrigin: "top",
                position: "relative",
                width: "100%",
              }}
            >
              <Box mt={3} pb={4} bg={bgColor} position="relative" zIndex="1">
                <Text fontSize="sm" mb={2}>
                  Área: {location.lugar}
                </Text>
                <Text mb={3} fontSize="sm">
                  Mapa de {location.title}
                </Text>
                <Box
                  mt={3}
                  flex="1"
                  overflow="hidden"
                  position="relative"
                  zIndex="1"
                >
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

LocationCard.propTypes = {
  location: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    imgSrc: PropTypes.string.isRequired,
    mapSrc: PropTypes.string.isRequired,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

const Antofagasta = () => {
  const [openLocationId, setOpenLocationId] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("");
  const handleToggle = (id) => {
    setOpenLocationId((prevId) => (prevId === id ? null : id));
  };
  const filteredLocations = categoryFilter
    ? location.filter((location) => location.categoria === categoryFilter)
    : location;

  const selectVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <Box p={6}>
      <Heading
        as="h1"
        size="xl"
        mb={6}
        fontFamily="JetBrains Mono"
        fontStyle="italic"
      >
        Antofagasta De la Sierra
      </Heading>
      <Text mb={6} fontStyle="italic">
        Antofagasta de la Sierra, un tesoro escondido en la provincia de
        Catamarca, es famoso por su belleza paisajística, su rica biodiversidad
        y la calidez de su gente.
      </Text>
      <motion.div variants={selectVariants} initial="hidden" animate="visible">
        <Text textAlign="center" fontWeight="bold" mr={2} gap={0}>
          Filtrar por:
        </Text>
        <Select
          value={categoryFilter}
          margin="auto"
          display="flex"
          justifyContent="center"
          alignItems="center"
          placeholder="Selecciona una ubicación"
          onChange={(e) => setCategoryFilter(e.target.value)}
          width="20%"
          mb={6}
        >
          <option value="Capital">Capital</option>
          <option value="Laguna">Laguna</option>
          <option value="Volcan">Volcan</option>
          <option value="Campo">Campo</option>
          <option value="Salar">Salar</option>
        </Select>
      </motion.div>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} gap={6}>
        {filteredLocations.map((location) => (
          <LocationCard
            path={location.path}
            key={location.id}
            location={location}
            isOpen={openLocationId === location.id}
            onToggle={handleToggle}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Antofagasta;
