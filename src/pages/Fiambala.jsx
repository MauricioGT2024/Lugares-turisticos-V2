import React, { useState, useMemo } from "react";
import {
  Box,
  Container,
  Grid,
  GridItem,
  SimpleGrid,
  VStack,
  Heading,
  Text,
  useColorModeValue,
  Badge,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { locations } from "../data/fiambala";
import LocationCard from "../components/Fiambala/LocationCard";
import { CATEGORY_CONFIG } from "../components/Fiambala/CategoryConfig";
import CategoryFilter from "../components/Fiambala/CategoryFilter";
const Fiambala = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("");
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");

  const categories = Object.keys(CATEGORY_CONFIG);

  const handleToggle = (id) => {
    setSelectedId(selectedId === id ? null : id);
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
            <CategoryFilter
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              categories={categories}
              locations={locations}
            />
          </GridItem>

          <GridItem>
            <VStack spacing={8} align="stretch">
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  type: "spring",
                  bounce: 0.4,
                }}
              >
                <VStack spacing={4} textAlign="center" mb={8}>
                  <Badge
                    colorScheme="yellow"
                    px={4}
                    py={1}
                    borderRadius="full"
                    fontSize="sm"
                    bg="yellow.400"
                    color="white"
                  >
                    Explora Fiambalá
                  </Badge>
                  <Heading
                    as="h1"
                    size="2xl"
                    bgGradient="linear(to-r, yellow.400, orange.400, red.500)"
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
                        bgGradient:
                          "linear(to-r, yellow.400, orange.400, red.500)",
                        transform: "scaleX(0)",
                        opacity: 0,
                        transition:
                          "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
                        transformOrigin: "left",
                      },
                      "&:hover::after": {
                        transform: "scaleX(1)",
                        opacity: 1,
                      },
                    }}
                  >
                    Fiambalá
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
                    Donde el desierto se encuentra con las termas, creando un
                    oasis de aventura y relax en el corazón de Catamarca
                  </Text>
                </VStack>
              </motion.div>

              <SimpleGrid
                columns={{ base: 1, lg: 2, xl: 3 }}
                spacing={8}
                as={motion.div}
                layout
              >
                <AnimatePresence mode="sync">
                  {filteredLocations.map((loc) => (
                    <LocationCard
                      key={loc.id}
                      location={loc}
                      isSelected={selectedId === loc.id}
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

export default Fiambala;
