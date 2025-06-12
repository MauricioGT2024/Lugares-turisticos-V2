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
  const [selectedLocationData, setSelectedLocationData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const { colorMode } = useTheme();
  const isDark = colorMode === "dark";

  const areas = useMemo(() => {
    return [...new Set(locations.map((loc) => loc.area))].sort();
  }, []);

  const filteredLocations = useMemo(() => {
    return selectedArea === "Todos"
      ? locations
      : locations.filter((loc) => loc.area === selectedArea);
  }, [selectedArea]);

  const openModal = useCallback((id) => {
    const foundLocation = locations.find((loc) => loc.id === id);
    if (foundLocation) {
      setSelectedLocationData(foundLocation);
      setIsOpen(true);
    }
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);
  const clearSelectedLocationData = useCallback(() => {
    setSelectedLocationData(null);
  }, []);

  return (
    <LayoutGroup>
      <main
        className={`min-h-screen py-12 bg-gradient-to-b from-gray-50 to-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 transition-colors duration-300`}
      >
        <div className="container mx-auto max-w-7xl px-4">
          <div className="space-y-10">
            <CatamarcaHero
              badge="Capital Histórica"
              title="San Fernando del Valle"
              subtitle="Descubre los tesoros escondidos de la capital catamarqueña"
              isDark={isDark}
            />

            <div aria-live="polite" className="sr-only">
              {selectedArea === "Todos"
                ? "Mostrando todas las áreas"
                : `Área seleccionada: ${selectedArea}`}
            </div>

            <CatamarcaFilter
              title="Áreas"
              items={areas}
              selected={selectedArea}
              onSelect={setSelectedArea} // podrías memorizar con useCallback si quieres
              isDark={isDark}
            />

            <CatamarcaGrid
              locations={filteredLocations}
              onLocationClick={openModal}
            />
          </div>
        </div>
        <CatamarcaModal
          isOpen={isOpen}
          onClose={closeModal}
          location={selectedLocationData}
          isDark={isDark}
          
        />
      </main>
    </LayoutGroup>
  );
};

export default React.memo(Catamarca);
