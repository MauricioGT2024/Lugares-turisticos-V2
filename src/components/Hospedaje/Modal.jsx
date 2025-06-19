import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";

const Modal = ({ isOpen, onClose, location }) => (
  <AnimatePresence>
    {isOpen && location && (
      <Dialog open={true} onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
        <motion.div className="fixed inset-0 bg-black/50 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
        <motion.div className="fixed inset-0 flex items-center justify-center p-4" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}>
          <Dialog.Panel className="relative w-full max-w-4xl p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <IoClose size={24} />
            </button>
            <div className="space-y-4">
              <Dialog.Title className="text-2xl font-bold text-gray-900 dark:text-white">{location.title}</Dialog.Title>
              <p className="text-gray-600 dark:text-gray-300">{location.description}</p>
              {location.iframe && (
                <div className="aspect-video w-full rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <iframe src={location.iframe.replace(/&amp;/g, "&")} title={location.title} width="100%" height="100%" allowFullScreen loading="lazy" className="w-full h-full" />
                </div>
              )}
              <div className="flex justify-between text-sm mt-4">
                <span className="text-gray-600 dark:text-gray-300">Ubicación: {location.location}</span>
                <a href={location.mapUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">
                  Ver en Google Maps
                </a>
              </div>
            </div>
          </Dialog.Panel>
        </motion.div>
      </Dialog>
    )}
  </AnimatePresence>
);
export default Modal;
