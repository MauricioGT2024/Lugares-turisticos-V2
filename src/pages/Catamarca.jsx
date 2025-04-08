import { useState, useMemo, useCallback } from "react";
import {
  useColorMode,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { FaMapMarkerAlt, FaInfoCircle,  } from "react-icons/fa";
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();

  const themeConfig = useMemo(() => {
    if (!selectedLocationData) return null;
    return getAreaTheme(selectedLocationData.area);
  }, [selectedLocationData]);

  const { filteredLocations, areas } = useMemo(() => {
    const filtered =
      selectedArea === "all"
        ? locations
        : locations.filter((loc) => loc.area === selectedArea);

    const uniqueAreas = [...new Set(locations.map((loc) => loc.area))].sort();
    return { filteredLocations: filtered, areas: uniqueAreas };
  }, [selectedArea]);

  const handleShowDetails = useCallback(
    (id) => {
      const foundLocation = locations.find((loc) => loc.id === id);
      if (foundLocation) {
        setSelectedLocationData(foundLocation);
        onOpen();
      }
    },
    [onOpen]
  );

  const handleCloseModal = useCallback(() => {
    onClose();
    setSelectedLocationData(null);
  }, [onClose]);

  return (
    <LayoutGroup>
      <main className={`min-h-screen py-12 ${
        colorMode === 'dark' ? 'bg-gradient-to-b from-gray-900 to-gray-800' 
        : 'bg-gradient-to-b from-gray-50 to-white'
      }`}>
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
                ${colorMode === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
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
                      onShowDetails={handleShowDetails}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Modal */}
        <Modal 
          isOpen={isOpen} 
          onClose={handleCloseModal}
          isCentered
          motionPreset="slideInBottom"
          scrollBehavior="inside"
          size="xl"
        >
          <ModalOverlay backdropFilter="blur(5px)" bg="blackAlpha.700" />
          <ModalContent 
            bg={colorMode === 'dark' ? 'gray.800' : 'white'}
            rounded="xl"
            overflow="hidden"
            mx={4}
          >
            <ModalHeader
              py={4}
              bgGradient={themeConfig?.gradient || 'linear(to-r, gray.400, gray.600)'}
              color="white"
            >
              {selectedLocationData?.title}
            </ModalHeader>
            <ModalCloseButton color="white" />

            <ModalBody py={6}>
              {selectedLocationData && (
                <div className="space-y-6">
                  <div className="rounded-lg overflow-hidden shadow-md border border-gray-200 dark:border-gray-700">
                    <iframe
                      title={selectedLocationData.title}
                      src={selectedLocationData.mapSrc}
                      className="w-full h-[300px]"
                      loading="lazy"
                      allowFullScreen
                    />
                  </div>
                  <p className={`
                    leading-relaxed
                    ${colorMode === 'dark' ? 'text-gray-200' : 'text-gray-700'}
                  `}>
                    {selectedLocationData.description}
                  </p>
                </div>
              )}
            </ModalBody>

            <ModalFooter 
              borderTop="1px" 
              borderColor={colorMode === 'dark' ? 'gray.700' : 'gray.100'}
              gap={2}
            >
              {selectedLocationData?.path && (
                <a
                  href={selectedLocationData.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition"
                >
                  <FaMapMarkerAlt className="mr-2" />
                  Ver en Mapa
                </a>
              )}
              {selectedLocationData?.wiki && (
                <a
                  href={selectedLocationData.wiki}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-teal-600 border border-teal-600 rounded-lg hover:bg-teal-600 hover:text-white transition"
                >
                  <FaInfoCircle className="mr-2" />
                  Más Info
                </a>
              )}
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-600 rounded-lg hover:bg-gray-600 hover:text-white transition"
              >
                Cerrar
              </button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </main>
    </LayoutGroup>
  );
};

export default React.memo(Catamarca);
