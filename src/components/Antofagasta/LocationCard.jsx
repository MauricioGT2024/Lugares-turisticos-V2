import React from 'react';
import PropTypes from 'prop-types';
import ImageHoverCard from './ImageHoverCard';

const LocationCard = ({ location, onShowDetails }) => {
  return (
    <ImageHoverCard
      image={location.imgSrc}
      title={location.title}
      description={location.description}
      category={location.categoria}
      onClick={() => onShowDetails(location.id)}
    />
  );
};

LocationCard.propTypes = {
  location: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    imgSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    categoria: PropTypes.string.isRequired,
  }).isRequired,
  onShowDetails: PropTypes.func.isRequired,
};

export default React.memo(LocationCard);
