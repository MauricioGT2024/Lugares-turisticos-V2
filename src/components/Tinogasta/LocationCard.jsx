import React from 'react';
import PropTypes from 'prop-types';
import ImageHoverCard from './ImageHoverCard';

const LocationCard = ({ location, onShowDetails }) => {
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

LocationCard.propTypes = {
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

export default React.memo(LocationCard);
