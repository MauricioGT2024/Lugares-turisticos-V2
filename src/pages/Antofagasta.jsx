import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
  SimpleGrid,
  useColorModeValue,
  Badge,
  Icon,
  Tooltip,
  Link,
  Select,
  Skeleton,
} from "@chakra-ui/react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { FaMapMarkedAlt, FaCompass, FaMountain, FaExternalLinkAlt } from "react-icons/fa";
import { location } from "../data/antofagasta";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

// Componente de Hero animado
const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const [imageError, setImageError] = useState(false);

  const heroImage = imageError 
    ? "https://images.unsplash.com/photo-1682686580391-615b1e32be5c" // imagen de respaldo
    : "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba"; // imagen principal

  return (
    <MotionBox
      style={{ y, opacity }}
      position="relative"
      h="60vh"
      mb={16}
      overflow="hidden"
    >
      <Image
        src={heroImage}
        alt="Antofagasta de la Sierra"
        objectFit="cover"
        w="full"
        h="full"
        filter="brightness(0.7)"
        onError={() => setImageError(true)}
        fallback={
          <Skeleton
            height="100%"
            startColor="gray.500"
            endColor="gray.700"
          />
        }
      />
      <VStack
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        spacing={6}
        align="center"
        color="white"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Heading
            size="3xl"
            textAlign="center"
            fontWeight="bold"
            bgGradient="linear(to-r, teal.200, blue.200)"
            bgClip="text"
            textShadow="2xl"
          >
            Antofagasta de la Sierra
          </Heading>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Text
            fontSize="xl"
            textAlign="center"
            maxW="2xl"
            textShadow="lg"
          >
            Descubre la magia de los paisajes más impresionantes de Catamarca
          </Text>
        </motion.div>
      </VStack>
    </MotionBox>
  );
};

// Componente de tarjeta de ubicación mejorado
const LocationCard = ({ location, isOpen, onToggle }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const bgColor = useColorModeValue("white", "gray.800");
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
    hover: { 
      y: -10,
      transition: { duration: 0.2 }
    }
  };

  return (
    <MotionBox
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      layout
    >
      <Box
        bg={bgColor}
        borderRadius="2xl"
        overflow="hidden"
        boxShadow="xl"
        position="relative"
        minH="450px"
        transition="all 0.3s"
      >
        <Box position="relative" height="300px" overflow="hidden"> {/* Aumentado de 250px a 300px */}
          <Skeleton isLoaded={imageLoaded} height="100%">
            <Image
              src={location.imgSrc}
              alt={location.title}
              objectFit="cover"
              w="100%"
              h="100%"
              style={{ height: '100%' }}
              transition="transform 0.5s"
              _hover={{ transform: "scale(1.1)" }}
              onLoad={() => setImageLoaded(true)}
              fallback={
                <Skeleton
                  height="100%"
                  startColor="gray.500"
                  endColor="gray.700"
                />
              }
            />
          </Skeleton>
          <Badge
            position="absolute"
            top={4}
            right={4}
            colorScheme="teal"
            px={3}
            py={1}
            borderRadius="full"
            display="flex"
            alignItems="center"
            gap={2}
            backdropFilter="blur(8px)"
            bg="rgba(49, 151, 149, 0.9)"
          >
            <Icon as={FaMountain} />
            {location.categoria}
          </Badge>
        </Box>

        <VStack p={6} spacing={4} align="start">
          <Heading
            size="md"
            bgGradient="linear(to-r, teal.400, blue.500)"
            bgClip="text"
            transition="all 0.3s"
          >
            {location.title}
          </Heading>
          
          <Text 
            fontSize="sm" 
            color={useColorModeValue("gray.600", "gray.300")}
            noOfLines={isOpen ? undefined : 2}
          >
            {location.description}
          </Text>

          <MotionFlex gap={4} w="full" layout>
            <Button
              leftIcon={<FaMapMarkedAlt />}
              colorScheme="teal"
              variant="outline"
              onClick={() => onToggle(location.id)}
              flex={1}
              _hover={{
                transform: "translateY(-2px)",
                shadow: "xl",
              }}
            >
              {isOpen ? "Ocultar Mapa" : "Ver Ubicación"}
            </Button>

            <Link
              href={location.path}
              isExternal
              _hover={{ textDecoration: "none" }}
              flex={1}
            >
              <Button
                colorScheme="blue"
                w="full"
                rightIcon={<FaExternalLinkAlt />}
                _hover={{
                  transform: "translateY(-2px)",
                  shadow: "xl",
                }}
              >
                Más Info
              </Button>
            </Link>
          </MotionFlex>

          <AnimatePresence>
            {isOpen && (
              <MotionBox
                initial={{ opacity: 0, height: 0 }}
                animate={{ 
                  opacity: 1, 
                  height: "auto",
                  transition: { duration: 0.3 }
                }}
                exit={{ 
                  opacity: 0, 
                  height: 0,
                  transition: { duration: 0.2 }
                }}
                w="full"
                overflow="hidden"
              >
                <Box
                  mt={4}
                  borderRadius="xl"
                  overflow="hidden"
                  boxShadow="inner"
                >
                  <iframe
                    src={location.mapSrc}
                    title={`Mapa de ${location.title}`}
                    width="100%"
                    height="300px"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                  />
                </Box>
              </MotionBox>
            )}
          </AnimatePresence>
        </VStack>
      </Box>
    </MotionBox>
  );
};

LocationCard.propTypes = {
  location: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

// Componente principal
const Antofagasta = () => {
  const [openLocationId, setOpenLocationId] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("");

  const handleToggle = (id) => {
    setOpenLocationId(openLocationId === id ? null : id);
  };

  const filteredLocations = useMemo(() => 
    categoryFilter
      ? location.filter(loc => loc.categoria === categoryFilter)
      : location,
    [categoryFilter]
  );

  const categories = [...new Set(location.map(loc => loc.categoria))];

  return (
    <Box>
      <Hero />
      
      <Container maxW="8xl" py={12}>
        <VStack spacing={8} mb={12}>
          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            placeholder="Filtrar por categoría"
            size="lg"
            maxW="xs"
            icon={<FaCompass />}
            borderRadius="full"
            boxShadow="md"
            _hover={{ borderColor: "teal.300" }}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
        </VStack>

        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={8}
          as={motion.div}
          layout
        >
          <AnimatePresence mode="wait">
            {filteredLocations.map((loc, index) => (
              <motion.div
                key={loc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.1 
                }}
              >
                <LocationCard
                  location={loc}
                  isOpen={openLocationId === loc.id}
                  onToggle={handleToggle}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Antofagasta;
