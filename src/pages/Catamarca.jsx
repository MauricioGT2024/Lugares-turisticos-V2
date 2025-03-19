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
  chakra,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { locations } from "../data/catamarca";
import { ChevronDownIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { FaMapMarkedAlt, FaInfoCircle } from "react-icons/fa";

const MotionBox = chakra(motion.div);

const LocationCard = ({ location, expandedId, setExpandedId }) => {
  const isExpanded = expandedId === location.id;
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const { onToggle } = useDisclosure();

  const handleExpand = useCallback(() => {
    setExpandedId(isExpanded ? null : location.id);
    onToggle();
  }, [isExpanded, location.id, setExpandedId, onToggle]);

  return (
    <MotionBox
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ 
        duration: 0.5,
        type: "spring",
        bounce: 0.3
      }}
      whileHover={{ y: -10 }}
    >
      <Box
        borderRadius="2xl"
        overflow="hidden"
        bg={bgColor}
        position="relative"
        height={isExpanded ? "auto" : "450px"}
        transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
        _hover={{ 
          transform: "translateY(-8px)",
          boxShadow: "2xl",
        }}
        boxShadow="lg"
      >
        <Box position="relative" height="250px" overflow="hidden">
          <Image
            as={motion.img}
            src={location.imgSrc}
            alt={location.title}
            objectFit="cover"
            w="full"
            h="full"
            transition="transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
            whileHover={{ scale: 1.1 }}
          />
          <Badge
            position="absolute"
            top={3}
            right={3}
            colorScheme="teal"
            borderRadius="full"
            px={3}
            py={1}
            fontSize="xs"
            textTransform="uppercase"
            backdropFilter="blur(8px)"
            bg="rgba(49, 151, 149, 0.9)"
            transform="translateY(-2px)"
            animation="float 3s ease-in-out infinite"
          >
            {location.area}
          </Badge>
        </Box>

        <VStack p={6} spacing={4} align="stretch">
          <Heading 
            as={motion.h3}
            size="md" 
            color={textColor}
            whileHover={{ color: "var(--chakra-colors-teal-500)" }}
            transition="color 0.3s"
            cursor="pointer"
          >
            {location.title}
          </Heading>
          <Text 
            fontSize="sm" 
            color={textColor} 
            noOfLines={isExpanded ? undefined : 2}
          >
            {location.description}
          </Text>

          <Flex gap={3} mt="auto">
            <Button
              leftIcon={<FaMapMarkedAlt />}
              variant="ghost"
              colorScheme="teal"
              onClick={handleExpand}
              flex={1}
              _hover={{
                transform: "translateY(-2px)",
                shadow: "md"
              }}
              transition="all 0.3s"
            >
              {isExpanded ? "Ver menos" : "Ver mapa"}
            </Button>
            <Link
              href={location.wiki}
              isExternal
              _hover={{ textDecoration: "none" }}
            >
              <Button
                leftIcon={<FaInfoCircle />}
                variant="outline"
                colorScheme="blue"
                size="md"
                _hover={{
                  transform: "translateY(-2px)",
                  shadow: "md",
                  bg: "blue.50"
                }}
                transition="all 0.3s"
              >
                Info
              </Button>
            </Link>
          </Flex>

          <AnimatePresence>
            {isExpanded && (
              <MotionBox
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, type: "spring" }}
              >
                <Box
                  mt={2}
                  height="300px"
                  borderRadius="xl"
                  overflow="hidden"
                  boxShadow="inner"
                  transform="translateZ(0)"
                >
                  <iframe
                    src={location.mapSrc}
                    title={`Mapa de ${location.title}`}
                    width="100%"
                    height="100%"
                    style={{ 
                      border: 0,
                      borderRadius: "12px",
                    }}
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
    const filtered = selectedArea === "all" 
      ? locations 
      : locations.filter(loc => loc.area === selectedArea);
    const uniqueAreas = [...new Set(locations.map(loc => loc.area))];
    return { filteredLocations: filtered, areas: uniqueAreas };
  }, [selectedArea]);

  return (
    <Container maxW="8xl" py={12}>
      <VStack spacing={8} mb={12}>
        <MotionBox
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8,
            type: "spring",
            bounce: 0.4
          }}
        >
          <Heading
            as="h1"
            size="2xl"
            textAlign="center"
            bgGradient="linear(to-r, teal.400, blue.500)"
            bgClip="text"
            letterSpacing="tight"
            mb={4}
            whileHover={{ scale: 1.05 }}
          >
            Catamarca
          </Heading>
          <Text
            fontSize="xl"
            textAlign="center"
            color={useColorModeValue("gray.600", "gray.300")}
            maxW="2xl"
            mx="auto"
            as={motion.p}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Descubre la magia del noroeste argentino, donde cada rincón cuenta una historia única
          </Text>
        </MotionBox>

        <Flex 
          as={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          w="full" 
          maxW="md" 
          mx="auto"
          bg={useColorModeValue("white", "gray.800")}
          p={2}
          borderRadius="full"
          boxShadow="lg"
        >
          <Select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            variant="filled"
            borderRadius="full"
            bg="transparent"
            _hover={{ bg: "transparent" }}
            cursor="pointer"
          >
            <option value="all">Todas las áreas</option>
            {areas.map(area => (
              <option key={area} value={area}>{area}</option>
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
        <AnimatePresence mode="wait">
          {filteredLocations.map((location, index) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: "spring"
              }}
            >
              <LocationCard
                location={location}
                expandedId={expandedId}
                setExpandedId={setExpandedId}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </SimpleGrid>
    </Container>
  );
};

export default Catamarca;
