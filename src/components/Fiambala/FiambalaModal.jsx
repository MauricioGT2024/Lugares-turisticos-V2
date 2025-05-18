import React from 'react';
import PropTypes from 'prop-types';
import * as Dialog from '@radix-ui/react-dialog';
import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

// Import the modal content component
import FiambalaModalContent from './FiambalaModalContent';

// Simple animation variants for the modal
const modalVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

const FiambalaModal = ({ isOpen, onClose, location }) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm data-[state=open]:animate-overlayShow" />
      <Dialog.Content
        asChild
       
      >
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={modalVariants}
          // Tailwind classes for modal container - Centering with inset-0 and m-auto
          className="fixed inset-0 m-auto max-h-[85vh] w-[90vw] max-w-2xl z-50 rounded-2xl shadow-2xl focus:outline-none overflow-hidden
                     bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        >
           {/* Close Button in the top right corner */}
           {/* Using Radix Dialog.Close to handle closing logic */}
           <Dialog.Close asChild>
              <button
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 focus:outline-none transition-colors"
                aria-label="Cerrar modal"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </Dialog.Close>

          {/* Render the modal content, pass location data */} 
          {location && <FiambalaModalContent location={location} />} {/* Conditionally render content */}

           {/* Footer content (buttons) is handled within FiambalaModalContent */} 

        </motion.div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

FiambalaModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  location: PropTypes.object, // location can be null when modal is closed
};

export default FiambalaModal;
