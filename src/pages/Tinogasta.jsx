import { useState } from "react";
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
  Link,
  SimpleGrid,
} from "@chakra-ui/react";
import { locations } from "../data/tinogasta";
import { motion } from "framer-motion";

const LocationCard = ({ location, isOpen, onToggle }) => {
  LocationCard.propTypes = {
    location: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      imgSrc: PropTypes.string.isRequired,
      mapUrl: PropTypes.string.isRequired,
      area: PropTypes.string.isRequired,
    }).isRequired,
    isOpen: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
  };

  const bgColor = useColorModeValue("white", "gray.700");

    const selectVariants = {
      hidden: { opacity: 0, y: -20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    };

  return (
    <motion.div variants={selectVariants} initial="hidden" animate="visible">
      <Box
        maxW="md"
        borderRadius="xl"
        overflow="hidden"
        boxShadow="lg"
        bg={bgColor}
        position="relative"
        height={isOpen ? "auto" : "485px"}
        transition="all 0.3s ease"
        _hover={{ transform: "translateY(-5px)" }}
      >
        <Box position="relative" height="300px" overflow="hidden">
          <Image
            src={location.imgSrc}
            alt={location.name}
            objectFit="cover"
            height="100%"
            width="100%"
          />
        </Box>

        <Box p={4} display="flex" flexDirection="column" height="100%">
          <Heading size="md" mb={2}>
            {location.name}
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
              <Button colorScheme="blue">Ver Mas Informacion...</Button>
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
                <Text mb={3} fontSize="sm">
                  Mapa de {location.name}
                </Text>
                <Box
                  mt={3}
                  flex="1"
                  overflow="hidden"
                  position="relative"
                  zIndex="1"
                >
                  <iframe
                    src={location.mapUrl}
                    name={`Map of ${location.name}`}
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

const Tinogasta = () => {
  const [openLocationId, setOpenLocationId] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState(""); // Filtro por categoría

  const handleToggle = (id) => {
    setOpenLocationId((prevId) => (prevId === id ? null : id));
  };
  // Animaciones para El filtro de categoría
  const selectVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };
  // Filtrar las ubicaciones según la categoría seleccionada
  const filteredLocations = categoryFilter
    ? locations.filter((location) => location.category === categoryFilter)
    : locations;
  const bgColor = useColorModeValue("white", "gray.700");
  return (
    <Box p={6}>
      <Heading as="h1" size="xl" mb={6} fontFamily={"JetBrains Mono"}>
        Tinogasta
      </Heading>
      <Text mb={6} fontStyle={"oblique"}>
        Tinogasta, una joya en el oeste de Catamarca, se presenta como un oasis
        entre montañas y desierto. Este municipio es conocido por su tradición
        vitivinícola, la belleza de sus paisajes de viñedos y dunas, y su rica
        historia precolombina y colonial.
      </Text>

      {/* Filtro de categoría */}
      <motion.div variants={selectVariants} initial="hidden" animate="visible">
        <Text textAlign="center" fontWeight="bold" mr={2} gap={0}>
          Filtrar por:
        </Text>
        <Select
          value={categoryFilter}
          maxW="15em"
          margin="auto"
          display="flex"
          justifyContent="center"
          alignItems="center"
          bg={bgColor}
          placeholder="Todos"
          onChange={(e) => setCategoryFilter(e.target.value)}
          mb={6}
        >
          <option value="Plazas">Plazas</option>
          <option value="Iglesias">Iglesias</option>
          <option value="Museos">Museos</option>
          <option value="Balnearios">Balnearios</option>
          <option value="Naturaleza">Naturaleza</option>
          <option value="Camping">Camping</option>
          <option value="Miradores">Miradores</option>
        </Select>
      </motion.div>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} gap={6}>
        {filteredLocations.map((location) => (
          <LocationCard
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

export default Tinogasta;
