import { memo } from 'react';
import { motion } from 'framer-motion';
import { FaFilter, FaTimes } from 'react-icons/fa';
import { useTinogastaCategories } from './config';

const FilterBar = memo(({ filter, setFilter }) => {
  const { categories } = useTinogastaCategories();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto mb-12 p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-purple-400">
          <FaFilter />
          <h3 className="font-medium text-lg">Filtrar por categoría</h3>
        </div>
        {filter && (
          <button
            onClick={() => setFilter('')}
            className="text-purple-400 hover:text-purple-300 transition-colors"
            aria-label="Limpiar filtro"
          >
            <FaTimes size={18} />
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`py-3 rounded-xl text-sm font-medium w-full transition-all duration-300 ${
              filter === cat
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'bg-white/5 text-gray-200 hover:bg-white/10'
            } border border-white/10 hover:border-purple-500/30`}
          >
            {cat}
          </button>
        ))}
      </div>
    </motion.div>
  );
});

FilterBar.displayName = 'FilterBar';

export default FilterBar;
