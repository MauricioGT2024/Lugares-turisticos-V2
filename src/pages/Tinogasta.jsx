import React, { useState, useMemo } from "react";
import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Select,
  Text,
  useColorModeValue,
  SimpleGrid,
  VStack,
  Badge,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFilter } from "react-icons/fa";
import { locations } from "../data/tinogasta";
import { CATEGORY_CONFIG } from "../components/Tinogasta/CategoryConfig";
import LocationCard from "../components/Tinogasta/LocationCard";
import { fadeInUp } from "../components/Tinogasta/animations";
const Tinogasta = () => {
  const [openLocationId, setOpenLocationId] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("");
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.100");

  const categories = Object.keys(CATEGORY_CONFIG);

  const handleToggle = (id) => {
    setOpenLocationId((prevId) => (prevId === id ? null : id));
  };

  const filteredLocations = useMemo(
    () =>
      categoryFilter
        ? locations.filter((loc) => loc.category === categoryFilter)
        : locations,
    [categoryFilter]
  );

  return (
    <Box bg={bgColor} minH="100vh" py={12}>
      <Container maxW="8xl" px={{ base: 4, md: 8 }}>
        <Grid templateColumns={{ base: "1fr", lg: "250px 1fr" }} gap={8}>
          <GridItem>
            <Box
              position="sticky"
              top="20"
              bg={useColorModeValue("white", "gray.800")}
              p={6}
              borderRadius="xl"
              boxShadow="lg"
              backdropFilter="blur(12px)"
              borderWidth="1px"
              borderColor={useColorModeValue("gray.100", "gray.700")}
            >
              <VStack spacing={4}>
                <Heading size="md" color={textColor}>
                  Filtrar por categoría
                </Heading>
                <Select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  bg={cardBg}
                  icon={<FaFilter />}
                  size="lg"
                >
                  <option value="">Todas las categorías</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </Select>
              </VStack>
            </Box>
          </GridItem>

          <GridItem>
            <VStack spacing={8} align="stretch">
              <motion.div {...fadeInUp}>
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
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default Tinogasta;
