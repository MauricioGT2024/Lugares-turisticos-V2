import { useState, useMemo } from "react";
import {
  Box,
  Container,
  SimpleGrid,
  VStack,
  Heading,
  Text,
  Button,
  Badge,
  useColorModeValue,
  Image,
  HStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMountain, FaMapMarkedAlt, FaExternalLinkAlt } from "react-icons/fa";
import { location } from "../data/antofagasta";

const MotionBox = motion(Box);
const MotionBadge = motion(Badge);

const FilterButton = ({ category, isSelected, onClick }) => (
  <Button
    size="sm"
    colorScheme={isSelected ? "teal" : "gray"}
    variant={isSelected ? "solid" : "outline"}
    onClick={onClick}
    _hover={{ transform: "translateY(-2px)" }}
    transition="all 0.2s"
  >
    {category}
  </Button>
);

const LocationFilters = ({ selectedFilter, onFilterChange }) => {
  const categories = ["Todos", "Volcan", "Laguna", "Campo", "Salar", "Capital"];
  
  return (
    <Wrap spacing={2} mb={6}>
      {categories.map((category) => (
        <WrapItem key={category}>
          <FilterButton
            category={category}
            isSelected={selectedFilter === category}
            onClick={() => onFilterChange(category)}
          />
        </WrapItem>
      ))}
    </Wrap>
  );
};

const LocationCard = ({ location, isSelected, onToggle }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  
  return (
    <MotionBox
      layout="position"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, layout: { duration: 0.3 } }}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={bgColor}
      boxShadow={useColorModeValue(
        '0 4px 6px rgba(160, 174, 192, 0.6)',
        '0 4px 6px rgba(0, 0, 0, 0.4)'
      )}
      _hover={{
        transform: "translateY(-8px)",
        boxShadow: useColorModeValue(
          '0 20px 25px -5px rgba(160, 174, 192, 0.4)',
          '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
        ),
      }}
      position="relative"
      height={isSelected ? "auto" : "450px"}
    >
      <Box position="relative">
        <Image
          src={location.imgSrc}
          alt={location.title}
          objectFit="cover"
          h="200px"
          w="full"
          transition="transform 0.3s ease"
          _hover={{ transform: "scale(1.05)" }}
        />
        <MotionBadge
          position="absolute"
          top={2}
          right={2}
          px={2}
          py={1}
          borderRadius="full"
          bg="rgba(237, 137, 54, 0.9)"
          color="white"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          backdropFilter="blur(8px)"
        >
          <Box as={FaMountain} display="inline" mr={1} />
          {location.categoria}
        </MotionBadge>
      </Box>

      <VStack p={6} spacing={4} align="start">
        <motion.div layout="position" style={{ width: "100%" }}>
          <Heading
            size="md"
            color={useColorModeValue("orange.600", "orange.300")}
            fontFamily="JetBrains Mono"
            _hover={{ color: useColorModeValue("orange.500", "orange.200") }}
            transition="color 0.2s ease"
          >
            {location.title}
          </Heading>
        </motion.div>
        
        <motion.div layout="position" style={{ width: "100%" }}>
          <Text
            fontSize="sm"
            color={useColorModeValue("gray.600", "gray.300")}
            noOfLines={!isSelected ? 3 : undefined}
            transition="all 0.3s ease"
            onClick={() => onToggle(location.id)}
            cursor="pointer"
            _hover={{ color: "orange.400" }}
          >
            {location.description}
          </Text>
        </motion.div>

        <motion.div layout="position" style={{ width: "100%" }}>
          <Button
            leftIcon={<FaMapMarkedAlt />}
            colorScheme="orange"
            variant="outline"
            onClick={() => onToggle(location.id)}
            w="full"
            _hover={{
              transform: "translateY(-2px)",
              bg: "orange.50",
              borderColor: "orange.400"
            }}
          >
            {isSelected ? "Ver menos" : "Ver más"}
          </Button>
        </motion.div>

        <AnimatePresence mode="wait">
          {isSelected && (
            <MotionBox
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              w="full"
              overflow="hidden"
            >
              <iframe
                title={location.title}
                src={location.mapSrc}
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: "8px" }}
                allowFullScreen
                loading="lazy"
              />
              
              <Button
                as="a"
                href={location.path}
                target="_blank"
                rightIcon={<FaExternalLinkAlt />}
                colorScheme="blue"
                variant="ghost"
                mt={4}
                w="full"
              >
                Más información
              </Button>
            </MotionBox>
          )}
        </AnimatePresence>
      </VStack>
    </MotionBox>
  );
};

const Antofagasta = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [filter, setFilter] = useState("Todos");
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.600", "gray.300");

  const handleToggle = (id) => {
    setSelectedId(selectedId === id ? null : id);
  };

  const filteredLocations = useMemo(() => {
    return filter === "Todos"
      ? location
      : location.filter((loc) => loc.categoria === filter);
  }, [filter]);

  return (
    <Container maxW="7xl" py={12}>
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
          <VStack spacing={4} textAlign="center" mb={8}>
            <Badge
              colorScheme="orange"
              px={4}
              py={1}
              borderRadius="full"
              fontSize="sm"
              bg="orange.400"
              color="white"
            >
              Explora la Puna
            </Badge>
            <Heading
              as="h1"
              size="2xl"
              bgGradient="linear(to-r, orange.400, yellow.400, yellow.600)"
              bgClip="text"
              fontFamily="JetBrains Mono"
              letterSpacing="tight"
              textAlign="center"
              fontWeight="bold"
              lineHeight="shorter"
              mb={2}
              _hover={{
                bgGradient: "linear(to-r, yellow.400, orange.400, yellow.600)",
              }}
              transition="all 0.3s ease"
            >
              Antofagasta de la Sierra
            </Heading>
            <Text
              fontSize="xl"
              color={textColor}
              maxW="3xl"
              mx="auto"
              fontStyle="italic"
              as={motion.p}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Donde el desierto de altura se encuentra con volcanes milenarios y salares brillantes, 
              creando paisajes únicos en la Puna catamarqueña.
            </Text>
          </VStack>
        </motion.div>

        <LocationFilters
          selectedFilter={filter}
          onFilterChange={setFilter}
        />
        
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={8}
          alignItems="start"
        >
          <AnimatePresence mode="sync">
            {filteredLocations.map((loc) => (
              <LocationCard
                key={loc.id}
                location={loc}
                isSelected={selectedId === loc.id}
                onToggle={handleToggle}
              />
            ))}
          </AnimatePresence>
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Antofagasta;
