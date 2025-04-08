import { useState, useMemo, useCallback } from 'react';
import {
  useColorMode,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Link,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInfoCircle } from 'react-icons/fa';
import { locations } from '../data/fiambala';
import LocationCard from '../components/Fiambala/LocationCard';
import { CATEGORY_CONFIG } from '../components/Fiambala/CategoryConfig';
import FilterGroup from '../components/FilterSystem/FilterGroup';
import { FIAMBALA_ANIMATIONS, filterAnimations } from '../components/Fiambala/config/animations';

const Fiambala = () => {
  const [categoryFilter, setCategoryFilter] = useState('');
  const [selectedLocationData, setSelectedLocationData] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();

  const categories = Object.keys(CATEGORY_CONFIG);

  const handleShowDetails = useCallback((id) => {
    const location = locations.find((loc) => loc.id === id);
    if (location) {
      setSelectedLocationData(location);
      onOpen();
    }
  }, [onOpen]);

  const handleCloseModal = () => {
    onClose();
    setTimeout(() => setSelectedLocationData(null), 300);
  };

  const filteredLocations = useMemo(
    () =>
      categoryFilter
        ? locations.filter((loc) => loc.category === categoryFilter)
        : locations,
    [categoryFilter]
  );

  return (
    <motion.main
      variants={FIAMBALA_ANIMATIONS.pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`min-h-screen py-12 ${
        colorMode === 'dark' 
          ? 'bg-gradient-to-b from-gray-900 to-gray-800' 
          : 'bg-gradient-to-b from-gray-50 to-white'
      }`}
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="space-y-8">
          {/* Header Section */}
          <motion.div
            variants={FIAMBALA_ANIMATIONS.container}
            className="text-center space-y-6"
          >
            <span className="inline-block px-6 py-2 rounded-full text-sm font-medium
                           bg-yellow-400 text-white uppercase tracking-wide shadow-sm">
              Explora Fiambalá
            </span>

            <h1 className="text-5xl font-bold font-mono bg-gradient-to-r 
                         from-yellow-400 via-orange-400 to-red-500
                         bg-clip-text text-transparent
                         hover:after:scale-x-100 hover:after:opacity-100
                         relative after:absolute after:bottom-0 after:left-0
                         after:w-full after:h-0.5 after:bg-gradient-to-r
                         after:from-yellow-400 after:via-orange-400 after:to-red-500
                         after:transform after:scale-x-0 after:opacity-0
                         after:transition-all after:duration-300 after:ease-in-out">
              Fiambalá
            </h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={`text-xl max-w-3xl mx-auto italic
                ${colorMode === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
            >
              Donde el desierto se encuentra con las termas, creando un oasis
              de aventura y relax en el corazón de Catamarca
            </motion.p>
          </motion.div>

          {/* Filter Section */}
          <FilterGroup
            title='Categorías'
            items={categories}
            selected={categoryFilter}
            onSelect={setCategoryFilter}
            colorScheme="yellow"
          />

          {/* Grid Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout" initial={false}>
              {filteredLocations.map((loc) => (
                <motion.div
                  key={loc.id}
                  variants={filterAnimations}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                >
                  <LocationCard
                    location={loc}
                    onShowDetails={handleShowDetails}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        size="xl"
        isCentered
        motionPreset="slideInBottom"
        scrollBehavior="inside"
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
            bgGradient={
              selectedLocationData
                ? (CATEGORY_CONFIG[selectedLocationData.category] || {}).gradient
                : 'linear(to-r, gray.400, gray.600)'
            }
            color="white"
            fontFamily="mono"
          >
            {selectedLocationData?.title || 'Detalles'}
          </ModalHeader>
          <ModalCloseButton
            color="white"
            _hover={{ bg: 'whiteAlpha.300' }}
          />

          <ModalBody py={6}>
            {selectedLocationData && (
              <div className="space-y-4">
                <div className="rounded-lg overflow-hidden shadow-md border 
                              dark:border-gray-700 h-[300px]">
                  <iframe
                    title={selectedLocationData.title}
                    src={selectedLocationData.mapSrc}
                    className="w-full h-full"
                    loading="lazy"
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
            justifyContent="space-between"
          >
            <div>
              {selectedLocationData?.path && (
                <Link
                  href={selectedLocationData.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium
                             text-teal-600 border border-teal-600 rounded-md
                             hover:bg-teal-600 hover:text-white transition"
                >
                  <FaInfoCircle className="mr-2" />
                  Más Info
                </Link>
              )}
            </div>
            <button
              onClick={handleCloseModal}
              className="px-4 py-2 text-sm font-medium text-gray-600
                         bg-gray-100 rounded-md hover:bg-gray-200 transition"
            >
              Cerrar
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </motion.main>
  );
};

export default Fiambala;
