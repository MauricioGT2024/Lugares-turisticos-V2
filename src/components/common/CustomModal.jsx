import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

const MotionModalContent = motion(ModalContent);

const CustomModal = ({
  isOpen,
  onClose,
  title,
  children,
  headerGradient,
  footer,
  size = "xl"
}) => {
  const modalBg = useColorModeValue("white", "gray.800");

  return (
    <AnimatePresence>
      {isOpen && (
        <Modal 
          isOpen={isOpen} 
          onClose={onClose} 
          size={size} 
          isCentered
          motionPreset="none"
        >
          <ModalOverlay 
            bg="blackAlpha.700" 
            backdropFilter="blur(5px)"
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <MotionModalContent
            bg={modalBg}
            borderRadius="xl"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
          >
            <ModalHeader
              borderTopRadius="xl"
              bgGradient={headerGradient}
              color="white"
              py={4}
            >
              {title}
            </ModalHeader>
            <ModalCloseButton
              color="white"
              _focus={{ boxShadow: "none" }}
              _hover={{ bg: "whiteAlpha.300" }}
            />
            <ModalBody py={6}>
              {children}
            </ModalBody>
            {footer && (
              <ModalFooter borderBottomRadius="xl">
                {footer}
              </ModalFooter>
            )}
          </MotionModalContent>
        </Modal>
      )}
    </AnimatePresence>
  );
};

CustomModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  headerGradient: PropTypes.string,
  footer: PropTypes.node,
  size: PropTypes.string
};

export default CustomModal;
