// React
import { useState } from "react";
import PropTypes from "prop-types";

// Internal Components
import CatamarcaLocationCard from "./LocationCard";
import CatamarcaModal from "./CatamarcaModal";
import { getAreaTheme } from "@/components/Catamarca/areaThemes";

const CatamarcaLocationItem = ({ location }) => {
  const [isOpen, setIsOpen] = useState(false);
  const config = getAreaTheme(location.area);

  return (
    <>
      <CatamarcaLocationCard
        location={location}
        config={config}
        onClick={() => setIsOpen(true)}
      />

      <CatamarcaModal
        location={location}
        title={location.title}
        description={location.description}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        config={config}
      />
    </>
  );
};

CatamarcaLocationItem.propTypes = {
  location: PropTypes.object.isRequired,
};

export default CatamarcaLocationItem;
