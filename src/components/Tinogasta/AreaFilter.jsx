import { memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FaTimes, FaFilter } from 'react-icons/fa';
import { useTinogastaCategories } from './hooks/useTinogastaCategories';

const MotionButton = motion.button;

const AreaFilter = memo(({ areaFilter, setAreaFilter }) => {
  const { categories } = useTinogastaCategories();
  
  return (
    <div className="relative py-8">
      {/* Contenedor principal con efecto de cristal */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl inline-grid mx-auto rounded-2xl backdrop-blur-md bg-white/5 p-6 border border-white/10"
      >
        {/* Header del filtro */}
        <div className="flex items-center justify-around mb-6">
          <div className="flex items-center gap-2">
            <FaFilter className="text-purple-400" />
            <h3 className="text-lg font-medium text-purple-400">
              Filtrar por categoría
            </h3>
          </div>
          
          {areaFilter && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setAreaFilter('')}
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              <FaTimes className="w-5 h-5" />
            </motion.button>
          )}
        </div>

        {/* Grid de botones de categoría */}
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
        >
          {categories.map((category) => (
            <MotionButton
              key={category}
              onClick={() => setAreaFilter(category)}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                w-full px-4 py-3 rounded-xl font-medium text-sm
                transition-all duration-300
                ${areaFilter === category 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-white/5 hover:bg-white/10 text-gray-200'
                }
                border border-white/10 hover:border-purple-500/30
              `}
            >
              {category}
            </MotionButton>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
});

AreaFilter.displayName = 'AreaFilter';

AreaFilter.propTypes = {
  areaFilter: PropTypes.string.isRequired,
  setAreaFilter: PropTypes.func.isRequired,
};

export default AreaFilter;
