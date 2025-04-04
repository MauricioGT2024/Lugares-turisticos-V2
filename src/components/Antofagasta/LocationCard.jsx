import React from "react";
import PropTypes from "prop-types";
import LocationCard from "../LocationCard";
import { categoryConfig } from "./categoryConfig";

const AntofagastaLocationCard = ({ location, onShowDetails }) => {
  const config = categoryConfig[location.categoria] || categoryConfig.Campo;

  return (
    <LocationCard
      location={location}
      onShowDetails={onShowDetails}
      config={{
        colorScheme: config.color.split(".")[0],
        color: config.color,
        darkColor: `${config.color.split('.')[0]}.300`,
        icon: config.icon,
        gradient: config.gradient,
        category: location.categoria,
      }}
    />
  );
};

AntofagastaLocationCard.propTypes = {
  location: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    imgSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    mapSrc: PropTypes.string.isRequired,
    path: PropTypes.string,
    wiki: PropTypes.string,
    categoria: PropTypes.string.isRequired,
    area: PropTypes.string,
  }).isRequired,
  onShowDetails: PropTypes.func.isRequired,
};

export default React.memo(AntofagastaLocationCard);
