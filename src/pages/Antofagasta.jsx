import React from 'react';
// import { useColorMode } from '@chakra-ui/react'; // Removed Chakra import
import { locations } from '@/data/antofagasta';
import { ANTOFAGASTA_ANIMATIONS } from '@/components/Antofagasta/animations';
// Removed: import CategoryFilterButton, AntofagastaLocationItem, motion, AnimatePresence, LayoutGroup, useState, useMemo

// Import common and Antofagasta-specific components
import LocationPage from '@/components/common/LocationPage';
import AntofagastaFilter from '@/components/Antofagasta/AntofagastaFilter';
import AntofagastaLocationCard from '@/components/Antofagasta/LocationCard'; // The card itself
import AntofagastaModalContent from '@/components/Antofagasta/AntofagastaModalContent'; // The modal content

// Define the filter function specific to Antofagasta (by 'categoria')
const filterAntofagastaLocations = (locations, filters) => {
  const selectedCategory = filters.category || 'Todos';
  return selectedCategory === 'Todos'
    ? locations
    : locations.filter((loc) => loc.categoria === selectedCategory);
};

const Antofagasta = () => {

  return (
    <LocationPage
      title="Antofagasta de la Sierra"
      description="Donde el desierto de altura se encuentra con volcanes milenarios y salares brillantes, creando paisajes únicos en la Puna catamarqueña."
      locations={locations}
      filterComponent={AntofagastaFilter} // Pass the specific filter component
      locationCardComponent={AntofagastaLocationCard} // Pass the card component
      modalContent={AntofagastaModalContent} // Pass the modal content component
      pageVariants={ANTOFAGASTA_ANIMATIONS.pageVariants} // Pass page animations
      filterFunction={filterAntofagastaLocations} // Pass the filter logic
    />
  );
};

export default React.memo(Antofagasta);
