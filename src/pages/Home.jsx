import { memo, useState, useCallback } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Card,
  CardBody,
  Image,
  Button,
  VStack,
  Container,
  Badge,
  Icon,
  useColorModeValue,
  Flex,
  Tooltip,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { places } from "../data/home";
import { 
  FaMapMarkedAlt, 
  FaArrowRight, 
  FaCompass,
  FaInfoCircle 
} from "react-icons/fa";

// Componentes con Motion
const MotionCard = motion(Card);
const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

// Variantes de animación
const animations = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  },
  item: {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  },
  hover: {
    scale: 1.05,
    y: -10,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10
    }
  }
};

// Componente de tarjeta optimizado
const PlaceCard = memo(({ place }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const badgeColor = useColorModeValue("teal.500", "teal.300");

  return (
    <MotionCard
      variants={animations.item}
      whileHover={animations.hover}
      bg={cardBg}
      borderRadius="xl"
      overflow="hidden"
      boxShadow="lg"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial="hidden"
      animate="visible"
    >
      <Box position="relative" overflow="hidden" height="250px">
        <motion.div
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={place.image}
            alt={place.name}
            width="100%"
            height="100%"
            objectFit="cover"
            loading="lazy"
          />
        </motion.div>
        <Badge
          position="absolute"
          top="4"
          right="4"
          bg={badgeColor}
          color="white"
          px="3"
          py="1"
          borderRadius="full"
          boxShadow="md"
          backdropFilter="blur(8px)"
        >
          <Icon as={FaCompass} mr="2" />
          Explorar
        </Badge>
      </Box>

      <CardBody p="6">
        <VStack align="start" spacing="4">
          <Heading 
            size="md" 
            color={textColor}
            _hover={{ color: "teal.500" }}
            transition="color 0.2s"
          >
            {place.name}
          </Heading>
          <Text 
            color={textColor} 
            fontSize="sm" 
            noOfLines={3}
          >
            {place.description}
          </Text>
          <Link 
            to={place.path} 
            style={{ width: "100%" }}
          >
            <Button
              rightIcon={<FaArrowRight />}
              colorScheme="teal"
              size="md"
              width="full"
              variant="outline"
              _hover={{
                transform: "translateX(4px)",
                boxShadow: "md",
              }}
              transition="all 0.2s"
            >
              Descubrir
            </Button>
          </Link>
        </VStack>
      </CardBody>
    </MotionCard>
  );
});

PlaceCard.propTypes = {
  place: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
};

PlaceCard.displayName = "PlaceCard";

// Componente principal
const Home = () => {
  const bgGradient = useColorModeValue(
    "linear(to-b, gray.50, white)",
    "linear(to-b, gray.900, gray.800)"
  );
  const textColor = useColorModeValue("gray.600", "gray.300");

  const handleExploreClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Box
      as="main"
      minH="calc(100vh - 80px)"
      bgGradient={bgGradient}
      py={{ base: 8, md: 16 }}
      px={4}
      overflow="hidden"
    >
      <Container maxW="7xl">
        <VStack spacing={12}>
          <MotionFlex
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            direction="column"
            align="center"
            textAlign="center"
            mb={8}
          >
            <Badge
              colorScheme="teal"
              px={4}
              py={2}
              borderRadius="full"
              fontSize="md"
              mb={6}
            >
              Descubre la Magia de Catamarca
            </Badge>

            <Heading
              as={motion.h1}
              size={{ base: "2xl", md: "3xl" }}
              bgGradient="linear(to-r, teal.400, blue.500)"
              bgClip="text"
              mb={4}
              whileHover={{ scale: 1.05 }}
            >
              Explora Nuestros Destinos
            </Heading>

            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color={textColor}
              maxW="2xl"
              mb={8}
            >
              Descubre los paisajes más impresionantes, la rica cultura y las experiencias únicas 
              que Catamarca tiene para ofrecer.
            </Text>

            <Tooltip label="Explorar la provincia">
              <Link to="/provincia">
                <Button
                  size="lg"
                  colorScheme="teal"
                  rightIcon={<FaMapMarkedAlt />}
                  onClick={handleExploreClick}
                  _hover={{
                    transform: "translateY(-4px)",
                    boxShadow: "xl"
                  }}
                  transition="all 0.2s"
                >
                  Comenzar Aventura
                </Button>
              </Link>
            </Tooltip>
          </MotionFlex>

          <AnimatePresence>
            <MotionBox
              variants={animations.container}
              initial="hidden"
              animate="visible"
              as={SimpleGrid}
              columns={{ base: 1, md: 2, lg: 3 }}
              spacing={8}
              w="full"
            >
              {places.map((place) => (
                <PlaceCard key={place.path} place={place} />
              ))}
            </MotionBox>
          </AnimatePresence>
        </VStack>
      </Container>
    </Box>
  );
};

export default memo(Home);
