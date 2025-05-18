import React from "react";

import { locations } from "@data/tinogasta"; // Datos de localizaciones de Tinogasta
import LocationPage from "@/components/common/LocationPage"; // Componente que gestiona el diseño y estado de la página
import TinogastaFilter from "@/components/Tinogasta/TinogastaFilter"; // Filtro específico de Tinogasta
import TinogastaLocationCard from "@/components/Tinogasta/LocationCard"; // Componente para mostrar cada localización
import TinogastaModalContent from "@/components/Tinogasta/TinogastaModalContent";

// Función de filtro para Tinogasta, filtra por 'category' si está definido
const filterTinogastaLocations = (locations, { category = "" }) => {
  // Filtra las ubicaciones por categoría si se ha seleccionado alguna
  return category
    ? locations.filter((loc) => loc.category === category)
    : locations;
};

const Tinogasta = () => {
  return (
    <LocationPage
      title="Tinogasta"
      description="Tierra de historia, termas y paisajes entre volcanes y valles."
      locations={locations}
      filterComponent={TinogastaFilter} // Componente del filtro
      locationCardComponent={TinogastaLocationCard} // Componente de la tarjeta de localización
      modalContent={TinogastaModalContent} // Contenido del modal
      pageVariants={{
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.5 } },
        exit: { opacity: 0, transition: { duration: 0.3 } },
      }} // Animaciones de fade para la página
      filterFunction={filterTinogastaLocations} // Función de filtrado
    />
  );
};

export default React.memo(Tinogasta);
