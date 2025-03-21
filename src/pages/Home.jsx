import React, { memo } from "react";
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
  Alert,
  AlertIcon,
  VStack,
  Container,
  Badge,
  Flex,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { places } from "../data/home";
import { FaMapMarkedAlt, FaArrowRight } from "react-icons/fa";

const MotionCard = motion(Card);
const MotionBox = motion(Box);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.9,
    rotate: -5
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8
    }
  }
};

const titleVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 10,
      stiffness: 100
    }
  }
};

const PlaceCard = memo(({ place, textColor }) => (
  <MotionCard
    maxW="full"
    bg={useColorModeValue("white", "gray.800")}
    whileHover={{ 
      y: -12, 
      boxShadow: "2xl",
      scale: 1.02,
      transition: { duration: 0.3 }
    }}
    whileTap={{ 
      scale: 0.98,
      rotate: -1
    }}
    initial="hidden"
    animate="visible"
    variants={itemVariants}
    overflow="hidden"
    borderRadius="xl"
    boxShadow="md"
    position="relative"
  >
    <Box position="relative" overflow="hidden" height="200px">
      <Image
        src={place.image}
        alt={place.name}
        width="100%"
        height="100%"
        objectFit="cover"
        loading="lazy"
        fallbackSrc="/placeholder.jpg"
        transition="transform 0.3s ease-in-out"
        _groupHover={{ transform: "scale(1.1)" }}
      />
      <Badge
        position="absolute"
        top="4"
        right="4"
        colorScheme="blue"
        borderRadius="full"
        px="3"
        py="1"
      >
        Explorar
      </Badge>
    </Box>

    <CardBody p="6">
      <VStack align="start" spacing="4">
        <Heading size="md" color={textColor}>
          {place.name}
        </Heading>
        <Text color={textColor} fontSize="sm" noOfLines={3}>
          {place.description}
        </Text>
        <Link to={place.path} style={{ width: "100%" }}>
          <Button
            rightIcon={<Icon as={FaArrowRight} />}
            colorScheme="teal"
            size="sm"
            width="full"
            variant="outline"
            _hover={{
              transform: "translateX(4px)",
              boxShadow: "md",
            }}
          >
            Descubrir
          </Button>
        </Link>
      </VStack>
    </CardBody>
  </MotionCard>
));

PlaceCard.propTypes = {
  place: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
  textColor: PropTypes.string.isRequired,
};

PlaceCard.displayName = "PlaceCard";

const Home = () => {
  const textColor = useColorModeValue("gray.700", "gray.300");
  const bgGradient = useColorModeValue(
    "linear(to-b, teal.50, gray.50)",
    "linear(to-b, gray.900, gray.800)"
  );

  return (
    <Box
      as="main"
      minH="calc(100vh - 80px)"
      bgGradient={bgGradient}
      py={{ base: 8, md: 12 }}
      px={4}
      overflow="hidden"
    >
      <Container maxW="7xl">
        <VStack spacing={12}>
          <MotionBox
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            textAlign="center"
          >
            <Badge
              as={motion.div}
              colorScheme="teal"
              fontSize="sm"
              mb={4}
              px={4}
              py={1}
              borderRadius="full"
              initial={{ scale: 0 }}
              animate={{ 
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 10
                }
              }}
            >
              Bienvenidos
            </Badge>
            <Heading
              as={motion.h1}
              size={{ base: "2xl", md: "3xl" }}
              bgGradient="linear(to-r, teal.400, blue.500)"
              bgClip="text"
              mb={4}
              fontWeight="bold"
              layoutId="pageTitle"
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              Descubre Catamarca
            </Heading>
            <Text
              as={motion.p}
              fontSize={{ base: "lg", md: "xl" }}
              color={textColor}
              maxW="2xl"
              mx="auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: {
                  delay: 0.2,
                  duration: 0.5
                }
              }}
            >
              Explora los destinos más hermosos de la provincia y vive experiencias únicas.
            </Text>
          </MotionBox>

          <MotionBox
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            as={SimpleGrid}
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={8}
            w="full"
          >
            {places.map((place, index) => (
              <PlaceCard 
                key={place.name} 
                place={place} 
                textColor={textColor}
              />
            ))}
          </MotionBox>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.5,
              duration: 0.5,
              type: "spring"
            }}
          >
            <Link to="/provincia">
              <Button
                size="lg"
                colorScheme="teal"
                rightIcon={<FaMapMarkedAlt />}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "lg"
                }}
                whileTap={{ scale: 0.95 }}
                _hover={{
                  transform: "translateY(-4px)",
                  boxShadow: "xl"
                }}
                px={8}
              >
                Explorar Provincia
              </Button>
            </Link>
          </motion.div>
        </VStack>
      </Container>
    </Box>
  );
};

export default memo(Home);
