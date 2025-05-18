// React
import React from "react";

// Internal
import { locations } from "@/data/catamarca";
import { ANIMATIONS } from "@/components/Catamarca/animations"; // Import ANIMATIONS

// Import common and Catamarca-specific components
import LocationPage from "@/components/common/LocationPage";
import CatamarcaFilter from "@/components/Catamarca/CatamarcaFilter";
import CatamarcaLocationCard from "@/components/Catamarca/LocationCard";
import CatamarcaModalContent from "@/components/Catamarca/CatamarcaModalContent";

// Filter function
const filterCatamarcaLocations = (locations, filters) => {
  const selectedArea = filters.area || "all";
  return selectedArea === "all"
    ? locations
    : locations.filter((loc) => loc.area === selectedArea);
};

const Catamarca = () => {

  return (
    <LocationPage
      title="San Fernando del Valle"
      description="Una ciudad con historia, cultura y naturaleza, rodeada de paisajes imponentes ideales para la aventura y el descanso."
      locations={locations}
      filterComponent={CatamarcaFilter}
      locationCardComponent={CatamarcaLocationCard}
      modalContent={CatamarcaModalContent}
      pageVariants={ANIMATIONS.page} // Corrected: Use ANIMATIONS.page instead of ANIMATIONS.fadeInDown
      filterFunction={filterCatamarcaLocations}
    />
  );
};

export default React.memo(Catamarca);
Catamarca.displayName = "Catamarca";
