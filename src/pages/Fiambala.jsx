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
  const textColor = useColorModeValue("gray.700", "gray.200");
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring",
        stiffness: 120,
        damping: 12
      }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3 }
      }}
    >
      <Box
        borderRadius="3xl"
        overflow="hidden"
        bg={bgColor}
        boxShadow="xl"
        position="relative"
        transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
        _hover={{ 
          boxShadow: "2xl",
          transform: "translateZ(10px)",
        }}
      >
        <Box position="relative" height="280px" overflow="hidden">
          <Image
            as={motion.img}
            src={location.imgSrc}
            alt={location.title}
            objectFit="cover"
            height="100%"
            width="100%"
            transition="transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
            _hover={{ transform: "scale(1.2)" }}
          />
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Tag
              position="absolute"
              top="4"
              right="4"
              colorScheme="teal"
              size="lg"
              px={4}
              py={2}
              borderRadius="full"
              backdropFilter="blur(12px)"
              bg="rgba(49, 151, 149, 0.85)"
              _hover={{
                transform: "scale(1.05)",
                bg: "rgba(49, 151, 149, 0.95)"
              }}
              transition="all 0.3s"
            >
              {location.category}
            </Tag>
          </motion.div>
        </Box>

        <VStack p={8} align="start" spacing={4}>
          <Heading 
            size="lg" 
            fontWeight="bold"
            color={textColor}
            _hover={{ color: "teal.500" }}
            transition="color 0.3s"
          >
            {location.title}
          </Heading>
          <Text 
            fontSize="md" 
            color={useColorModeValue("gray.600", "gray.300")}
            lineHeight="tall"
            noOfLines={isOpen ? undefined : 2}
          >
            {location.description}
          </Text>
          <Box 
            display="flex" 
            gap={6} 
            width="100%"
            as={motion.div}
            whileHover={{ scale: 1.02 }}
          >
            <Button
              colorScheme="teal"
              variant={isOpen ? "solid" : "outline"}
              onClick={() => onToggle(location.id)}
              flex="1"
              leftIcon={<FaMapMarkedAlt />}
              size="lg"
              _hover={{
                transform: "translateY(-4px)",
                shadow: "2xl"
              }}
              transition="all 0.4s"
            >
              {isOpen ? "Ocultar Mapa" : "Ver Mapa"}
            </Button>
            <Link
              href={location.path}
              isExternal
              style={{ textDecoration: "none" }}
              flex="1"
            >
              <Button 
                colorScheme="blue" 
                width="100%" 
                leftIcon={<FaInfoCircle />}
                size="lg"
                _hover={{
                  transform: "translateY(-4px)",
                  shadow: "2xl",
                  bg: "blue.500"
                }}
                transition="all 0.4s"
              >
                Más Info
              </Button>
            </Link>
          </Box>
        </VStack>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ 
                opacity: 1, 
                height: "auto",
                transition: {
                  type: "spring",
                  damping: 15,
                  stiffness: 120
                }
              }}
              exit={{ 
                opacity: 0, 
                height: 0,
                transition: { duration: 0.4 }
              }}
            >
              <Box 
                p={8} 
                borderTop="2px" 
                borderColor="teal.200"
                bg={useColorModeValue("gray.50", "gray.700")}
                borderBottomRadius="3xl"
              >
                <iframe
                  src={location.mapSrc}
                  title={`Mapa de ${location.title}`}
                  width="100%"
                  height="400px"
                  style={{ 
                    border: 0, 
                    borderRadius: "16px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)" 
                  }}
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
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8,
            type: "spring",
            bounce: 0.4
          }}
        >
          <Heading
            as="h1"
            size="2xl"
            textAlign="center"
            mb={4}
            fontFamily="JetBrains Mono"
            bgGradient="linear(to-r, teal.400, blue.500)"
            bgClip="text"
            letterSpacing="tight"
          >
            Fiambalá
          </Heading>
          <Text
            textAlign="center"
            fontSize="xl"
            fontStyle="italic"
            color={useColorModeValue("gray.600", "gray.400")}
            mb={8}
            as={motion.p}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Descubre la magia de Fiambalá, donde el desierto, las termas y la
            cultura se encuentran
          </Text>
        </motion.div>

        <Box 
          textAlign="center" 
          mb={8}
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            maxW="xs"
            mx="auto"
            bg={useColorModeValue("white", "gray.700")}
            borderRadius="full"
            boxShadow="lg"
            icon={<FaFilter />}
            _hover={{ borderColor: "teal.300" }}
            cursor="pointer"
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
          as={motion.div}
          layout
        >
          <AnimatePresence mode="wait">
            {filteredLocations.map((location, index) => (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring"
                }}
              >
                <LocationCard
                  location={location}
                  isOpen={openLocationId === location.id}
                  onToggle={handleToggle}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Fiambala;
