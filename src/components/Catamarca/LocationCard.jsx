import React from "react";
import PropTypes from "prop-types";
import LocationCard from "../LocationCard";
import { AREA_CONFIG } from "./AreaConfig";
import { getIconByArea } from "./icons";

const CatamarcaLocationCard = ({ location, onShowDetails }) => {
  const { colorScheme } = AREA_CONFIG[location.area] || { colorScheme: "gray" };
  const icon = getIconByArea(location.area);

  return (
    <LocationCard
      location={location}
      onShowDetails={onShowDetails}
      config={{
        colorScheme: colorScheme,
        color: `${colorScheme}.500`,
        icon: icon,
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
