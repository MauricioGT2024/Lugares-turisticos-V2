import { useState, useMemo, useCallback, Suspense } from 'react';
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
  IconButton,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { locations } from '../data/tinogasta';
import LocationCard from '../components/Tinogasta/LocationCard';
import { TINOGASTA_ANIMATIONS } from '../components/Tinogasta/config/animations';
import AreaFilter from '../components/Tinogasta/AreaFilter';
import { FaMapMarkerAlt, FaWikipediaW, FaTimes, FaWineGlass, FaMountain } from 'react-icons/fa';

const Tinogasta = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [areaFilter, setAreaFilter] = useState('');
  const { colorMode } = useColorMode();

  const handleShowDetails = useCallback((locationId) => {
    const location = locations.find((loc) => loc.id === locationId);
    if (location) {
      setSelectedLocation(location);
      onOpen();
    }
  }, [onOpen]);

  const handleCloseModal = useCallback(() => {
    onClose();
    setTimeout(() => setSelectedLocation(null), 200);
  }, [onClose]);

  const filteredLocations = useMemo(
    () => locations.filter((loc) => !areaFilter || loc.category === areaFilter),
    [areaFilter]
  );

  const isDark = colorMode === 'dark';

  return (
    <motion.div
      variants={TINOGASTA_ANIMATIONS.pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`min-h-screen py-12 ${
        isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      } transition-colors duration-200`}
    >
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Header Section */}
        <motion.header
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8 mb-16"
        >
          <motion.span 
            className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white 
                     text-sm font-medium uppercase tracking-wider shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explora Tinogasta
          </motion.span>

          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold font-['JetBrains_Mono'] 
                         bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 
                         bg-clip-text text-transparent">
              Tinogasta
            </h1>

            <div className="flex justify-center gap-6">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-2 text-purple-500"
              >
                <FaWineGlass className="w-5 h-5" />
                <span>Región Vitivinícola</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-2 text-purple-500"
              >
                <FaMountain className="w-5 h-5" />
                <span>Paisajes Únicos</span>
              </motion.div>
            </div>

            <p className="text-xl max-w-3xl mx-auto leading-relaxed">
              Descubre Tinogasta, donde la tradición vitivinícola se une 
              con paisajes impresionantes y una rica historia cultural.
            </p>
          </div>
        </motion.header>

        {/* Filter Section */}
        <div className="mb-12">
          <Suspense fallback={<div>Cargando filtros...</div>}>
            <AreaFilter
              areaFilter={areaFilter}
              setAreaFilter={setAreaFilter}
            />
          </Suspense>
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
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <LocationCard
                  location={loc}
                  onShowDetails={() => handleShowDetails(loc.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal Mejorado */}
      <Modal 
        isOpen={isOpen} 
        onClose={handleCloseModal}
        size="xl"
        isCentered
        motionPreset="slideInBottom"
      >
        <ModalOverlay backdropFilter="blur(10px)" bg="blackAlpha.600" />
        <ModalContent
          bg={isDark ? 'gray.800' : 'white'}
          className="rounded-xl overflow-hidden shadow-2xl"
        >
          {selectedLocation && (
            <>
              <ModalHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <h2 className="text-xl font-bold">{selectedLocation.name}</h2>
              </ModalHeader>
              <ModalCloseButton className="text-white hover:bg-white/20" />
              
              <ModalBody className="p-6 space-y-6">
                <motion.img
                  src={selectedLocation.imgSrc}
                  alt={selectedLocation.name}
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                />
                
                <p className={`text-lg ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                  {selectedLocation.description}
                </p>

                <div className="rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    src={selectedLocation.iframe}
                    className="w-full h-[300px] border-0"
                    allowFullScreen
                    title={selectedLocation.name}
                  />
                </div>
              </ModalBody>

              <ModalFooter className="space-x-3">
                {selectedLocation.wiki && (
                  <IconButton
                    as="a"
                    href={selectedLocation.wiki}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Ver en Wikipedia"
                    icon={<FaWikipediaW />}
                    colorScheme="purple"
                    variant="ghost"
                  />
                )}
                {selectedLocation.mapUrl && (
                  <IconButton
                    as="a"
                    href={selectedLocation.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Ver en Google Maps"
                    icon={<FaMapMarkerAlt />}
                    colorScheme="blue"
                    variant="ghost"
                  />
                )}
                <IconButton
                  onClick={handleCloseModal}
                  aria-label="Cerrar"
                  icon={<FaTimes />}
                  colorScheme="red"
                  variant="ghost"
                />
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </motion.div>
  );
};

export default Tinogasta;
