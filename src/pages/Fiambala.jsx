import React from 'react';


import { locations } from '../data/fiambala'; // Keep locations data

import LocationPage from '@/components/common/LocationPage'; // Import LocationPage
import FiambalaFilter from '@/components/Fiambala/FiambalaFilter'; // Import the new filter component
import FiambalaLocationCard from '@/components/Tinogasta/LocationCard'; // Use the existing location card
import FiambalaModalContent from '@/components/Fiambala/FiambalaModalContent'; // Import the new modal content

const filterFiambalaLocations = (locations, filters) => {
  const selectedCategory = filters.category === undefined ? '' : filters.category; // Default to '' for Todos
  return selectedCategory === ''
    ? locations
    : locations.filter((loc) => loc.category === selectedCategory);
};

const Fiambala = () => {

  return (
    <LocationPage
      title="Fiambalá"
      description="Tierra de historia, termas y paisajes entre volcanes y valles."
      locations={locations}
      filterComponent={FiambalaFilter} // Use the extracted filter component
      locationCardComponent={FiambalaLocationCard} // Use the existing location card component
      modalContent={FiambalaModalContent} // Use the new modal content component
      pageVariants={{
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.5 } },
        exit: { opacity: 0, transition: { duration: 0.3 } },
      }} // Using a simple fade animation as an example
      filterFunction={filterFiambalaLocations} // Pass the filter logic
    />
  );
};

export default React.memo(Fiambala);
