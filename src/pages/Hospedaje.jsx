import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { Hero } from "../components/Hospedaje/Hero";
import { Filter } from "../components/Hospedaje/Filter";
import { LocationGrid } from "../components/Hospedaje/LocationGrid";
import { useHospedajes } from "../hooks/useHospedaje";
import Modal from "../components/Hospedaje/Modal";

const Hospedaje = () => {
  const { colorMode } = useTheme();
  const isDark = colorMode === "dark";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const { locations, locationFilter, setLocationFilter, filteredHospedajes } =
    useHospedajes();

  // Estilos dinámicos basados en el tema
  const styles = {
    mainBg: "bg-gray-50 dark:bg-gray-900",
    textColor: "text-gray-900 dark:text-gray-100",
    sectionBg: "bg-white dark:bg-gray-800",
    borderColor: "border-neutral- dark:border-neutral-600",
  };

  const handleLocationClick = (id) => {
    const location = filteredHospedajes.find((loc) => loc.id === id);
    if (location) {
      // Sanitizar la URL del iframe antes de establecer la ubicación
      const sanitizedLocation = {
        ...location,
        iframe: location.iframe?.replace(/&amp;/g, "&"),
      };
      setSelectedLocation(sanitizedLocation);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLocation(null);
  };

  return (
    <main
      className={`min-h-screen transition-colors duration-300 ${styles.mainBg}`}
    >
      <div className="container mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="space-y-10">
          {/* Hero Section */}
          <Hero
            badge="Alojamiento"
            title={
              <h1
                className={`text-4xl font-bold ${styles.textColor} md:text-5xl`}
              >
                Hospedajes en Catamarca
              </h1>
            }
            subtitle={
              <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>
                Encuentra el lugar perfecto para tu estadía
              </p>
            }
          />

          {/* Filtros */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-xl border p-6 ${styles.sectionBg} ${styles.borderColor}`}
          >
            <Filter
              title="Ubicaciones"
              items={locations}
              selected={locationFilter}
              onSelect={setLocationFilter}
              isDark={isDark}
            />
          </motion.section>

          {/* Grid de Hospedajes */}
          <AnimatePresence mode="wait">
            <LocationGrid
              locations={filteredHospedajes}
              onLocationClick={handleLocationClick}
              isDark={isDark}
            />
          </AnimatePresence>
        </div>
      </div>

      {/* Modal de detalles */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        location={selectedLocation}
        isDark={isDark}
      />
    </main>
  );
};

export default Hospedaje;
