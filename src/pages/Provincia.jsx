import { useState, useMemo, memo } from 'react';
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

// Mover la configuración de gradientes fuera del componente
const gradientConfigs = {
  "Antofagasta de la Sierra": {
    lightGradient: "linear(to-r, orange.400, yellow.400, yellow.600)",
    darkGradient: "linear(to-r, orange.400, yellow.400, yellow.600)",
    lightColor: "orange.600",
    darkColor: "orange.300"
  },
  "Tinogasta": {
    lightGradient: "linear(to-r, purple.400, red.400, orange.400)",
    darkGradient: "linear(to-r, purple.400, red.400, orange.400)", 
    lightColor: "purple.600",
    darkColor: "purple.300"
  },
  "Fiambalá": {
    lightGradient: "linear(to-r, yellow.400, orange.400, red.500)",
    darkGradient: "linear(to-r, yellow.400, orange.400, red.500)",
    lightColor: "yellow.600",
    darkColor: "yellow.300"
  },
  "Catamarca Capital": {
    lightGradient: "linear(to-r, green.400, yellow.400, green.500)",
    darkGradient: "linear(to-r, green.400, yellow.400, green.500)",
    lightColor: "green.600",
    darkColor: "green.300"
  },
  default: {
    lightGradient: "linear(to-r, teal.400, blue.500)",
    darkGradient: "linear(to-r, teal.400, blue.500)",
    lightColor: "teal.600",
    darkColor: "teal.300"
  }
};

const DepartamentoCard = memo(({ loc }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardBgColor = useColorModeValue("white", "gray.800");
  const isDark = useColorModeValue(false, true);

  const getGradientConfig = (name) => {
    const config = gradientConfigs[name] || gradientConfigs.default;
    return {
      gradient: isDark ? config.darkGradient : config.lightGradient,
      color: isDark ? config.darkColor : config.lightColor
    };
  };

  const gradientConfig = useMemo(() => getGradientConfig(loc.name), [loc.name, isDark]);

  return (
    <MotionBox
      layout="position"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ 
        duration: 0.3,
        type: "spring",
        stiffness: 260,
        damping: 20 
      }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <ChakraLink
        as={RouterLink}
        to={loc.path}
        _hover={{ textDecoration: 'none' }}
        role="article"
        aria-label={`Explorar ${loc.name}`}
      >
        <Box
          borderRadius="xl"
          overflow="hidden"
          bg={cardBgColor}
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
          transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        >
          <Box position="relative" height="220px" overflow="hidden">
            <Image
              src={loc.image}
              alt={loc.name}
              objectFit="cover"
              w="full"
              h="full"
              transition="transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
              transform={isHovered ? "scale(1.1)" : "scale(1)"}
              loading="lazy"
            />
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20 
              }}
            >
              <Badge
                position="absolute"
                top={4}
                right={4}
                px={3}
                py={1}
                borderRadius="full"
                bg={`${gradientConfig.color}AA`}
                color="white"
                backdropFilter="blur(8px)"
                boxShadow="lg"
              >
                Explorar
              </Badge>
            </motion.div>
          </Box>

          <VStack 
            p={6} 
            spacing={4} 
            align="start" 
            height="180px"
          >
            <Heading
              size="lg"
              color={gradientConfig.color}
              fontFamily="JetBrains Mono"
              transition="all 0.3s ease"
              _hover={{
                bgGradient: gradientConfig.gradient,
                bgClip: "text",
                transform: "translateX(4px)"
              }}
            >
              {loc.name}
            </Heading>
            <Text
              fontSize="md"
              color={useColorModeValue("gray.600", "gray.300")}
              noOfLines={3}
              lineHeight="tall"
            >
              {loc.description}
            </Text>
          </VStack>
        </Box>
      </ChakraLink>
    </MotionBox>
  );
});

DepartamentoCard.displayName = "DepartamentoCard";

DepartamentoCard.propTypes = {
  loc: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
};

const Provincia = memo(() => {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.600", "gray.300");

  return (
    <Container maxW="7xl" py={12} bg={bgColor}>
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
});

Provincia.displayName = "Provincia";

export default Provincia;
