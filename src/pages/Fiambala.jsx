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
  Container,
  Tag,
  VStack,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMapMarkedAlt, FaInfoCircle, FaMapMarkerAlt, FaFilter } from "react-icons/fa";
import { locations } from "../data/fiambala";

const LocationCard = ({ location, isOpen, onToggle }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Box
        borderRadius="2xl"
        overflow="hidden"
        bg={bgColor}
        boxShadow="xl"
        position="relative"
        transition="all 0.3s"
        _hover={{ transform: "scale(1.02)" }}
      >
        <Box position="relative" height="250px">
          <Image
            src={location.imgSrc}
            alt={location.title}
            objectFit="cover"
            height="100%"
            width="100%"
            transition="transform 0.3s"
            _hover={{ transform: "scale(1.1)" }}
          />
          <Tag
            position="absolute"
            top="4"
            right="4"
            colorScheme="teal"
            size="md"
          >
            {location.category}
          </Tag>
        </Box>

        <VStack p={6} align="start" spacing={4}>
          <Heading size="md" fontWeight="bold">
            {location.title}
          </Heading>
          <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.300")}>
            {location.description}
          </Text>
          <Box display="flex" gap={4} width="100%">
            <Button
              colorScheme="teal"
              variant={isOpen ? "solid" : "outline"}
              onClick={() => onToggle(location.id)}
              flex="1"
              leftIcon={<FaMapMarkedAlt />}
            >
              {isOpen ? "Ocultar Mapa" : "Ver Mapa"}
            </Button>
            <Link
              href={location.path}
              isExternal
              style={{ textDecoration: "none" }}
              flex="1"
            >
              <Button colorScheme="blue" width="100%" leftIcon={<FaInfoCircle />}>
                Más Info
              </Button>
            </Link>
          </Box>
        </VStack>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Box p={6} borderTop="1px" borderColor="gray.200">
                <iframe
                  src={location.mapSrc}
                  title={`Mapa de ${location.title}`}
                  width="100%"
                  height="300px"
                  style={{ border: 0, borderRadius: "12px" }}
                  allowFullScreen
                />
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
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

const Fiambala = () => {
  const [openLocationId, setOpenLocationId] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("");
  const bgColor = useColorModeValue("gray.50", "gray.900");

  const handleToggle = (id) => {
    setOpenLocationId((prevId) => (prevId === id ? null : id));
  };

  const filteredLocations = categoryFilter
    ? locations.filter((location) => location.category === categoryFilter)
    : locations;

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8} align="stretch">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Heading
            as="h1"
            size="2xl"
            textAlign="center"
            mb={4}
            fontFamily="JetBrains Mono"
          >
            Fiambalá
          </Heading>
          <Text
            textAlign="center"
            fontSize="xl"
            fontStyle="italic"
            color={useColorModeValue("gray.600", "gray.400")}
            mb={8}
          >
            Descubre la magia de Fiambalá, donde el desierto, las termas y la
            cultura se encuentran
          </Text>
        </motion.div>

        <Box textAlign="center" mb={8}>
          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            maxW="xs"
            mx="auto"
            bg={useColorModeValue("white", "gray.700")}
            borderRadius="lg"
            icon={<FaFilter />}
          >
            <option value="">Todas las categorías</option>
            <option value="Desierto">Desierto</option>
            <option value="Cultura">Cultura</option>
            <option value="Termas">Termas</option>
            <option value="Mirador">Mirador</option>
          </Select>
        </Box>

        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={8}
          px={{ base: 4, md: 0 }}
        >
          {filteredLocations.map((location) => (
            <LocationCard
              key={location.id}
              location={location}
              isOpen={openLocationId === location.id}
              onToggle={handleToggle}
            />
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Fiambala;
