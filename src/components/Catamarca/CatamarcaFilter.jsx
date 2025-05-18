import React, { useMemo } from "react";
import PropTypes from "prop-types";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { m } from "framer-motion";

// Internal
import { locations } from "@/data/catamarca"; // Assuming locations are needed here to get unique areas
import AreaFilter from "./AreaFilter";
import { ANIMATIONS } from "./animations"; // Assuming ANIMATIONS are needed for the filter container
import { getAreaTheme } from "./areaThemes"; // Assuming getAreaTheme is needed for AreaFilter styling

const CatamarcaFilter = ({ filters, setFilters }) => {
  const areas = useMemo(
    () => [...new Set(locations.map((loc) => loc.area))].sort(),
    []
  );

  const selectedArea = filters.area || "all";

  const handleAreaChange = (area) => {
    setFilters((prev) => ({ ...prev, area }));
  };

  return (
    <m.div
      variants={ANIMATIONS.container} // Using ANIMATIONS from Catamarca animations
      className="flex flex-wrap justify-center gap-7 py-4"
    >
      <RadioGroup.Root value={selectedArea} onValueChange={handleAreaChange}>
        <RadioGroup.Item value="all" asChild>
          <AreaFilter area="Todos" isSelected={selectedArea === "all"} />
        </RadioGroup.Item>
        {areas.map((area) => {
          const theme = getAreaTheme(area);
          return (
            <RadioGroup.Item key={area} value={area} asChild>
             
              <AreaFilter
                area={area}
                isSelected={selectedArea === area}
                gradient={theme.gradient}
                icon={theme.icon}
              />
            </RadioGroup.Item>
          );
        })}
      </RadioGroup.Root>
    </m.div>
  );
};

CatamarcaFilter.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
};

export default CatamarcaFilter;
