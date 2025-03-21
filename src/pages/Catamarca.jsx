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
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  FaMapMarkedAlt,
  FaLandmark,
  FaTree,
  FaWater,
  FaChurch,
  FaMountain,
  FaExternalLinkAlt,
  FaMap,
} from "react-icons/fa";
import { locations } from "../data/catamarca";

const MotionBox = motion(Box);
const MotionBadge = motion(Badge);

// Configuración de colores por área
const AREA_COLORS = {
  Centro: {
    gradient: "linear(to-r, yellow.400, green.400)", // Dorado colonial y verde valle
    text: "linear(to-r, yellow.500, green.500)",
    badge: "rgba(250, 240, 137, 0.9)", // Dorado con transparencia
    hover: "yellow.400",
    button: "yellow",
  },
  Noroeste: {
    gradient: "linear(to-r, green.400, teal.400)", // Verdes de vegetación
    text: "linear(to-r, green.500, teal.500)",
    badge: "rgba(104, 211, 145, 0.9)",
    hover: "green.400",
    button: "green",
  },
  Sureste: {
    gradient: "linear(to-r, blue.400, green.400)", // Agua y vegetación
    text: "linear(to-r, blue.500, green.500)",
    badge: "rgba(144, 205, 244, 0.9)",
    hover: "blue.400",
    button: "blue",
  },
  Norte: {
    gradient: "linear(to-r, orange.400, yellow.400)", // Montañas y sol
    text: "linear(to-r, orange.500, yellow.500)",
    badge: "rgba(251, 211, 141, 0.9)",
    hover: "orange.400",
    button: "orange",
  },
};

const getAreaIcon = (area) => {
  switch (area) {
    case "Centro":
      return FaLandmark;
    case "Noroeste":
      return FaTree;
    case "Sureste":
      return FaWater;
    case "Norte":
      return FaMountain;
    default:
      return FaChurch; // Icono por defecto
  }
};

const AreaFilters = ({ selectedArea, onAreaChange }) => {
  return (
    <Wrap spacing={2} mb={6}>
      <WrapItem>
        <Button
          size="sm"
          colorScheme={selectedArea === "all" ? "teal" : "gray"}
          variant={selectedArea === "all" ? "solid" : "outline"}
          onClick={() => onAreaChange("all")}
          _hover={{ transform: "translateY(-2px)" }}
          transition="all 0.2s"
        >
          Todas las áreas
        </Button>
      </WrapItem>
      {Object.keys(AREA_COLORS).map((area) => (
        <WrapItem key={area}>
          <Button
            size="sm"
            colorScheme={selectedArea === area ? "teal" : "gray"}
            variant={selectedArea === area ? "solid" : "outline"}
            onClick={() => onAreaChange(area)}
            _hover={{ transform: "translateY(-2px)" }}
            transition="all 0.2s"
          >
            {area}
          </Button>
        </WrapItem>
      ))}
    </Wrap>
  );
};

// Configuración de animaciones avanzadas
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
      when: "beforeChildren",
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9,
    rotate: -5,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
      mass: 1,
    },
  },
  hover: {
    y: -15,
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
  tap: {
    scale: 0.98,
    rotate: 2,
  },
};

const imageVariants = {
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
  hover: {
    scale: 1.1,
    rotate: [0, -5, 5, -5, 0],
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

const headerVariants = {
  hidden: { 
    opacity: 0, 
    y: -50,
    scale: 0.9 
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      mass: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.2
    }
  }
};

const LocationCard = ({ location, isExpanded, onToggle }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const colors = AREA_COLORS[location.area] || AREA_COLORS["Centro"];
  const IconComponent = getAreaIcon(location.area);

  return (
    <MotionBox
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={bgColor}
      boxShadow={useColorModeValue(
        "0 4px 6px rgba(160, 174, 192, 0.6)",
        "0 4px 6px rgba(0, 0, 0, 0.4)"
      )}
      _hover={{
        transform: "translateY(-8px)",
        boxShadow: useColorModeValue(
          "0 20px 25px -5px rgba(160, 174, 192, 0.4)",
          "0 20px 25px -5px rgba(0, 0, 0, 0.3)"
        ),
      }}
      position="relative"
      height={isExpanded ? "auto" : "450px"}
    >
      <Box position="relative">
        <Image
          as={motion.img}
          variants={imageVariants}
          whileHover={{ scale: 1.1 }}
          transition="0.3s ease"
          src={location.imgSrc}
          alt={location.title}
          objectFit="cover"
          h="200px"
          w="full"
        />
        <MotionBadge
          variants={badgeVariants}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.3 }}
          position="absolute"
          top={2}
          right={2}
          px={2}
          py={1}
          borderRadius="full"
          bg={colors.badge}
          color="white"
          backdropFilter="blur(8px)"
        >
          <Box as={IconComponent} display="inline" mr={1} />
          {location.area}
        </MotionBadge>
      </Box>

      <VStack p={6} spacing={4} align="start">
        <motion.div
          layout
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
        >
          <Heading
            as={motion.h3}
            whileHover={{ x: 5 }}
            size="md"
            bgGradient={colors.text}
            bgClip="text"
            fontFamily="JetBrains Mono"
            _hover={{ color: colors.hover }}
            transition="color 0.2s ease"
          >
            {location.title}
          </Heading>
        </motion.div>

        <Text
          as={motion.p}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          color={useColorModeValue("gray.700", "gray.200")}
          fontSize="md"
          noOfLines={isExpanded ? 0 : 2}
          cursor="pointer"
          onClick={() => onToggle(location.id)}
          _hover={{
            bgGradient: colors.text,
            bgClip: "text",
            transform: "translateX(4px)",
          }}
        >
          {location.description}
        </Text>

        <motion.div layout="position" style={{ width: "100%" }}>
          <Button
            leftIcon={<FaMap />}
            colorScheme={colors.button}
            variant="ghost"
            onClick={() => onToggle(location.id)}
            w="full"
            mt={4}
          >
            {isExpanded ? "Ver menos" : "Ver más"}
          </Button>
        </motion.div>

        <AnimatePresence mode="wait">
          {isExpanded && (
            <MotionBox
              initial={{ opacity: 0, height: 0, y: 20 }}
              animate={{
                opacity: 1,
                height: "auto",
                y: 0,
                transition: {
                  height: {
                    type: "spring",
                    stiffness: 150,
                    damping: 20,
                  },
                  opacity: { duration: 0.3 },
                  y: {
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                  },
                },
              }}
              exit={{
                opacity: 0,
                height: 0,
                y: -20,
                transition: {
                  duration: 0.3,
                },
              }}
              w="full"
              overflow="hidden"
            >
              <Button
                as="a"
                href={location.path}
                target="_blank"
                leftIcon={<FaMapMarkedAlt />}
                colorScheme="red"
                variant="ghost"
                mt={4}
                w="full"
                gap={2}
                fontSize="sm"
                fontWeight="bold"
                mb={4}
                transition="all 0.3s ease"
              >
                Ver en Google Maps
              </Button>
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
                href={location.wiki}
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

const Catamarca = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [selectedArea, setSelectedArea] = useState("all");
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.100");

  const { filteredLocations, areas } = useMemo(() => {
    const filtered =
      selectedArea === "all"
        ? locations
        : locations.filter((loc) => loc.area === selectedArea);
    const uniqueAreas = [...new Set(locations.map((loc) => loc.area))];
    return { filteredLocations: filtered, areas: uniqueAreas };
  }, [selectedArea]);

  const handleToggle = (id) => {
    setExpandedId((currentId) => (currentId === id ? null : id));
  };

  return (
    <LayoutGroup>
      <Container
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        maxW="7xl"
        py={12}
      >
        <VStack
          spacing={8}
          align="stretch"
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={headerVariants}>
            <VStack spacing={4} textAlign="center" mb={8}>
              <Badge
                as={motion.div}
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                colorScheme="yellow"
                px={4}
                py={1}
                borderRadius="full"
                fontSize="sm"
                bg="yellow.400"
                color="white"
              >
                Capital Histórica
              </Badge>
              <Heading
                as={motion.h1}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 , damping: 20 }}
                size="2xl"
                bgGradient="linear(to-r, yellow.400, green.400, yellow.400)"
                bgClip="text"
                fontFamily="JetBrains Mono"
                letterSpacing="tight"
                textAlign="center"
                fontWeight="bold"
                lineHeight="shorter"
                mb={2}
                _hover={{
                  bgGradient: "linear(to-r, green.400, yellow.400, green.400)",
                }}
                
              >
                San Fernando del Valle
              </Heading>
              <Text
                as={motion.p}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                fontSize="xl"
                color={textColor}
                maxW="3xl"
                mx="auto"
              >
                Descubre los tesoros escondidos de la capital catamarqueña
              </Text>
            </VStack>
          </motion.div>

          <AreaFilters
            selectedArea={selectedArea}
            onAreaChange={setSelectedArea}
          />

          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={8}
            w="full"
            as={motion.div}
            variants={containerVariants}
          >
            <AnimatePresence mode="wait">
              {filteredLocations.map((location) => (
                <LocationCard
                  key={location.id}
                  location={location}
                  isExpanded={expandedId === location.id}
                  onToggle={handleToggle}
                />
              ))}
            </AnimatePresence>
          </SimpleGrid>
        </VStack>
      </Container>
    </LayoutGroup>
  );
};

export default Catamarca;
