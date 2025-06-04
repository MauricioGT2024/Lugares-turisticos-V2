import { useState, useMemo, useCallback } from 'react';
import {
  useColorMode,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { FaMapMarkerAlt, FaInfoCircle } from 'react-icons/fa';
import { locations } from '../data/catamarca';
import {
  ANIMATIONS,
  AreaFilter,
  LocationCard,
  filterAnimations,
  getAreaTheme,
} from '../components/Catamarca';
import React from 'react';

// Componente Modal extraído para mayor modularidad
const LocationModal = ({ isOpen, onClose, location, isDark }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      isCentered
      motionPreset="slideInBottom"
    >
      <ModalOverlay backdropFilter="blur(8px)" bg="blackAlpha.600" />
      <ModalContent bg={isDark ? 'gray.800' : 'white'}>
        {location && (
          <>
            <ModalHeader
              className={`bg-gradient-to-r ${getAreaTheme(location.area).gradient} text-white`}
            >
              {location.title}
            </ModalHeader>
            <ModalCloseButton color="white" />
            <ModalBody py={6}>
              <div className="rounded-lg overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 mb-4">
                <iframe
                  title={location.title}
                  src={location.mapSrc}
                  className="w-full h-[300px]"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
              <p className={isDark ? 'text-gray-200' : 'text-gray-700'}>
                {location.description}
              </p>
            </ModalBody>
            <ModalFooter gap={2}>
              {location.path && (
                <IconButton
                  as="a"
                  href={location.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ver en mapa"
                  icon={<FaMapMarkerAlt />}
                  colorScheme="blue"
                  variant="ghost"
                />
              )}
              {location.wiki && (
                <IconButton
                  as="a"
                  href={location.wiki}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Más información"
                  icon={<FaInfoCircle />}
                  colorScheme="teal"
                  variant="ghost"
                />
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

const Catamarca = () => {
  const [selectedArea, setSelectedArea] = useState('all');
  const [selectedLocationData, setSelectedLocationData] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  // Extraer las áreas únicas una sola vez
  const areas = useMemo(() => {
    return [...new Set(locations.map((loc) => loc.area))].sort();
  }, []);

  // Calcular las ubicaciones filtradas según el área seleccionada
  const filteredLocations = useMemo(() => {
    return selectedArea === 'all'
      ? locations
      : locations.filter((loc) => loc.area === selectedArea);
  }, [selectedArea]);

  // Manejo de la apertura del modal
  const openModal = useCallback(
    (id) => {
      const foundLocation = locations.find((loc) => loc.id === id);
      if (foundLocation) {
        setSelectedLocationData(foundLocation);
        onOpen();
      }
    },
    [onOpen]
  );

  // Manejo del cierre del modal, con un setTimeout para limpiar la data
  const closeModal = useCallback(() => {
    onClose();
    // Se podría reemplazar setTimeout por un callback basado en el fin de la animación
    setTimeout(() => setSelectedLocationData(null), 300);
  }, [onClose]);

  // Consolidar la clase de fondo principal
  const mainBg = isDark
    ? 'bg-gradient-to-b from-gray-900 to-gray-800'
    : 'bg-gradient-to-b from-gray-50 to-white';

  return (
    <LayoutGroup>
      <main className={`min-h-screen py-12 ${mainBg} transition-colors duration-300`}>
        <div className="container mx-auto max-w-7xl px-4">
          <div className="space-y-10">
            {/* Sección de Encabezado */}
            <motion.div {...ANIMATIONS.fadeInDown} className="text-center space-y-6">
              <span
                className="inline-block px-6 py-2 rounded-full text-sm font-medium bg-yellow-400 text-white uppercase tracking-wide shadow-sm"
              >
                Capital Histórica
              </span>
              <motion.h1
                className="text-5xl font-bold bg-gradient-to-r from-yellow-400 via-green-400 to-yellow-400 bg-clip-text text-transparent"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                San Fernando del Valle
              </motion.h1>
              <p className={`text-xl max-w-2xl mx-auto leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Descubre los tesoros escondidos de la capital catamarqueña
              </p>
            </motion.div>

            {/* Sección de Filtros */}
            <motion.div variants={ANIMATIONS.container} className="flex flex-wrap justify-center gap-4 py-4">
              <AreaFilter
                area="Todos"
                isSelected={selectedArea === 'all'}
                onClick={() => setSelectedArea('all')}
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

            {/* Sección de Grid */}
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
                    <LocationCard location={location} onShowDetails={openModal} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Modal para mostrar detalles de la ubicación */}
        <LocationModal
          isOpen={isOpen}
          onClose={closeModal}
          location={selectedLocationData}
          isDark={isDark}
        />
      </main>
    </LayoutGroup>
  );
};

export default React.memo(Catamarca);
