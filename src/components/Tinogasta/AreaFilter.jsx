import { memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { useCategoryConfig } from '../Locations/useCategoryConfig';

const MotionButton = motion.button;

const AreaFilter = memo(({ areaFilter, setAreaFilter }) => {
  const { categories } = useCategoryConfig();

  const clearFilter = () => setAreaFilter('');

  const buttonVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
    hover: { scale: 1.05, transition: { duration: 0.1 } },
    tap: { scale: 0.95 },
  };

  return (
    <div className="p-4 rounded-md mx-auto flex flex-col items-center max-w-[100dvh]">
      <div className="flex flex-row flex-wrap gap-2 justify-center items-center w-full">
        {categories.map((category) => (
          <MotionButton
            key={category}
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            onClick={() => setAreaFilter(category)}
            aria-label={`Filtrar por ${category}`}
            className={`
              px-4 py-1 text-sm font-medium rounded-full
              ${areaFilter === category 
                ? 'bg-purple-500 text-white dark:bg-purple-200 dark:text-gray-800' 
                : 'bg-gray-50 text-gray-700 dark:bg-gray-700 dark:text-gray-200'}
              hover:bg-gray-200 dark:hover:bg-gray-600 
              transition-all duration-200
            `}
          >
            {category}
          </MotionButton>
        ))}
      </div>
      {areaFilter && (
        <button
          onClick={clearFilter}
          className="mt-2 p-2 text-purple-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          title="Quitar filtro"
        >
          <FaTimes />
        </button>
      )}
    </div>
  );
});


AreaFilter.displayName = 'AreaFilter';

AreaFilter.propTypes = {
  areaFilter: PropTypes.string.isRequired,
  setAreaFilter: PropTypes.func.isRequired,
};

export default AreaFilter;
