import React from 'react';
import PropTypes from 'prop-types';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import BaseLocationCard from '../Locations/LocationCard';
import { cardAnimation } from './animations';

const MotionBox = motion(Box);

const TinogastaLocationCard = ({ location, onShowDetails }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <MotionBox
      initial={cardAnimation.initial}
      animate={cardAnimation.animate}
      exit={cardAnimation.exit}
      transition={cardAnimation.transition}
    >
      <BaseLocationCard
        location={location}
        onShowDetails={onShowDetails}
        colorScheme="purple"
        bg={bgColor}
        borderColor={borderColor}
      />
    </MotionBox>
  );
};

TinogastaLocationCard.propTypes = {
  location: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    wiki: PropTypes.string,
    iframe: PropTypes.string,
    mapUrl: PropTypes.string,
  }).isRequired,
  onShowDetails: PropTypes.func.isRequired,
};

export default React.memo(TinogastaLocationCard);
