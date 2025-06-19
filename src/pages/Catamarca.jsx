import { useState, useMemo, useCallback } from "react";
import { useTheme } from "../context/ThemeContext";
import { LayoutGroup } from "framer-motion";
import { locations } from "../data/catamarca";
import CatamarcaHero from "../components/Catamarca/CatamarcaHero";
import CatamarcaGrid from "../components/Catamarca/CatamarcaGrid";
import CatamarcaModal from "../components/Catamarca/CatamarcaModal";
import CatamarcaFilter from "../components/Catamarca/CatamarcaFilter";
import React from "react";

const Catamarca = () => {
  const [selectedArea, setSelectedArea] = useState("Todos");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const { colorMode } = useTheme();
  const isDark = colorMode === "dark";

  // Áreas únicas
  const areas = useMemo(() => [...new Set(locations.map((loc) => loc.area))].sort(), []);

  // Filtrar lugares
  const filteredLocations = useMemo(() => 
    selectedArea === "Todos" ? locations : locations.filter((loc) => loc.area === selectedArea), 
    [selectedArea]
  );

  // Manejar el modal
  const openModal = useCallback(id => setSelectedLocation(locations.find((loc) => loc.id === id)), []);
  const closeModal = useCallback(() => setSelectedLocation(null), []);

  return (
    <LayoutGroup>
      <main className="min-h-screen py-12 transition-colors duration-300 dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="space-y-10">
            <CatamarcaHero badge="Capital Histórica" title="San Fernando del Valle" subtitle="Descubre los tesoros escondidos de la capital catamarqueña" isDark={isDark} />
            <div aria-live="polite" className="sr-only">{selectedArea === "Todos" ? "Mostrando todas las áreas" : `Área seleccionada: ${selectedArea}`}</div>
            <CatamarcaFilter title="Áreas" items={areas} selected={selectedArea} onSelect={setSelectedArea} isDark={isDark} />
            <CatamarcaGrid locations={filteredLocations} onLocationClick={openModal} />
          </div>
        </div>

        <CatamarcaModal isOpen={!!selectedLocation} onClose={closeModal} location={selectedLocation} />
      </main>
    </LayoutGroup>
  );
};

export default React.memo(Catamarca);
