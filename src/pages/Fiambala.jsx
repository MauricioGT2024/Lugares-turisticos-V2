import { useState, useMemo, useCallback } from "react";
import { useColorMode, useDisclosure } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { locations } from "../data/fiambala";
import { CATEGORY_CONFIG } from "../components/Fiambala/components";
import FilterGroup from "../components/FilterSystem/FilterGroup";
import { ImageHoverCard } from "../components/Fiambala/components";
import LocationModal from "../components/Fiambala/LocationModal";

const Fiambala = () => {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [selectedLocationData, setSelectedLocationData] = useState(null);
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const categories = useMemo(() => Object.keys(CATEGORY_CONFIG), []);

  const handleShowDetails = useCallback(
    (location) => {
      setSelectedLocationData(location);
      onOpen();
    },
    [onOpen]
  );

  const handleCloseModal = useCallback(() => {
    onClose();
    setTimeout(() => setSelectedLocationData(null), 300);
  }, [onClose]);

  const filteredLocations = useMemo(
    () =>
      categoryFilter
        ? locations.filter((loc) => loc.category === categoryFilter)
        : locations,
    [categoryFilter]
  );

  return (
    <div
      className={`min-h-screen py-12 ${
        colorMode === "dark" ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8 mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-yellow-400 text-white">
            Explora Fiambalá
          </span>
          <h1 className="text-4xl md:text-6xl font-bold font-mono bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 bg-clip-text text-transparent drop-shadow-xl">
            Fiambalá
          </h1>
          <p
            className={`text-xl max-w-3xl mx-auto italic ${
              colorMode === "dark" ? "text-gray-300" : "text-gray-600"
            } drop-shadow-md`}
          >
            Donde el desierto se encuentra con las termas, creando un oasis de
            aventura y relax en el corazón de Catamarca.
          </p>
        </motion.div>

        {/* Filtros */}
        <div className="mb-12">
          <FilterGroup
            title="Categorías"
            items={categories}
            selected={categoryFilter}
            onSelect={setCategoryFilter}
          />
        </div>

        {/* Grid de Locations */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredLocations.map((loc) => (
              <motion.div
                key={loc.id}
                layout
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.3 }}
              >
                <ImageHoverCard
                  location={loc}
                  onShowDetails={handleShowDetails}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal */}
      <LocationModal
        location={selectedLocationData}
        isOpen={isOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Fiambala;
