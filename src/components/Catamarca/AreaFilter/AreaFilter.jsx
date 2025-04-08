import { memo } from 'react';
import { motion } from "framer-motion";
import { useColorMode } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { getIconByArea } from "../";

const AreaFilter = memo(({ area, isSelected, onClick }) => {
  const { colorMode } = useColorMode();
  const AreaIcon = getIconByArea(area);

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        inline-flex items-center gap-2 px-6 py-2.5 rounded-full
        transition-all duration-200 font-medium
        ${isSelected 
          ? 'bg-teal-500 text-white hover:bg-teal-600' 
          : colorMode === 'dark'
            ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border-gray-700'
            : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200'
        }
        ${!isSelected ? 'border' : ''}
      `}
      role="tab"
      aria-selected={isSelected}
    >
      <AreaIcon className="w-4 h-4" />
      <span>{area}</span>
    </motion.button>
  );
});

AreaFilter.propTypes = {
  area: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

AreaFilter.displayName = 'AreaFilter';

export default AreaFilter;
