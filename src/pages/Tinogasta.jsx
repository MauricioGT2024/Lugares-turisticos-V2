import { useState, useMemo } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  useColorModeValue,
  SimpleGrid,
  VStack,
  Badge,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { locations } from "../data/tinogasta";
import { CATEGORY_CONFIG } from "../components/Tinogasta/CategoryConfig";
import LocationCard from "../components/Tinogasta/LocationCard";
import { cardAnimation } from "../components/Tinogasta/animations";
import AreaFilter from "../components/Tinogasta/AreaFilter";

const Tinogasta = () => {
  const [openLocationId, setOpenLocationId] = useState(null);
  const [areaFilter, setAreaFilter] = useState("");
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const textColor = useColorModeValue("gray.800", "gray.100");

  const categories = Object.keys(CATEGORY_CONFIG);

  const handleToggle = (id) => {
    setOpenLocationId((prevId) => (prevId === id ? null : id));
  };

  const filteredLocations = useMemo(
    () =>
      areaFilter
        ? locations.filter((loc) => loc.category === areaFilter)
        : locations,
    [areaFilter]
  );

  return (
    <Box bg={bgColor} minH="100vh" py={12}>
      <Container maxW="8xl" px={{ base: 4, md: 8 }}>
        <VStack spacing={8} align="stretch">
          <motion.div {...cardAnimation}>
            <VStack spacing={4} textAlign="center" mb={8}>
              <Badge
                colorScheme="purple"
                px={4}
                py={1}
                borderRadius="full"
                fontSize="sm"
              >
                Explora Tinogasta
              </Badge>
              <Heading
                as="h1"
                size="2xl"
                bgGradient="linear(to-r, purple.400, red.400, orange.400)"
                bgClip="text"
                fontFamily="JetBrains Mono"
                letterSpacing="tight"
                mb={2}
                _hover={{
                  bgGradient:
                    "linear(to-r, red.400, orange.400, purple.400)",
                }}
                transition="all 0.3s ease"
              >
                Tinogasta
              </Heading>
              <Text fontSize="xl" color={textColor} maxW="3xl" mx="auto">
                Descubre Tinogasta, una joya en el oeste de Catamarca, donde
                la tradición vitivinícola se une con paisajes impresionantes
                y una rica historia cultural.
              </Text>
            </VStack>
          </motion.div>

          <AreaFilter
            categories={categories}
            areaFilter={areaFilter}
            setAreaFilter={setAreaFilter}
          />

          <SimpleGrid
            columns={{ base: 1, lg: 2, xl: 3 }}
            spacing={8}
            as={motion.div}
            layout
          >
            <AnimatePresence mode="wait">
              {filteredLocations.map((location) => (
                <LocationCard
                  key={location.id}
                  location={location}
                  isOpen={openLocationId === location.id}
                  onToggle={handleToggle}
                />
              ))}
            </AnimatePresence>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default Tinogasta;
