import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useColorMode } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';


const MediaModal = ({ isOpen, onClose, place }) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <AnimatePresence>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered motionPreset="slideInBottom">
          <ModalOverlay backdropFilter="blur(10px)" bg="blackAlpha.700" as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <ModalContent
            as={motion.div}
            initial={{ scale: 0.95, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 40 }}
            transition={{ duration: 0.35 }}
            bg={isDark ? 'gray.800' : 'white'}
            borderRadius="2xl"
            className="overflow-hidden shadow-2xl"
          >
            <ModalHeader className="font-bold text-2xl bg-gradient-to-r from-teal-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">
              {place.name}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody className="p-0">
              <div className="w-full aspect-[4/3] bg-black/10 flex items-center justify-center overflow-hidden">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover object-center"
                  style={{ maxHeight: 400 }}
                  loading="lazy"
                />
              </div>
              {/* Iframe de mapa si existe */}
              {place.mapSrc && (
                <div className="w-full mt-4 aspect-[4/3] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow">
                  <iframe
                    src={place.mapSrc}
                    title={place.name}
                    className="w-full h-full min-h-[300px]"
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              )}
              <div className="p-6">
                <p className={isDark ? 'text-gray-200' : 'text-gray-700'}>{place.description}</p>
                <div className="flex flex-wrap gap-3 mt-6">
                  {place.path && (
                    <a
                      href={place.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2 rounded-full bg-gradient-to-r from-teal-500 to-amber-500 text-white font-semibold shadow hover:scale-105 hover:shadow-lg transition-all duration-300"
                    >
                      Ver en mapa
                    </a>
                  )}
                  {place.wiki && (
                    <a
                      href={place.wiki}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold shadow hover:scale-105 hover:shadow-lg transition-all duration-300"
                    >
                      Más información
                    </a>
                  )}
                </div>
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </AnimatePresence>
  );
};

MediaModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  place: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    mapSrc: PropTypes.string,
    path: PropTypes.string,
    wiki: PropTypes.string,
  }).isRequired,
};

export default MediaModal;
