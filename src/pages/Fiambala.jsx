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
  Select,
  Link,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { locations } from "../data/fiambala";

const LocationCard = ({ location, isOpen, onToggle }) => {
  const bgColor = useColorModeValue("white", "gray.700");

  return (
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

const Fiambala = () => {
  const [openLocationId, setOpenLocationId] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState(""); // Filtro por categoría

  const handleToggle = (id) => {
    setOpenLocationId((prevId) => (prevId === id ? null : id));
  };

  const bgColor = useColorModeValue("white", "gray.700");

  const filteredLocations = categoryFilter
    ? locations.filter((location) => location.category === categoryFilter)
    : locations;

  const selectVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <Box p={6}>
      <Heading as="h1" size="xl" mb={6} fontFamily="JetBrains Mono">
        Fiambalá
      </Heading>
      <Text mb={6} fontStyle={"italic"}>
        Fiambalá es una localidad conocida por sus paisajes desérticos, termas
        naturales y rica historia cultural.
      </Text>

      {/* Filtro de categoría */}
      <motion.div variants={selectVariants} initial="hidden" animate="visible">
        <Select
          value={categoryFilter}
          maxW="15em"
          margin="auto"
          display="flex"
          justifyContent="center"
          alignItems="center"
          bg={bgColor}
          placeholder="Selecciona una categoría"
          onChange={(e) => setCategoryFilter(e.target.value)}
          mb={6}
        >
          <option value="Desierto">Desierto</option>
          <option value="Cultura">Cultura</option>
          <option value="Termas">Termas</option>
          <option value="Mirador">Mirador</option>
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

export default Fiambala;
