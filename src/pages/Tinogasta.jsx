import React, { useState, useMemo } from "react";
import { useTheme } from "../context/ThemeContext";
import { locations } from "../data/tinogasta";
import TinogastaHero from "../components/Tinogasta/TinogastaHero";
import TinogastaGrid from "../components/Tinogasta/TinogastaGrid";
import TinogastaModal from "../components/Tinogasta/TinogastaModal";
import TinogastaFilter from "../components/Tinogasta/TinogastaFilter";

const Tinogasta = () => {
  const [categoryFilter, setCategoryFilter] = useState("Todos");
  const [selectedLocationData, setSelectedLocationData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const { colorMode } = useTheme();
  const isDark = colorMode === "dark";

  // Categorías únicas sin duplicado de "Todos"
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(locations.map((loc) => loc.category))
    ).filter(Boolean);
    return uniqueCategories.sort();
  }, []);

  const filteredLocations = useMemo(() => {
    return categoryFilter === "Todos"
      ? locations
      : locations.filter((loc) => loc.category === categoryFilter);
  }, [categoryFilter]);

  const handleLocationClick = (id) => {
    const location = locations.find((loc) => loc.id === id);
    if (location) {
      setSelectedLocationData(location);
      setIsOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setTimeout(() => setSelectedLocationData(null), 300);
  };

  return (
    <main className="min-h-screen py-12 px-4 md:px-8 transition-colors duration-300 bg-gradient-to-b from-gray-50 to-white text-gray-800 dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 dark:text-white ">
      <div className="max-w-7xl mx-auto space-y-16">
        <TinogastaHero
          badge="Capital del Oeste"
          title="Tinogasta"
          subtitle="Explora los paisajes áridos y la riqueza cultural de esta hermosa región"
        />

        <TinogastaFilter
          title="Categorías"
          items={categories}
          selected={categoryFilter}
          onSelect={setCategoryFilter}
        />

        <TinogastaGrid
          locations={filteredLocations}
          onLocationClick={handleLocationClick}
        />

        <TinogastaModal
          isOpen={isOpen}
          onClose={handleCloseModal}
          location={selectedLocationData}
          isDark={isDark}
        />
      </div>
    </main>
  );
};

export default Tinogasta;
