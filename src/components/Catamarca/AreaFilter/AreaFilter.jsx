import { memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useColorMode } from '@chakra-ui/react';
import { getIconByArea } from '../config/icons';

const AreaFilter = memo(({ area, isSelected, onClick }) => {
  const { colorMode } = useColorMode();
  const Icon = getIconByArea(area);
  
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        inline-flex items-center gap-2 px-4 py-2
        rounded-full text-sm font-medium shadow-sm
        transition-all duration-200 ease-in-out
        ${isSelected 
          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-indigo-500/25'
          : colorMode === 'dark'
            ? 'bg-gray-800 text-gray-200 hover:bg-gray-700 border border-gray-700'
            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
        }
        ${isSelected ? 'scale-105' : ''}
      `}
    >
      <Icon className="w-4 h-4" />
      <span>{area}</span>
    </motion.button>
  );
});

AreaFilter.displayName = 'AreaFilter';

AreaFilter.propTypes = {
  area: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default AreaFilter;
