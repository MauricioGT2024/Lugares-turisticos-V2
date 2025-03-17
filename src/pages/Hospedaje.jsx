import { useState } from "react";
import {
  Box,
  Image,
  Heading,
  Text,
  Button,
  Collapse,
  useColorMode,
  Select,
  useColorModeValue,
  Container,
  SimpleGrid,
  Alert,
  AlertIcon,
  Icon,
  Tooltip,
  Badge,
  VStack,
  HStack,
  Flex,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { hospedajes } from "../data/hospedajes";
import PropTypes from "prop-types";
import { FaMapMarkedAlt, FaHotel, FaLocationArrow, FaSearch } from "react-icons/fa";

const MotionBox = motion(Box);

const AnimatedCard = ({ image, title, description, iframe, id, location, isExpanded, onToggle }) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "whiteAlpha.900");
  const badgeBg = useColorModeValue("teal.50", "teal.900");
  const badgeColor = useColorModeValue("teal.600", "teal.200");

  return (
    <MotionBox
      maxW="full"
      borderRadius="xl"
      overflow="hidden"
      bg={cardBg}
      boxShadow="lg"
      whileHover={{
        y: -8,
        boxShadow: "2xl",
      }}
      transition={{ duration: 0.3 }}
      role="group"
      height={isExpanded ? "auto" : "450px"}
    >
      <Box position="relative" height="250px">
        <Image
          src={image}
          alt={title}
          objectFit="cover"
          width="100%"
          height="100%"
          transition="transform 0.5s"
          _groupHover={{
            transform: "scale(1.05)",
          }}
          fallbackSrc="/placeholder.jpg"
          loading="lazy"
        />
        <Badge
          position="absolute"
          top="4"
          right="4"
          bg={badgeBg}
          color={badgeColor}
          px="4"
          py="2"
          borderRadius="full"
          display="flex"
          alignItems="center"
          gap="2"
          backdropFilter="blur(8px)"
        >
          <Icon as={FaLocationArrow} />
          {location}
        </Badge>
      </Box>

      <VStack p="6" spacing="2" align="stretch">
        <HStack justify="space-between" align="start">
          <Heading
            size="md"
            color={textColor}
            noOfLines={1}
            display="flex"
            alignItems="center"
            gap="2"
          >
            <Icon as={FaHotel} color="teal.500" />
            {title}
          </Heading>
        </HStack>

        <Text
          color={textColor}
          fontSize="md"
          noOfLines={2}
          opacity={0.9}
        >
          {description}
        </Text>

        <Button
          colorScheme="teal"
          onClick={() => onToggle(id)}
          width="full"
          size="lg"
          leftIcon={<FaMapMarkedAlt />}
          variant="outline"
          _hover={{
            transform: "translateY(-2px)",
            shadow: "md",
          }}
        >
          {isExpanded ? "Ocultar Mapa" : "Ver Ubicación"}
        </Button>

        <Collapse in={isExpanded} animateOpacity>
          <Box
            mt="4"
            borderRadius="xl"
            overflow="hidden"
            boxShadow="inner"
            height="300px"
          >
            <iframe
              src={iframe}
              title={`Mapa de ${title}`}
              width="100%"
              height="100%"
              style={{
                border: 0,
                borderRadius: "0.75rem",
              }}
              loading="lazy"
              allowFullScreen
            />
          </Box>
        </Collapse>
      </VStack>
    </MotionBox>
  );
};

AnimatedCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  iframe: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

const Hospedaje = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [error, setError] = useState(null);
  const bgGradient = useColorModeValue(
    "linear(to-b, gray.50, white)",
    "linear(to-b, gray.900, gray.800)"
  );

  const departments = [...new Set(hospedajes.map((h) => h.location))];
  const filteredHospedajes = selectedDepartment === "all"
    ? hospedajes
    : hospedajes.filter((h) => h.location === selectedDepartment);

  const handleToggle = (id) => setExpandedId(expandedId === id ? null : id);

  return (
    <Box bgGradient={bgGradient} minH="100vh" py="12">
      <Container maxW="8xl" px={{ base: 4, md: 8 }}>
        <Grid
          templateColumns={{
            base: "1fr",
            lg: "250px 1fr",
          }}
          gap={8}
        >
          {/* Sidebar con filtros */}
          <GridItem>
            <VStack
              position="sticky"
              top="20"
              spacing={6}
              align="stretch"
              bg={useColorModeValue("white", "gray.800")}
              p={6}
              borderRadius="xl"
              boxShadow="sm"
            >
              <Heading size="md" color={useColorModeValue("gray.700", "white")}>
                Filtrar por ubicación
              </Heading>
              <Select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                size="lg"
                bg={useColorModeValue("white", "gray.800")}
                borderRadius="lg"
                icon={<FaSearch />}
              >
                <option value="all">Todos los departamentos</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </Select>
            </VStack>
          </GridItem>

          {/* Contenido principal */}
          <GridItem>
            <VStack spacing={8} align="stretch">
              <Box textAlign="center">
                <Badge
                  colorScheme="teal"
                  px="4"
                  py="1"
                  borderRadius="full"
                  fontSize="sm"
                  mb={4}
                >
                  Explora
                </Badge>
                <Heading
                  as="h1"
                  size="2xl"
                  bgGradient="linear(to-r, teal.400, blue.500)"
                  bgClip="text"
                  letterSpacing="tight"
                  mb={4}
                >
                  Hospedajes en Catamarca
                </Heading>
                <Text
                  fontSize="xl"
                  color={useColorModeValue("gray.600", "gray.300")}
                  maxW="2xl"
                  mx="auto"
                >
                  Encuentra el alojamiento perfecto para tu estadía
                </Text>
              </Box>

              {error && (
                <Alert status="error" borderRadius="lg">
                  <AlertIcon />
                  {error}
                </Alert>
              )}

              <Grid
                templateColumns={{
                  base: "1fr",
                  md: "repeat(2, 1fr)",
                  xl: "repeat(3, 1fr)",
                }}
                gap={8}
              >
                <AnimatePresence mode="wait">
                  {filteredHospedajes.map((hospedaje) => (
                    <GridItem key={hospedaje.id}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                      >
                        <AnimatedCard
                          {...hospedaje}
                          isExpanded={expandedId === hospedaje.id}
                          onToggle={handleToggle}
                        />
                      </motion.div>
                    </GridItem>
                  ))}
                </AnimatePresence>
              </Grid>
            </VStack>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hospedaje;
