import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  Container,
  SimpleGrid,
  VStack,
  Heading,
  Text,
  Image,
  Badge,
  useColorModeValue,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { departamentos } from "../data/departamentos";
import PropTypes from "prop-types";

const MotionBox = motion(Box);

const DepartamentoCard = ({ loc }) => {
  const [isHovered, setIsHovered] = useState(false);
  const bgColor = useColorModeValue("white", "gray.800");
  
  // Función para determinar el gradiente según el departamento
  const getGradient = (name) => {
    const gradients = {
      "Antofagasta de la Sierra": {
        gradient: "linear(to-r, orange.400, yellow.400, yellow.600)",
        color: useColorModeValue("orange.600", "orange.300")
      },
      "Tinogasta": {
        gradient: "linear(to-r, purple.400, red.400, orange.400)",
        color: useColorModeValue("purple.600", "purple.300")
      },
      "Fiambalá": {
        gradient: "linear(to-r, yellow.400, orange.400, red.500)",
        color: useColorModeValue("yellow.600", "yellow.300")
      },
      "Catamarca Capital": {
        gradient: "linear(to-r, green.400, yellow.400, green.500)",
        color: useColorModeValue("green.600", "green.300")
      },
      default: {
        gradient: "linear(to-r, teal.400, blue.500)",
        color: useColorModeValue("teal.600", "teal.300")
      }
    };
    return gradients[name] || gradients.default;
  };

  return (
    <MotionBox
      layout="position"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <ChakraLink
        as={RouterLink}
        to={loc.path}
        _hover={{ textDecoration: 'none' }}
      >
        <Box
          borderRadius="xl"
          overflow="hidden"
          bg={bgColor}
          boxShadow={useColorModeValue(
            '0 4px 6px rgba(160, 174, 192, 0.6)',
            '0 4px 6px rgba(0, 0, 0, 0.4)'
          )}
          position="relative"
          height="400px"
          _hover={{
            transform: 'translateY(-8px)',
            boxShadow: '2xl',
          }}
          transition="all 0.3s ease"
        >
          <Box position="relative" height="220px" overflow="hidden">
            <Image
              src={loc.image}
              alt={loc.name}
              objectFit="cover"
              w="full"
              h="full"
              transition="transform 0.3s ease"
              transform={isHovered ? "scale(1.1)" : "scale(1)"}
            />
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Badge
                position="absolute"
                top={4}
                right={4}
                px={3}
                py={1}
                borderRadius="full"
                bg="rgba(49, 151, 149, 0.9)"
                color="white"
                backdropFilter="blur(8px)"
              >
                Explorar
              </Badge>
            </motion.div>
          </Box>

          <VStack p={6} spacing={4} align="start" height="180px">
            <Heading
              size="lg"
              color={getGradient(loc.name).color}
              fontFamily="JetBrains Mono"
              transition="color 0.2s ease"
              _hover={{
                bgGradient: getGradient(loc.name).gradient,
                bgClip: "text"
              }}
            >
              {loc.name}
            </Heading>
            <Text
              fontSize="md"
              color={useColorModeValue("gray.600", "gray.300")}
              noOfLines={3}
            >
              {loc.description}
            </Text>
          </VStack>
        </Box>
      </ChakraLink>
    </MotionBox>
  );
};

DepartamentoCard.propTypes = {
  loc: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
};

const Provincia = () => {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.600", "gray.300");

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
              colorScheme="purple"
              px={4}
              py={1}
              borderRadius="full"
              fontSize="sm"
              bg="purple.400"
              color="white"
            >
              Descubre Catamarca
            </Badge>
            <Heading
              as="h1"
              size="2xl"
              bgGradient="linear(to-r, green.400, yellow.500, purple.500)"
              bgClip="text"
              fontFamily="JetBrains Mono"
              letterSpacing="tight"
              mb={2}
              position="relative"
              sx={{
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: "-2px",
                  left: "0",
                  width: "100%",
                  height: "2px",
                  bgGradient: "linear(to-r, green.400, yellow.500, purple.500)",
                  transform: "scaleX(0)",
                  opacity: 0,
                  transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
                  transformOrigin: "left"
                },
                "&:hover::after": {
                  transform: "scaleX(1)",
                  opacity: 1
                }
              }}
            >
              Explora los Departamentos
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
              Descubre la diversidad y belleza de cada rincón de esta hermosa provincia
            </Text>
          </VStack>
        </motion.div>

        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
          spacing={8}
          alignItems="start"
        >
          <AnimatePresence mode="sync">
            {departamentos.map((loc) => (
              <DepartamentoCard key={loc.id} loc={loc} />
            ))}
          </AnimatePresence>
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Provincia;
