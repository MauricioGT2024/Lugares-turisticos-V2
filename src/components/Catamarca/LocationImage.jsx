import React from 'react';
import { Image, AspectRatio } from "@chakra-ui/react";
import { motion } from "framer-motion";
import PropTypes from 'prop-types';

const LocationImage = React.memo(({ src, alt }) => (
  <AspectRatio ratio={16 / 9}>
    <Image
      as={motion.img}
      src={src}
      alt={alt}
      objectFit="cover"
      w="full"
      h="full"
      transition="0.3s ease"
      _hover={{ transform: "scale(1.05)" }}
      loading="lazy"
      fallbackSrc="/placeholder.jpg"
    />
  </AspectRatio>
));

LocationImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

LocationImage.displayName = 'LocationImage';

export default LocationImage;
