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
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { locations} from '../data/fiambala'


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
        <Button
          colorScheme="teal"
          size="sm"
          onClick={() => onToggle(location.id)}
        >
          {isOpen ? "Ocultar Mapa" : "Mostrar Mapa"}
        </Button>
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

  const handleToggle = (id) => {
    setOpenLocationId((prevId) => (prevId === id ? null : id));
  };

  return (
    <Box p={6}>
      <Heading as="h1" size="xl" mb={6}>
        Fiambalá
      </Heading>
      <Text mb={6}>
        Fiambalá es una localidad conocida por sus paisajes desérticos, termas
        naturales y rica historia cultural.
      </Text>

      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} gap={6}>
        {locations.map((location) => (
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
