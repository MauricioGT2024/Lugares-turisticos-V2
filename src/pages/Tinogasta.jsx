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
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { locations } from '../data/tinogasta';
import LocationCard from '../components/Tinogasta/LocationCard';
import { TINOGASTA_ANIMATIONS, filterAnimations } from '../components/Tinogasta/config/animations';
import AreaFilter from '../components/Tinogasta/AreaFilter';
import { FaMapMarkerAlt, FaWikipediaW, FaTimes } from 'react-icons/fa';

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
      <div className="container mx-auto px-4 md:px-8 max-w-8xl">
        <LayoutGroup>
          <div className="flex flex-col items-center space-y-8">
            <motion.header
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
              className="text-center w-full max-w-4xl"
            >
              <div className="flex flex-col items-center space-y-6">
                <motion.span 
                  className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-md uppercase tracking-wider shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explora Tinogasta
                </motion.span>
                <h1 className="text-5xl md:text-6xl font-bold font-['JetBrains_Mono'] bg-gradient-to-r from-purple-400 via-red-400 to-orange-400 bg-clip-text text-transparent hover:bg-gradient-to-r hover:from-red-400 hover:via-orange-400 hover:to-purple-400 transition-all duration-300">
                  Tinogasta
                </h1>
                <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
                  Descubre Tinogasta, una joya en el oeste de Catamarca, donde la tradición vitivinícola 
                  se une con paisajes impresionantes y una rica historia cultural.
                </p>
              </div>
            </motion.header>

            <Suspense fallback={<div>Cargando filtros...</div>}>
              <AreaFilter
                areaFilter={areaFilter}
                setAreaFilter={setAreaFilter}
                variants={TINOGASTA_ANIMATIONS.filterVariants}
              />
            </Suspense>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
              <AnimatePresence mode="popLayout">
                {filteredLocations.map((loc) => (
                  <motion.div
                    key={loc.id}
                    variants={filterAnimations}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                    className="group"
                  >
                    <LocationCard
                      location={loc}
                      onShowDetails={() => handleShowDetails(loc.id)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </LayoutGroup>
      </div>

      <Modal 
        isOpen={isOpen} 
        onClose={handleCloseModal}
        motionPreset="slideInBottom"
        size="xl"
        isCentered
      >
        <ModalOverlay backdropFilter="blur(10px)" bg="blackAlpha.600" />
        <ModalContent
          bg={isDark ? 'gray.800' : 'white'}
          borderRadius="xl"
          mx={4}
        >
          {selectedLocation && (
            <>
              <ModalHeader>{selectedLocation.name}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <motion.img
                  src={selectedLocation.imgSrc}
                  alt={selectedLocation.name}
                  className="w-full rounded-lg mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.p 
                  className="mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {selectedLocation.description}
                </motion.p>
                <motion.div 
                  className="rounded-lg overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <iframe
                    src={selectedLocation.iframe}
                    className="w-full h-[300px] border-0"
                    allowFullScreen
                    title={selectedLocation.name}
                  />
                </motion.div>
              </ModalBody>
              <ModalFooter gap={2}>
                <IconButton
                  as="a"
                  href={selectedLocation.wiki}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ver en Wikipedia"
                  icon={<FaWikipediaW />}
                  variant="ghost"
                  colorScheme="purple"
                />
                <IconButton
                  as="a"
                  href={selectedLocation.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ver en Google Maps"
                  icon={<FaMapMarkerAlt />}
                  variant="ghost"
                  colorScheme="blue"
                />
                <IconButton
                  onClick={handleCloseModal}
                  aria-label="Cerrar modal"
                  icon={<FaTimes />}
                  colorScheme="red"
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
