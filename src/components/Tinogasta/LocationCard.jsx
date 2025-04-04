import React from "react";
import PropTypes from "prop-types";
import LocationCard from "../LocationCard";

const TinogastaLocationCard = ({ location, onShowDetails }) => {
  return (
    <LocationCard
      location={location}
      onShowDetails={onShowDetails}
      config={{
        colorScheme: "purple",
      }}
    />
  );
};

TinogastaLocationCard.propTypes = {
  location: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    wiki: PropTypes.string.isRequired,
    iframe: PropTypes.string.isRequired,
    mapUrl: PropTypes.string.isRequired,
  }).isRequired,
  onShowDetails: PropTypes.func.isRequired,
};

export default React.memo(TinogastaLocationCard);
