import { useState, useMemo, useEffect } from "react";
import { Select, Box, SimpleGrid, Fade } from "@chakra-ui/react";
import HospedajeCard from "./HospedajeCard";
import { hospedajes } from "../../../data/hospedajes";

const Hospedaje = () => {
  const [currentLocation, setCurrentLocation] = useState("todos");
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  const locations = useMemo(
    () => ["todos", ...new Set(hospedajes.map((h) => h.location))],
    []
  );

  const filteredHospedajes = useMemo(
    () =>
      currentLocation === "todos"
        ? hospedajes
        : hospedajes.filter((h) => h.location === currentLocation),
    [currentLocation]
  );

  return (
    <Box padding="4">
      <Select
        value={currentLocation}
        onChange={(e) => setCurrentLocation(e.target.value)}
        mb="4"
        colorScheme="blue"
        placeholder="Selecciona una ubicación"
      >
        {locations.map((loc) => (
          <option key={loc} value={loc}>
            {loc === "todos" ? "Todas las ubicaciones" : loc}
          </option>
        ))}
      </Select>

      <Fade in={isPageLoaded}>
        <SimpleGrid columns={[1, 2, 3]} spacing="4">
          {filteredHospedajes.map((hospedaje, index) => (
            <HospedajeCard key={index} {...hospedaje} />
          ))}
        </SimpleGrid>
      </Fade>
    </Box>
  );
};

export default Hospedaje;
