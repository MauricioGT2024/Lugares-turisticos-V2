// Tinogasta.jsx
import { useState, useMemo, useCallback } from 'react';
import { useColorMode, useDisclosure } from '@chakra-ui/react';
import { motion, } from 'framer-motion';

import { locations } from '../data/tinogasta';
import LocationModal from '../components/Tinogasta/LocationModal';
import LocationGrid from '../components/Tinogasta/LocationGrid';
import FilterBar from '../components/Tinogasta/FilterBar';

const Tinogasta = () => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [filter, setFilter] = useState('');

  const filteredLocations = useMemo(
    () => locations.filter((loc) => !filter || loc.category === filter),
    [filter]
  );

  const openModal = useCallback((location) => {
    setSelectedLocation(location);
    onOpen();
  }, [onOpen]);

  const closeModal = useCallback(() => {
    onClose();
    setSelectedLocation(null);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`min-h-screen py-12 transition-colors duration-300 ${
        isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <header className="text-center mb-16 space-y-6">
          <span className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold uppercase tracking-wider shadow-lg">
            Explora Tinogasta
          </span>
          <h1 className="text-5xl md:text-6xl font-bold font-mono bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
            Tinogasta
          </h1>
          <p className="max-w-3xl mx-auto text-xl leading-relaxed">
            Descubre Tinogasta, donde la tradición vitivinícola se une con paisajes impresionantes y una rica historia cultural.
          </p>
        </header>

        <FilterBar filter={filter} setFilter={setFilter} />

        <LocationGrid locations={filteredLocations} onLocationClick={openModal} />

        {selectedLocation && (
          <LocationModal
            location={selectedLocation}
            isOpen={isOpen}
            onClose={closeModal}
            isDark={isDark}
          />
        )}
      </div>
    </motion.div>
  );
};

export default Tinogasta;
