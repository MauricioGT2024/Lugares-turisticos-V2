import { useState, useMemo, useCallback, useTransition } from "react";
import {
  AntofagastaHero,
  AntofagastaGrid,
  AntofagastaModal,
  AntofagastaFilter,
} from "../components/Antofagasta";
import { pageStyles } from "../styles/pageStyles";
import { location } from "../data/antofagasta";

const Antofagasta = () => {
  const [categoryFilter, setCategoryFilter] = useState("Todos");
  const [selectedLocationData, setSelectedLocationData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [, startTransition] = useTransition();

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(location.map((loc) => loc.categoria))
    ).sort();
    return ["Todos", ...uniqueCategories.filter((cat) => cat !== "Todos")];
  }, []);

  const filteredLocations = useMemo(() => {
    return categoryFilter === "Todos"
      ? location
      : location.filter((loc) => loc.categoria === categoryFilter);
  }, [categoryFilter]);

  const handleLocationClick = useCallback((id) => {
    const selected = location.find((loc) => loc.id === id);
    if (selected) {
      setSelectedLocationData(selected);
      setIsOpen(true);
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => setSelectedLocationData(null), 300);
  }, []);

  const handleCategoryChange = (category) => {
    startTransition(() => setCategoryFilter(category));
  };

  return (
    <main className="min-h-screen py-12 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl space-y-10">
        <AntofagastaHero
          badge="Puna de Atacama"
          title="Antofagasta de la Sierra"
          subtitle="Donde el desierto de altura se encuentra con volcanes milenarios y salares brillantes, creando paisajes únicos en la Puna catamarqueña"
        />

        <AntofagastaFilter
          title="Categorías"
          items={categories}
          selected={categoryFilter}
          onSelect={handleCategoryChange}
        />

        <AntofagastaGrid
          locations={filteredLocations}
          onLocationClick={handleLocationClick}
        />
      </div>
      <AntofagastaModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        location={selectedLocationData}
        gradient={pageStyles.antofagasta.modal.gradient}
      />
    </main>
  );
};

export default Antofagasta;
