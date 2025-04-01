import { useState } from "react"; // React no es necesario directamente
import {
  Box,
  Container,
  Grid,
  GridItem,
  Alert,
  AlertIcon,
  useColorModeValue,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { hospedajes } from "../data/hospedajes";
import AnimatedCard from "../components/Hospedaje/AnimatedCard";
import HospedajeFilter from "../components/Hospedaje/HospedajeFilter";
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
  // expandedId ya no se usa porque cambiamos a Modal
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [error, ] = useState(null); // setError eliminado si no se usa para mostrar errores
  const bgGradient = useColorModeValue(
    "linear(to-b, gray.50, white)",
    "linear(to-b, gray.900, gray.800)"
  );

  const departments = [...new Set(hospedajes.map((h) => h.location))];
  const filteredHospedajes =
    selectedDepartment === "all"
      ? hospedajes
      : hospedajes.filter((h) => h.location === selectedDepartment);

  // handleToggle ya no es necesario

  return (
    <Box bgGradient={bgGradient} minH="100vh" py={{ base: 8, md: 12 }}> {/* Ajuste de padding */}
      <Container maxW="8xl" px={{ base: 4, md: 8 }}>
        <Grid templateColumns={{ base: "1fr", lg: "250px 1fr" }} gap={8}>
          <GridItem>
            <HospedajeFilter
              selectedDepartment={selectedDepartment}
              setSelectedDepartment={setSelectedDepartment}
              departments={departments}
            />
          </GridItem>

          <GridItem>
            <HospedajeHeader />

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
              mt={8}
            >
              <AnimatePresence mode="wait">
                {filteredHospedajes.map((hospedaje) => (
                  <GridItem key={hospedaje.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }} // Transición más rápida
                    >
                      <AnimatedCard
                        {...hospedaje}
                        // Pasar el colorScheme basado en la ubicación
                        colorScheme={locationColorSchemes[hospedaje.location] || "teal"} // Usa teal como fallback
                        // isExpanded y onToggle ya no son necesarios
                      />
                    </motion.div>
                  </GridItem>
                ))}
              </AnimatePresence>
            </Grid>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hospedaje;
