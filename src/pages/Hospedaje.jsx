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
  Stack,
  ScaleFade,
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
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { hospedajes } from "../data/hospedajes";
import PropTypes from "prop-types";
import { FaMapMarkedAlt, FaHotel, FaLocationArrow } from "react-icons/fa";

const MotionBox = motion(Box);

const AnimatedCard = ({ image, title, description, iframe, id, location }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { colorMode } = useColorMode();
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "whiteAlpha.900");
  const badgeBg = useColorModeValue("teal.50", "teal.900");
  const badgeColor = useColorModeValue("teal.600", "teal.200");

  return (
    <MotionBox
      maxW={{ base: "100%", sm: "sm", md: "md" }}
      borderRadius="xl"
      overflow="hidden"
      bg={cardBg}
      boxShadow="lg"
      whileHover={{
        scale: 1.02,
        boxShadow: "xl",
      }}
      transition={{ duration: 0.2 }}
      role="group"
      height={isExpanded ? "auto" : { base: "300px", md: "450px" }}
      position="relative"
    >
      <ScaleFade initialScale={0.9} in={true}>
        <Box position="relative" height={{ base: "180px", md: "220px" }}>
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
            px="3"
            py="1"
            borderRadius="full"
            display="flex"
            alignItems="center"
            gap="2"
          >
            <Icon as={FaLocationArrow} />
            {location}
          </Badge>
        </Box>

        <VStack p="6" spacing="4" align="stretch">
          <HStack justify="space-between" align="start">
            <Heading
              size={{ base: "md", md: "lg" }}
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
            fontSize={{ base: "sm", md: "md" }}
            noOfLines={2}
            opacity={0.9}
          >
            {description}
          </Text>

          <Tooltip label={isExpanded ? "Ocultar mapa" : "Ver ubicación"}>
            <Button
              colorScheme="teal"
              onClick={() => setIsExpanded(!isExpanded)}
              width="full"
              size={{ base: "sm", md: "md" }}
              leftIcon={<FaMapMarkedAlt />}
              variant="outline"
              _hover={{
                transform: "translateY(-2px)",
                shadow: "md",
              }}
            >
              {isExpanded ? "Ocultar Mapa" : "Ver Ubicación"}
            </Button>
          </Tooltip>
        </VStack>

        <Collapse in={isExpanded} animateOpacity>
          <Box p="4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Box
                borderRadius="xl"
                overflow="hidden"
                boxShadow="inner"
                height={{ base: "200px", md: "250px" }}
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
            </motion.div>
          </Box>
        </Collapse>
      </ScaleFade>
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
};

const Hospedaje = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [error, setError] = useState(null);
  const bgColor = useColorModeValue("gray.50", "gray.900");

  const departments = [...new Set(hospedajes.map((h) => h.location))];
  const filteredHospedajes =
    selectedDepartment === "all"
      ? hospedajes
      : hospedajes.filter((h) => h.location === selectedDepartment);

  const handleToggle = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <Box bg={bgColor} minH="100vh" py="12">
      <Container maxW="8xl" px={{ base: 4, md: 8 }}>
        <VStack spacing="8" mb="12">
          <Heading
            as="h1"
            size={{ base: "2xl", md: "3xl" }}
            textAlign="center"
            bgGradient="linear(to-r, teal.400, blue.500)"
            bgClip="text"
            letterSpacing="tight"
            fontFamily="JetBrains Mono"
          >
            Hospedajes en Catamarca
          </Heading>

          <Text
            fontSize={{ base: "lg", md: "xl" }}
            textAlign="center"
            maxW="3xl"
            color={useColorModeValue("gray.600", "gray.300")}
          >
            Encuentra el alojamiento perfecto para tu estadía en Catamarca
          </Text>

          <Select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            maxW={{ base: "100%", sm: "300px" }}
            size="lg"
            bg={useColorModeValue("white", "gray.800")}
            borderRadius="lg"
            boxShadow="sm"
          >
            <option value="all">Todos los departamentos</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </Select>
        </VStack>

        {error && (
          <Alert status="error" mb="6" borderRadius="lg">
            <AlertIcon />
            {error}
          </Alert>
        )}

        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={{ base: 6, lg: 8 }}
          w="full"
        >
          <AnimatePresence>
            {filteredHospedajes.map((hospedaje, index) => (
              <motion.div
                key={hospedaje.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <AnimatedCard
                  {...hospedaje}
                  isExpanded={expandedId === hospedaje.id}
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

export default Hospedaje;
