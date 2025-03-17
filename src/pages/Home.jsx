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

const PlaceCard = memo(({ place, textColor }) => (
  <MotionCard
    maxW="full"
    bg={useColorModeValue("white", "gray.800")}
    whileHover={{ y: -8, boxShadow: "xl" }}
    whileTap={{ scale: 0.98 }}
    transition={{ duration: 0.3 }}
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <Box
      as="main"
      minH="calc(100vh - 80px)"
      bgGradient={bgGradient}
      py={{ base: 8, md: 12 }}
      px={4}
    >
      <Container maxW="7xl">
        <VStack spacing={12}>
          <MotionBox
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            textAlign="center"
          >
            <Badge
              colorScheme="teal"
              fontSize="sm"
              mb={4}
              px={4}
              py={1}
              borderRadius="full"
            >
              Bienvenidos
            </Badge>
            <Heading
              as="h1"
              size={{ base: "2xl", md: "3xl" }}
              bgGradient="linear(to-r, teal.400, blue.500)"
              bgClip="text"
              mb={4}
              fontWeight="bold"
            >
              Descubre Catamarca
            </Heading>
            <Text fontSize={{ base: "lg", md: "xl" }} color={textColor} maxW="2xl" mx="auto">
              Explora los destinos más hermosos de la provincia y vive experiencias únicas.
            </Text>
          </MotionBox>

          <MotionBox
            as={SimpleGrid}
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={8}
            w="full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {places.map((place, index) => (
              <motion.div key={index} variants={itemVariants}>
                <PlaceCard place={place} textColor={textColor} />
              </motion.div>
            ))}
          </MotionBox>

          <Flex justify="center">
            <Link to="/provincia">
              <Button
                size="lg"
                colorScheme="teal"
                rightIcon={<FaMapMarkedAlt />}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
                _active={{
                  transform: "translateY(0)",
                }}
                px={8}
              >
                Explorar Provincia
              </Button>
            </Link>
          </Flex>
        </VStack>
      </Container>
    </Box>
  );
};

export default memo(Home);
