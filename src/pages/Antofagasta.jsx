import { useState, useMemo } from "react";
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
  Container,
  VStack,
  Badge,
  useDisclosure,
  Tooltip,
  Icon,
  Skeleton,
} from "@chakra-ui/react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { FaMapMarkedAlt, FaExternalLinkAlt, FaInfoCircle } from "react-icons/fa";
import { location } from "../data/antofagasta";

// Hook personalizado para animaciones de scroll
const useScrollAnimation = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [1, 0.8]);
  const scale = useTransform(scrollY, [0, 200], [1, 0.95]);
  return { opacity, scale };
};

const LocationCard = ({ location, isOpen, onToggle }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, type: "spring" }}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.2 }
      }}
      layout
    >
      <Box
        maxW="sm"
        borderRadius="2xl"
        overflow="hidden"
        bg={bgColor}
        borderWidth="1px"
        borderColor={borderColor}
        position="relative"
        minHeight="450px"
        height={isOpen ? "auto" : "485px"}
        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        boxShadow="lg"
        _hover={{
          boxShadow: "2xl",
          transform: "translateY(-8px)",
        }}
      >
        <Box 
          position="relative" 
          height="250px" 
          width="100%"
          overflow="hidden"
        >
          <Skeleton
            isLoaded={imageLoaded}
            fitContent
            fadeDuration={0.5}
            width="100%"
            height="100%"
            position="absolute"
            top="0"
            left="0"
          >
            <Box
              position="relative"
              width="100%"
              height="100%"
              overflow="hidden"
            >
              <Image
                src={location.imgSrc}
                alt={location.title}
                objectFit="cover"
                layout="fill"
                width="100%"
                height="100%"
                onLoad={() => setImageLoaded(true)}
                loading="lazy"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  transition: "transform 0.3s ease-in-out",
                }}
                _hover={{
                  transform: "scale(1.1)",
                }}
              />
            </Box>
          </Skeleton>
          <Badge
            position="absolute"
            top="4"
            right="4"
            zIndex="1"
            colorScheme="teal"
            fontSize="xs"
            textTransform="uppercase"
            px={3}
            py={1}
            borderRadius="full"
            backdropFilter="blur(8px)"
            backgroundColor="rgba(49, 151, 149, 0.9)"
          >
            {location.categoria}
          </Badge>
        </Box>

        <VStack p={6} spacing={4} align="start">
          <Tooltip label={`Explorar ${location.title}`} placement="top">
            <Heading 
              size="md" 
              fontWeight="bold"
              _hover={{ color: "teal.500" }}
              transition="color 0.2s"
            >
              {location.title}
            </Heading>
          </Tooltip>
          <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.300")}>
            {location.description}
          </Text>
          <Text fontSize="sm" color={useColorModeValue("gray.500", "gray.400")}>
            Área: {location.lugar}
          </Text>

          <Box display="flex" gap={4} width="100%">
            <Tooltip label={isOpen ? "Ocultar ubicación" : "Ver ubicación"}>
              <Button
                leftIcon={<Icon as={FaMapMarkedAlt} />}
                colorScheme="teal"
                size="sm"
                width="full"
                onClick={() => onToggle(location.id)}
                variant="outline"
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "md",
                }}
              >
                {isOpen ? "Ocultar Mapa" : "Mostrar Mapa"}
              </Button>
            </Tooltip>
            
            <Tooltip label="Más información en Wikipedia">
              <Link
                href={location.path}
                isExternal
                width="full"
                _hover={{ textDecoration: "none" }}
              >
                <Button 
                  colorScheme="blue" 
                  size="sm" 
                  width="full"
                  rightIcon={<Icon as={FaExternalLinkAlt} />}
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "md",
                  }}
                >
                  Ver más
                </Button>
              </Link>
            </Tooltip>
          </Box>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ width: "100%" }}
              >
                <Box pt={4} width="100%">
                  <iframe
                    src={location.mapSrc}
                    title={`Map of ${location.title}`}
                    width="100%"
                    height="200px"
                    style={{ border: 0, borderRadius: "8px" }}
                    allowFullScreen
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

const FilterSelect = ({ value, onChange }) => {
  const categories = ["Capital", "Laguna", "Volcan", "Campo", "Salar"];
  
  return (
    <Box
      as={motion.div}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      maxW="xs"
      mx="auto"
      mb={8}
    >
      <Select
        value={value}
        onChange={onChange}
        placeholder="Filtrar por categoría"
        size="lg"
        borderRadius="full"
        bg={useColorModeValue("white", "gray.800")}
        _hover={{ borderColor: "teal.300" }}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </Select>
    </Box>
  );
};

const Antofagasta = () => {
  const { opacity, scale } = useScrollAnimation();
  const [openLocationId, setOpenLocationId] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("");

  const handleToggle = (id) => setOpenLocationId((prevId) => (prevId === id ? null : id));
  
  const filteredLocations = useMemo(() => 
    categoryFilter
      ? location.filter((loc) => loc.categoria === categoryFilter)
      : location,
    [categoryFilter]
  );

  return (
    <Container maxW="8xl" py={12}>
      <motion.div style={{ opacity, scale }}>
        <VStack spacing={8} mb={12}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.7,
              type: "spring",
              stiffness: 100 
            }}
          >
            <Heading
              as="h1"
              size="2xl"
              textAlign="center"
              bgGradient="linear(to-r, teal.500, blue.500)"
              bgClip="text"
              fontFamily="JetBrains Mono"
              mb={4}
              letterSpacing="tight"
            >
              Antofagasta De la Sierra
            </Heading>
            <Text
              textAlign="center"
              fontSize="xl"
              maxW="2xl"
              mx="auto"
              color={useColorModeValue("gray.600", "gray.300")}
            >
              Un tesoro escondido en la provincia de Catamarca, famoso por su belleza 
              paisajística, su rica biodiversidad y la calidez de su gente.
            </Text>
          </motion.div>

          <FilterSelect
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          />
        </VStack>
      </motion.div>

      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={8}
        as={motion.div}
        layout
      >
        <AnimatePresence mode="wait">
          {filteredLocations.map((location, index) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.1 
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
    </Container>
  );
};

export default Antofagasta;
