import { memo } from 'react';
import { motion } from "framer-motion";
import { useColorMode } from "@chakra-ui/react";
import PropTypes from 'prop-types';

const LocationImage = memo(({ src, alt }) => {
  const { colorMode } = useColorMode();

  return (
    <div className="relative aspect-video overflow-hidden">
      <motion.img
        src={src}
        alt={alt}
        className={`
          w-full h-full object-cover transition-transform duration-300 
          group-hover:scale-105
          ${colorMode === 'dark' ? 'brightness-90' : 'brightness-100'}
        `}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        loading="lazy"
        onError={(e) => {
          e.target.src = '/placeholder.jpg';
        }}
      />
    </div>
  );
});

LocationImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

LocationImage.displayName = 'LocationImage';

export default LocationImage;
