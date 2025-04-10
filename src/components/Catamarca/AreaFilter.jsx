import { memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useColorMode } from '@chakra-ui/react';
import { ANIMATIONS, getAreaConfig } from './config/constants';

const AreaFilter = memo(({ area, isSelected, onClick }) => {
  const { colorMode } = useColorMode();
  const { icon: Icon } = getAreaConfig(area);

  return (
    <motion.button
      variants={ANIMATIONS.filter}
      whileHover="hover" 
      whileTap="tap"
      onClick={onClick}
      className={`
        inline-flex items-center gap-2 px-6 py-2
        rounded-full font-medium shadow-md
        transition-all duration-300
        backdrop-blur-sm
        ${isSelected 
          ? 'bg-gradient-to-r from-yellow-400 via-green-400 to-yellow-400 text-white shadow-yellow-500/30'
          : colorMode === 'dark'
            ? 'bg-gray-800/50 text-gray-200 hover:bg-gray-700/70'
            : 'bg-white/50 text-gray-700 hover:bg-gray-50/80'
        }
        border border-transparent hover:border-yellow-500/30
      `}
    >
      <Icon className={`w-4 h-4 ${isSelected ? 'scale-110' : 'scale-100'}`} />
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
