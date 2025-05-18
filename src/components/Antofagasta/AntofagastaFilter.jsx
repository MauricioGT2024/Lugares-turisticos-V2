import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { locations } from '@/data/antofagasta';
import CategoryFilterButton from './CategoryFilterButton';
import { motion } from 'framer-motion';
import { ANTOFAGASTA_ANIMATIONS } from './animations';

const CATEGORY_ALL = 'Todos';

const AntofagastaFilter = ({ filters, setFilters }) => {
  // Assuming filters is an object like { category: '...' }
  const selectedCategory = filters.category || CATEGORY_ALL;

  // Categories unique to Antofagasta locations + "Todos"
  const categories = useMemo(() => {
    const uniqueCategories = new Set(locations.map((loc) => loc.categoria));
    return [CATEGORY_ALL, ...Array.from(uniqueCategories).sort()];
  }, []);

  const handleCategoryChange = (category) => {
    setFilters(prev => ({ ...prev, category }));
  };

  return (
    <motion.div
      variants={ANTOFAGASTA_ANIMATIONS.headerVariants} // Using headerVariants for filter animation
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-wrap justify-center gap-3 mb-10"
    >
      {categories.map((cat) => (
        <CategoryFilterButton
          key={cat}
          item={cat}
          selected={selectedCategory === cat}
          onClick={() => handleCategoryChange(cat)}
          aria-pressed={selectedCategory === cat}
        />
      ))}
    </motion.div>
  );
};

AntofagastaFilter.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
};

export default AntofagastaFilter;
