import { useState, useTransition } from "react";
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
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [, startTransition] = useTransition();

  const categories = ["Todos", ...Array.from(new Set(location.map(l => l.categoria))).filter(c => c !== "Todos")];
  const filtered = categoryFilter === "Todos"
    ? location
    : location.filter(l => l.categoria === categoryFilter);

  const openModal = (id) => {
    const loc = location.find(l => l.id === id);
    if (loc) {
      setSelectedLocation(loc);
      setIsOpen(true);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => setSelectedLocation(null), 300);
  };

  const changeCategory = (cat) => {
    startTransition(() => setCategoryFilter(cat));
  };

  return (
    <main className="min-h-screen py-16 bg-linear-to-br from-gray-100 to-white dark:from-gray-900 dark:to-gray-950 transition-colors duration-500">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl space-y-12">
        <AntofagastaHero
          badge="Puna de Atacama"
          title="Antofagasta de la Sierra"
          subtitle="Donde el desierto de altura se encuentra con volcanes milenarios y salares brillantes"
        />
        <AntofagastaFilter
          title="Explora por Categoría"
          items={categories}
          selected={categoryFilter}
          onSelect={changeCategory}
        />
        <AntofagastaGrid
          locations={filtered}
          onLocationClick={openModal}
        />
      </div>
      <AntofagastaModal
        isOpen={isOpen}
        onClose={closeModal}
        location={selectedLocation}
        gradient={pageStyles.antofagasta.modal.gradient}
      />
    </main>
  );
};

export default Antofagasta;
