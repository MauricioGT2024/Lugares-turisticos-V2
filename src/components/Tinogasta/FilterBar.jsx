import { memo } from 'react';
import { motion } from 'framer-motion';
import FilterGroup from '../FilterSystem/FilterGroup';
import { useTinogastaCategories } from './config';

const FilterBar = memo(({ filter, setFilter }) => {
  const { categories } = useTinogastaCategories();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto mb-12"
    >
      <FilterGroup
        title="Explorar por categoría"
        items={categories}
        selected={filter}
        onSelect={setFilter}
        showIcons={true}
      />
    </motion.div>
  );
});

FilterBar.displayName = 'FilterBar';

export default FilterBar;
