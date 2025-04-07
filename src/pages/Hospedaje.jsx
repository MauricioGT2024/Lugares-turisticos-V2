import { useState } from "react"; // React no es necesario directamente
import {
  Box,
  Container,
  Grid,
  GridItem,
  Alert,
  AlertIcon,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { hospedajes } from "../data/hospedajes";
import AnimatedCard from "../components/Hospedaje/AnimatedCard";
import FilterGroup from '../components/FilterSystem/FilterGroup';
import HospedajeHeader from "../components/Hospedaje/HospedajeHeader";

// Mapeo de locaciones a esquemas de color de Chakra UI
const locationColorSchemes = {
  "Catamarca": "blue",
  "Tinogasta": "orange",
  "Fiambalá": "purple",
  "Antofagasta de la Sierra": "green",
  // Puedes añadir más o un color por defecto si es necesario
};

const Hospedaje = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [error, ] = useState(null);
  const bgGradient = useColorModeValue(
    "linear(to-b, gray.50, white)",
    "linear(to-b, gray.900, gray.800)"
  );

  const departments = [...new Set(hospedajes.map((h) => h.location))];
  const filteredHospedajes =
    selectedDepartment === "all" || selectedDepartment === ""
      ? hospedajes
      : hospedajes.filter((h) => h.location === selectedDepartment);

  return (
    <Box bgGradient={bgGradient} minH="100vh" py={{ base: 8, md: 12 }}>
      <Container maxW="8xl" px={{ base: 4, md: 8 }}>
        <VStack spacing={8}>
          <HospedajeHeader />
          
          {/* Filtros centrados */}
          <Box w="full" maxW="2xl" mx="auto">
            <FilterGroup
              title="Ubicación"
              items={departments}
              selected={selectedDepartment}
              onSelect={setSelectedDepartment}
              showIcons={true}
            />
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
              lg: "repeat(3, 1fr)",
              xl: "repeat(4, 1fr)",
            }}
            gap={8}
            w="full"
          >
            <AnimatePresence mode="wait">
              {filteredHospedajes.map((hospedaje) => (
                <GridItem key={hospedaje.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <AnimatedCard
                      {...hospedaje}
                      colorScheme={locationColorSchemes[hospedaje.location] || "teal"}
                    />
                  </motion.div>
                </GridItem>
              ))}
            </AnimatePresence>
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
};

export default Hospedaje;
