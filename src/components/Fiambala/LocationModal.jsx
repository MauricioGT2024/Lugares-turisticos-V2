import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useColorMode,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { FaInfoCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { CATEGORY_CONFIG } from "./components";

const LocationModal = ({ location, isOpen, onClose }) => {
  const { colorMode } = useColorMode();
  if (!location) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered motionPreset="slideInBottom">
      <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(6px)" />
      <ModalContent bg={colorMode === "dark" ? "gray.800" : "white"} className="rounded-xl shadow-2xl">
        <ModalHeader className={`p-4 ${CATEGORY_CONFIG[location.category]?.bgClass || "bg-gray-600"} text-white`}>
          <h2 className="text-xl font-bold drop-shadow-md">{location.title}</h2>
        </ModalHeader>
        <ModalCloseButton className="text-white hover:bg-white/20" />

        <ModalBody className="p-6 space-y-6">
          <motion.div className="h-[300px] rounded-lg overflow-hidden shadow-lg" initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.3 }}>
            <iframe title={location.title} src={location.mapSrc} className="w-full h-full border-0" loading="lazy" />
          </motion.div>
          <p className={`text-lg ${colorMode === "dark" ? "text-gray-200" : "text-gray-700"}`}>{location.description}</p>
        </ModalBody>

        <ModalFooter className="space-x-3">
          {location.path && (
            <a
              href={location.path}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border border-teal-500 text-teal-500 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors"
            >
              <FaInfoCircle className="mr-2" />
              Más Info
            </a>
          )}
          <button onClick={onClose} className={`px-4 py-2 text-sm font-medium rounded-lg ${colorMode === "dark" ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"} transition-colors`}>
            Cerrar
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

LocationModal.propTypes = {
  location: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default LocationModal;
