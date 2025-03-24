import { useState, useMemo, useCallback } from "react";
import {
  Box,
  Container,
  SimpleGrid,
  VStack,
  Heading,
  Text,
  Badge,
  useColorModeValue,
  Wrap,
  WrapItem,
  useBreakpointValue,
  chakra,
} from "@chakra-ui/react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import  AreaFilter  from "../components/Catamarca/AreaFilter";
import  LocationCard  from "../components/Catamarca/LocationCard";
import { animations } from "../components/Catamarca/animations";
import { locations } from "../data/catamarca";
import React from "react";

const MotionBox = chakra(motion.div);

const Catamarca = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [selectedArea, setSelectedArea] = useState("all");
  const bgGradient = useColorModeValue(
    "linear(to-b, gray.50, white)",
    "linear(to-b, gray.900, gray.800)"
  );
  const textColor = useColorModeValue("gray.600", "gray.300");
  const columns = useBreakpointValue({ base: 1, md: 2, lg: 3 });

  const handleToggle = useCallback((id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  const { filteredLocations, areas } = useMemo(() => {
    const filtered =
      selectedArea === "all"
        ? locations
        : locations.filter((loc) => loc.area === selectedArea);

    const uniqueAreas = [...new Set(locations.map((loc) => loc.area))];
    return { filteredLocations: filtered, areas: uniqueAreas };
  }, [selectedArea]);

  return (
    <LayoutGroup>
      <Box bgGradient={bgGradient} minH="100vh" py={12} role="main">
        <Container maxW="7xl">
          <VStack spacing={8}>
            <MotionBox {...animations.fadeIn}>
              <VStack spacing={4} textAlign="center">
                <Badge
                  colorScheme="yellow"
                  px={4}
                  py={1}
                  borderRadius="full"
                  fontSize="sm"
                >
                  Capital Histórica
                </Badge>

                <Heading
                  as={motion.h1}
                  size="2xl"
                  bgGradient="linear(to-r, yellow.400, green.400, yellow.400)"
                  bgClip="text"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  San Fernando del Valle
                </Heading>

                <Text fontSize="xl" color={textColor} maxW="2xl">
                  Descubre los tesoros escondidos de la capital catamarqueña
                </Text>
              </VStack>
            </MotionBox>

            <Wrap justify="center" spacing={4}>
              <WrapItem>
                <AreaFilter
                  area="Todos"
                  isSelected={selectedArea === "all"}
                  onClick={() => setSelectedArea("all")}
                />
              </WrapItem>
              {areas.map((area) => (
                <WrapItem key={area}>
                  <AreaFilter
                    area={area}
                    isSelected={selectedArea === area}
                    onClick={() => setSelectedArea(area)}
                  />
                </WrapItem>
              ))}
            </Wrap>

            <SimpleGrid
              columns={columns}
              spacing={8}
              w="full"
              as={motion.div}
              layout
            >
              <AnimatePresence mode="popLayout">
                {filteredLocations.map((location) => (
                  <LocationCard
                    key={location.id}
                    location={location}
                    isExpanded={expandedId === location.id}
                    onToggle={handleToggle}
                  />
                ))}
              </AnimatePresence>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>
    </LayoutGroup>
  );
};

export default React.memo(Catamarca);
