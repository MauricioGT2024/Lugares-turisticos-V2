import { useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Container,
  Flex,
  SimpleGrid,
  Heading,
  Image,
  Select,
  Text,
  useColorModeValue,
  Link,
  VStack,
  Badge,
  useDisclosure,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { locations } from "../data/catamarca";
import { ChevronDownIcon, CloseIcon, ExternalLinkIcon } from "@chakra-ui/icons";

const MotionBox = motion(Box);

const LocationCard = ({ location, expandedId, setExpandedId }) => {
  const isExpanded = expandedId === location.id;
  const bgColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const { isOpen, onToggle } = useDisclosure();

  const handleExpand = useCallback(() => {
    setExpandedId(isExpanded ? null : location.id);
    onToggle();
  }, [isExpanded, location.id, setExpandedId, onToggle]);

  return (
    <MotionBox
      layout="position"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        borderRadius="xl"
        overflow="hidden"
        boxShadow="xl"
        bg={bgColor}
        position="relative"
        height={isExpanded ? "auto" : "500px"}
        transition="all 0.3s ease-in-out"
        _hover={{ transform: "translateY(-8px)", boxShadow: "2xl" }}
      >
        <Box position="relative" height="280px" overflow="hidden">
          <Image
            src={location.imgSrc}
            alt={location.title}
            objectFit="cover"
            height="100%"
            width="100%"
            transition="transform 0.3s ease-in-out"
            _hover={{ transform: "scale(1.05)" }}
          />
          <Badge
            position="absolute"
            top={4}
            right={4}
            colorScheme="teal"
            fontSize="xs"
            borderRadius="full"
            px={3}
            py={1}
          >
            {location.area}
          </Badge>
        </Box>

        <VStack p={6} spacing={4} align="stretch">
          <Heading size="md" color={textColor}>
            {location.title}
          </Heading>
          <Text fontSize="sm" color={textColor} opacity={0.9}>
            {location.description}
          </Text>

          <Flex gap={4} mt="auto">
            <Button
              colorScheme="teal"
              onClick={handleExpand}
              flex={1}
              _hover={{ transform: "translateY(-2px)" }}
              leftIcon={isExpanded ? <CloseIcon /> : <ChevronDownIcon />}
            >
              {isExpanded ? "Ocultar" : "Ver más"}
            </Button>

            <Link
              href={location.wiki}
              isExternal
              flex={1}
              _hover={{ textDecoration: "none" }}
            >
              <Button
                colorScheme="blue"
                width="full"
                _hover={{ transform: "translateY(-2px)" }}
                leftIcon={<ExternalLinkIcon />}
              >
                Wikipedia
              </Button>
            </Link>
          </Flex>

          <AnimatePresence>
            {isExpanded && (
              <MotionBox
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                overflow="hidden"
              >
                <Box
                  mt={4}
                  height="250px"
                  borderRadius="lg"
                  overflow="hidden"
                  boxShadow="inner"
                >
                  <iframe
                    src={location.mapSrc}
                    title={`Mapa de ${location.title}`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
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
  location: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    mapSrc: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    wiki: PropTypes.string.isRequired,
  }).isRequired,
  expandedId: PropTypes.number,
  setExpandedId: PropTypes.func.isRequired,
};

const Catamarca = () => {
  const [selectedArea, setSelectedArea] = useState("all");
  const [expandedId, setExpandedId] = useState(null);

  const { filteredLocations, areas } = useMemo(() => {
    const filtered =
      selectedArea === "all"
        ? locations
        : locations.filter((loc) => loc.area === selectedArea);
    const uniqueAreas = [...new Set(locations.map((loc) => loc.area))];
    return { filteredLocations: filtered, areas: uniqueAreas };
  }, [selectedArea]);

  const bgColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");

  return (
    <Container maxW="8xl" py={10}>
      <VStack spacing={8} mb={12}>
        <Heading
          as="h1"
          size="2xl"
          fontFamily="JetBrains Mono"
          color={textColor}
          textAlign="center"
        >
          Explora Catamarca
        </Heading>
        <Text
          fontSize="xl"
          textAlign="center"
          color={textColor}
          maxW="3xl"
          mx="auto"
        >
          Descubre la magia del noroeste argentino a través de sus paisajes,
          cultura e historia. Cada rincón de Catamarca tiene una historia única
          que contar.
        </Text>

        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          gap={4}
          w="full"
          maxW="md"
          mx="auto"
        >
          <Text fontWeight="bold" color={textColor} whiteSpace="nowrap">
            Filtrar por área:
          </Text>
          <Select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            bg={bgColor}
            color={textColor}
            size="lg"
          >
            <option value="all">Todas las áreas</option>
            {areas.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </Select>
        </Flex>
      </VStack>

      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={8}
        as={motion.div}
        layout
      >
        <AnimatePresence>
          {filteredLocations.map((location) => (
            <LocationCard
              key={location.id}
              location={location}
              expandedId={expandedId}
              setExpandedId={setExpandedId}
            />
          ))}
        </AnimatePresence>
      </SimpleGrid>
    </Container>
  );
};

export default Catamarca;
