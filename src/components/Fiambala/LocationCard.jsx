import React from "react";
import PropTypes from "prop-types";
import LocationCard from "../LocationCard";
import { CATEGORY_CONFIG } from "./CategoryConfig";

const FiambalaLocationCard = ({ location, onShowDetails }) => {
  const config = CATEGORY_CONFIG[location.category] || {};

  return (
    <LocationCard
      location={location}
      onShowDetails={onShowDetails}
      config={{
        colorScheme: config.colorScheme || "gray",
        color: config.color || "gray.800",
        darkColor: config.darkColor || "whiteAlpha.900",
        icon: config.icon,
        gradient: config.gradient || "linear(to-r, gray.400, gray.600)",
        category: location.category,
      }}
    />
  );
};

FiambalaLocationCard.propTypes = {
  location: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    imgSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    mapSrc: PropTypes.string.isRequired,
    path: PropTypes.string,
    wiki: PropTypes.string,
    category: PropTypes.string.isRequired,
  }).isRequired,
  onShowDetails: PropTypes.func.isRequired,
};

export default React.memo(FiambalaLocationCard);
