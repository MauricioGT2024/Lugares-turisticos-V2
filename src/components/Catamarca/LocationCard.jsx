// components/Catamarca/LocationCard.jsx
import React from "react";
import PropTypes from "prop-types";
import { getAreaTheme } from "@/components/Catamarca/areaThemes";
import BaseImageHoverCard from "@/components/common/BaseImageHoverCard";

const CatamarcaLocationCard = ({
  location: { imgSrc, title, description, area }, // Destructuring 'area'
  onShowDetails,
}) => {
  const config = getAreaTheme(area);

  return (
    <BaseImageHoverCard
      imgSrc={imgSrc}
      title={title}
      description={description}
      badge={area} // Using 'area' for the badge
      icon={config.icon}
      onClick={onShowDetails}
      variant="catamarca"
      styleConfig={{
        overlayGradient: "linear(to-t, cyan.600, transparent)",
        badgeBg: config.badgeBg, // Assuming badgeBg comes from config based on area
        height: "300px",
      }}
      aria-label={`Más información sobre ${title}`}
    />
  );
};

CatamarcaLocationCard.propTypes = {
  location: PropTypes.shape({
    imgSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired, // Requiring 'area'
    // Removed category from propTypes as it's not used by this component
  }).isRequired,
  onShowDetails: PropTypes.func.isRequired,
};

export default CatamarcaLocationCard;
