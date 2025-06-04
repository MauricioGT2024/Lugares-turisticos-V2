import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  IconButton,
} from '@chakra-ui/react';
import { FaWikipediaW, FaMapMarkerAlt, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

const LocationModal = ({ location, isOpen, onClose, isDark }) => (
  <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered motionPreset="slideInBottom">
    <ModalOverlay backdropFilter="blur(10px)" bg="blackAlpha.600" />
    <ModalContent
      bg={isDark ? 'gray.800' : 'white'}
      className="rounded-xl overflow-hidden shadow-2xl"
    >
      <ModalHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <h2 className="text-xl font-bold">{location.name}</h2>
      </ModalHeader>
      <ModalCloseButton className="text-white hover:bg-white/20" />

      <ModalBody className="p-6 space-y-6">
        <motion.img
          src={location.imgSrc}
          alt={location.name}
          className="w-full h-64 object-cover rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        />
        <p className={isDark ? 'text-gray-200' : 'text-gray-700'}>{location.description}</p>

        {location.iframe && (
          <div className="rounded-lg overflow-hidden shadow-lg">
            <iframe
              src={location.iframe}
              className="w-full h-[300px] border-0"
              allowFullScreen
              title={location.name}
            />
          </div>
        )}
      </ModalBody>

      <ModalFooter className="space-x-3">
        {location.wiki && (
          <IconButton
            as="a"
            href={location.wiki}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver en Wikipedia"
            icon={<FaWikipediaW />}
            colorScheme="purple"
            variant="ghost"
          />
        )}
        {location.mapUrl && (
          <IconButton
            as="a"
            href={location.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver en Google Maps"
            icon={<FaMapMarkerAlt />}
            colorScheme="blue"
            variant="ghost"
          />
        )}
        <IconButton
          onClick={onClose}
          aria-label="Cerrar"
          icon={<FaTimes />}
          colorScheme="red"
          variant="ghost"
        />
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default LocationModal;
