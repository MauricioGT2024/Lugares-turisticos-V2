import React, { useState } from "react";
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
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hospedaje;
