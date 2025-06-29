import React from "react";
import { useState, useMemo, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';
import { LayoutGroup, motion } from 'framer-motion';
import { locations } from '../data/catamarca';
import CatamarcaHero from '../components/Catamarca/CatamarcaHero';
import CatamarcaGrid from '../components/Catamarca/CatamarcaGrid';
import CatamarcaModal from '../components/Catamarca/CatamarcaModal';
import CatamarcaFilter from '../components/Catamarca/CatamarcaFilter';

const Catamarca = () => {
  const [selectedArea, setSelectedArea] = useState("Todos");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const { colorMode } = useTheme();
  const isDark = colorMode === "dark";

  // Memoize unique areas to prevent re-computation on every render
  const areas = useMemo(
    () => [ ...new Set(locations.map((loc) => loc.area))].sort(),
    [] // Dependencia vacía, solo se calcula una vez
  );

  // Memoize filtered locations based on selectedArea
  const filteredLocations = useMemo(
    () =>
      selectedArea === "Todos"
        ? locations
        : locations.filter((loc) => loc.area === selectedArea),
    [selectedArea] // Se recalcula cuando cambia selectedArea
  );

  // Memoized handlers for modal
  const openModal = useCallback(
    (id) => setSelectedLocation(locations.find((loc) => loc.id === id)),
    [] // Dependencia vacía, la función no cambia
  );
  const closeModal = useCallback(() => setSelectedLocation(null), []); // Dependencia vacía, la función no cambia

  // Variants for the main container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.5,
      },
    },
  };

  return (
    <LayoutGroup>
      <main className="min-h-screen py-12 transition-colors duration-300 dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 bg-gradient-to-b from-gray-50 to-white">
        <motion.div
          className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="space-y-12 md:space-y-16">
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
              title="Áreas de Interés"
              items={areas}
              selected={selectedArea}
              onSelect={setSelectedArea}
              isDark={isDark}
            />
            <CatamarcaGrid
              locations={filteredLocations}
              onLocationClick={openModal}
            />
          </div>
        </motion.div>

        <CatamarcaModal
          isOpen={!!selectedLocation}
          onClose={closeModal}
          location={selectedLocation}
        />
      </main>
    </LayoutGroup>
  );
};

export default React.memo(Catamarca);
