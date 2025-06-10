import React, { useState, useMemo, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';
import AntofagastaHero from '../components/Antofagasta/AntofagastaHero';
import AntofagastaGrid from '../components/Antofagasta/AntofagastaGrid';
import AntofagastaModal from '../components/Antofagasta/AntofagastaModal';
import AntofagastaFilter from '../components/Antofagasta/AntofagastaFilter';
import { pageStyles } from '../styles/pageStyles';
import { location } from '../data/antofagasta';

const Antofagasta = () => {
  const [categoryFilter, setCategoryFilter] = useState('Todos');
  const [selectedLocationData, setSelectedLocationData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // Obtener categorías únicas
  const categories = useMemo(() => {
    const uniqueCategories = location.map((loc) => loc.categoria);
    return [...new Set(uniqueCategories)].sort();
  }, []);

  // Filtrar ubicaciones según la categoría seleccionada
  const filteredLocations = useMemo(() => {
    return categoryFilter === 'Todos'
      ? location
      : location.filter((loc) => loc.categoria === categoryFilter);
  }, [categoryFilter]);

  // Manejador de clic en ubicación
  const handleLocationClick = useCallback((id) => {
    const selectedLocation = location.find((loc) => loc.id === id);
    if (selectedLocation) {
      setSelectedLocationData(selectedLocation);
      setIsOpen(true);
    }
  }, []);

  // Cerrar el modal y resetear el estado
  const handleCloseModal = () => {
    setIsOpen(false);
    setTimeout(() => setSelectedLocationData(null), 300);
  };

  return (
    <main className="min-h-screen py-12 bg-gradient-to-b from-gray-50 to-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="space-y-10">
          {/* Hero Section */}
          <AntofagastaHero
            badge="Puna de Atacama"
            title="Antofagasta de la Sierra"
            subtitle="Donde el desierto de altura se encuentra con volcanes milenarios y salares brillantes, creando paisajes únicos en la Puna catamarqueña"
          />

          {/* Filter Section */}
          <AntofagastaFilter
            title="Categorías"
            items={categories}
            selected={categoryFilter}
            onSelect={setCategoryFilter}
          />

          {/* Grid Section */}
          <AntofagastaGrid
            locations={filteredLocations}
            onLocationClick={handleLocationClick}
          />
        </div>

        {/* Modal */}
        <AntofagastaModal
          isOpen={isOpen}
          onClose={handleCloseModal}
          location={selectedLocationData}
          gradient={pageStyles.antofagasta.modal.gradient}
        />
      </div>
    </main>
  );
};

export default Antofagasta;
