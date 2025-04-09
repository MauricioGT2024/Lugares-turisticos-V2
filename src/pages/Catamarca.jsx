import { useState, useMemo, useCallback } from "react";
import { useColorMode } from "@chakra-ui/react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { FaMapMarkerAlt, FaInfoCircle, FaTimes } from "react-icons/fa";
import { 
  AreaFilter, 
  CatamarcaLocationCard as LocationCard, 
  ANIMATION_PRESETS as animations,
  getAreaTheme 
} from "../components/Catamarca";
import { locations } from "../data/catamarca";
import { filterAnimations } from "../components/Catamarca/config/animations";
import React from "react";

const Catamarca = () => {
  const [selectedArea, setSelectedArea] = useState("all");
  const [selectedLocationData, setSelectedLocationData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  

  const { filteredLocations, areas } = useMemo(() => {
    const filtered =
      selectedArea === "all"
        ? locations
        : locations.filter((loc) => loc.area === selectedArea);

    const uniqueAreas = [...new Set(locations.map((loc) => loc.area))].sort();
    return { filteredLocations: filtered, areas: uniqueAreas };
  }, [selectedArea]);

  const openModal = useCallback((id) => {
    const foundLocation = locations.find((loc) => loc.id === id);
    if (foundLocation) {
      setSelectedLocationData(foundLocation);
      setIsModalOpen(true);
    }
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedLocationData(null), 300);
  }, []);

  return (
    <LayoutGroup>
      <main className={`
        min-h-screen py-12 
        ${isDark 
          ? 'bg-gradient-to-b from-gray-900 to-gray-800' 
          : 'bg-gradient-to-b from-gray-50 to-white'}
        transition-colors duration-300
      `}>
        <div className="container mx-auto max-w-7xl px-4">
          <div className="space-y-10">
            {/* Header Section */}
            <motion.div {...animations.fadeInDown} className="text-center space-y-6">
              <span className="inline-block px-6 py-2 rounded-full text-sm font-medium 
                             bg-yellow-400 text-white uppercase tracking-wide shadow-sm">
                Capital Histórica
              </span>

              <motion.h1 
                className="text-5xl font-bold bg-gradient-to-r from-yellow-400 via-green-400 to-yellow-400 
                         bg-clip-text text-transparent"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                San Fernando del Valle
              </motion.h1>

              <p className={`text-xl max-w-2xl mx-auto leading-relaxed
                ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Descubre los tesoros escondidos de la capital catamarqueña
              </p>
            </motion.div>

            {/* Filter Section */}
            <motion.div variants={animations.container} className="flex flex-wrap justify-center gap-4 py-4">
              <AreaFilter
                area="Todos"
                isSelected={selectedArea === "all"}
                onClick={() => setSelectedArea("all")}
              />
              {areas.map((area) => (
                <AreaFilter
                  key={area}
                  area={area}
                  isSelected={selectedArea === area}
                  onClick={() => setSelectedArea(area)}
                />
              ))}
            </motion.div>

            {/* Grid Section */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout" initial={false}>
                {filteredLocations.map((location) => (
                  <motion.div
                    key={location.id}
                    variants={filterAnimations}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                  >
                    <LocationCard
                      location={location}
                      onShowDetails={openModal}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Modal */}
        <AnimatePresence>
          {isModalOpen && selectedLocationData && (
            <div className="fixed inset-0 z-50 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm"
                onClick={closeModal}
              />
              
              <div className="min-h-screen px-4 text-center">
                <div className="inline-block align-middle my-8 w-full max-w-xl">
                  <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`
                      relative rounded-xl overflow-hidden shadow-2xl 
                      ${isDark ? 'bg-gray-800' : 'bg-white'}
                      text-left
                    `}
                  >
                    {/* Modal Header */}
                    <div className={`
                      relative px-6 py-4
                      bg-gradient-to-r ${getAreaTheme(selectedLocationData.area).gradient}
                    `}>
                      <h3 className="text-xl font-bold text-white">
                        {selectedLocationData.title}
                      </h3>
                      <button
                        onClick={closeModal}
                        className="absolute right-4 top-4 text-white/80 hover:text-white transition-colors"
                      >
                        <FaTimes className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Modal Body */}
                    <div className="p-6 space-y-6">
                      <div className="rounded-lg overflow-hidden shadow-md border border-gray-200 dark:border-gray-700">
                        <iframe
                          title={selectedLocationData.title}
                          src={selectedLocationData.mapSrc}
                          className="w-full h-[300px]"
                          loading="lazy"
                          allowFullScreen
                        />
                      </div>
                      <p className={`leading-relaxed ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                        {selectedLocationData.description}
                      </p>
                    </div>

                    {/* Modal Footer */}
                    <div className={`
                      flex justify-end gap-3 px-6 py-4
                      border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}
                    `}>
                      {selectedLocationData.path && (
                        <a
                          href={selectedLocationData.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium 
                                   text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 
                                   rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
                        >
                          <FaMapMarkerAlt />
                          Ver en Mapa
                        </a>
                      )}
                      {selectedLocationData.wiki && (
                        <a
                          href={selectedLocationData.wiki}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium 
                                   text-teal-600 dark:text-teal-400 border border-teal-600 dark:border-teal-400 
                                   rounded-lg hover:bg-teal-600 hover:text-white transition-colors"
                        >
                          <FaInfoCircle />
                          Más Info
                        </a>
                      )}
                      <button
                        onClick={closeModal}
                        className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 
                                 border border-red-600 dark:border-red-400 rounded-lg 
                                 hover:bg-red-600 hover:text-white transition-colors"
                      >
                        Cerrar
                      </button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </LayoutGroup>
  );
};

export default React.memo(Catamarca);
