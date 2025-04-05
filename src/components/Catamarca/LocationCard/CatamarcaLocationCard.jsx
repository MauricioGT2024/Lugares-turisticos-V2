import React from "react";
import PropTypes from "prop-types";
import LocationCard from "../../Locations/LocationCard";
import { getAreaTheme, getIconByArea } from "../";

const CatamarcaLocationCard = ({ location, onShowDetails }) => {
  const { colorScheme } = getAreaTheme(location.area);
  const icon = getIconByArea(location.area);

  const handleClick = () => {
    onShowDetails(location.id);
  };

  return (
    <LocationCard
      location={location}
      onClick={handleClick}
      config={{
        colorScheme,
        color: `${colorScheme}.500`,
        icon,
      }}
    />
  );
};

CatamarcaLocationCard.propTypes = {
  location: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    imgSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    mapSrc: PropTypes.string.isRequired,
    path: PropTypes.string,
    wiki: PropTypes.string,
    area: PropTypes.string.isRequired,
  }).isRequired,
  onShowDetails: PropTypes.func.isRequired,
};

export default React.memo(CatamarcaLocationCard);
