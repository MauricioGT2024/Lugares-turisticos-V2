import { memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FaTimes, FaFilter } from 'react-icons/fa';
import { useTinogastaCategories } from './config';


// ImageHoverCard Component
const ImageHoverCard = ({ image, title, description, category, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative h-[400px] rounded-xl overflow-hidden cursor-pointer group"
      onClick={onClick}
    >
      <div className="absolute inset-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

      <motion.div 
        className="absolute inset-x-0 bottom-0 p-6 translate-y-10 group-hover:translate-y-0 transition-transform duration-500"
      >
        <div className="space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500 text-white text-sm font-medium shadow-lg backdrop-blur-sm">
            {category}
          </span>

          <h2 className="text-2xl font-bold text-white">{title}</h2>

          <p className="text-gray-200 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            {description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

ImageHoverCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

// LocationCard Component
export const LocationCard = ({ location, onShowDetails }) => {
  return (
    <ImageHoverCard
      image={location.imgSrc}
      title={location.name}
      description={location.description}
      category={location.category}
      onClick={() => onShowDetails(location)}
    />
  );
};

const MotionButton = motion.button;

// AreaFilter Component
export const AreaFilter = memo(({ areaFilter, setAreaFilter }) => {
  const { categories } = useTinogastaCategories();

  return (
    <div className='relative py-8'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className='max-w-4xl inline-grid mx-auto rounded-2xl backdrop-blur-md bg-white/5 p-6 border border-white/10'
      >
        <div className='flex items-center justify-around mb-6'>
          <div className='flex items-center gap-2'>
            <FaFilter className='text-purple-400' />
            <h3 className='text-lg font-medium text-purple-400'>
              Filtrar por categoría
            </h3>
          </div>

          {areaFilter && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setAreaFilter('')}
              className='text-purple-400 hover:text-purple-300 transition-colors'
            >
              <FaTimes className='w-5 h-5' />
            </motion.button>
          )}
        </div>

        <motion.div
          className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3'
          initial='hidden'
          animate='visible'
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {categories.map((category) => (
            <MotionButton
              key={category}
              onClick={() => setAreaFilter(category)}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                w-full px-4 py-3 rounded-xl font-medium text-sm
                transition-all duration-300
                ${
                  areaFilter === category
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

LocationCard.propTypes = {
  location: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    imgSrc: PropTypes.string.isRequired,
    title: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string.isRequired,
    area: PropTypes.string,
    category: PropTypes.string,
  }).isRequired,
  onShowDetails: PropTypes.func.isRequired,
};
