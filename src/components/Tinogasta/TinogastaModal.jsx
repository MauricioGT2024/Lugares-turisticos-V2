import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { XMarkIcon, BookOpenIcon, MapPinIcon, LinkIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

const modalVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { 
      type: "tween", 
      ease: "easeOut",
      duration: 0.2 
    }
  },
  exit: { opacity: 0, y: 20, scale: 0.98, transition: { duration: 0.15 } },
};

const TinogastaModal = ({ isOpen, onClose, location }) => {
  if (!location) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Overlay oscuro y minimalista */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </Transition.Child>

        {/* Contenedor modal con animación framer-motion */}
        <div className="fixed inset-0 overflow-y-auto flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full max-w-3xl transform rounded-3xl bg-white dark:bg-gray-800 shadow-xl transition-all border border-gray-100 dark:border-gray-700"
            >
              {/* Close Button - sutil y en la esquina */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                aria-label="Cerrar modal"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>

              {/* IMAGE & MAIN INFO - más integrado, menos gradiente */}
              <div className="relative w-full h-56 rounded-t-3xl overflow-hidden">
                <img
                  src={location.imgSrc}
                  alt={location.name}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute bottom-0 left-0 p-5 text-white w-full bg-gradient-to-t from-black/60 to-transparent">
                  <h2 className="text-2xl font-bold leading-tight drop-shadow-md">
                    {location.name}
                  </h2>
                  {location.category && (
                    <span className="inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide 
                                     bg-white/20 text-white backdrop-blur-sm">
                      {location.category}
                    </span>
                  )}
                </div>
              </div>

              {/* BODY - DESCRIPTION & MAP - diseño más limpio */}
              <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Descripción */}
                <div className="text-gray-700 dark:text-gray-300 overflow-y-auto max-h-80 pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
                  <p className="text-sm leading-relaxed mb-4">
                    {location.description}
                  </p>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 flex items-center space-x-2">
                    <BookOpenIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span>Recursos</span>
                  </h3> 
                  <div className="flex flex-wrap gap-3">
                    {location.wiki && (
                      <a
                        href={location.wiki}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm font-medium 
                                   text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 
                                   border border-blue-200 dark:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors"

                        aria-label="Ir a Wikipedia"
                      >
                        <span>Wikipedia</span>
                      </a>
                    )}
                    {location.mapUrl && (
                      <a
                        href={location.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm font-medium 
                                   text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 
                                   border border-green-200 dark:border-green-600 hover:bg-green-50 dark:hover:bg-green-900 transition-colors"

                        aria-label="Ver en Google Maps"
                      >
                        <span>Google Maps</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Mapa */}
                <div className="h-56 md:h-auto rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                  <iframe
                    src={location.iframe}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Mapa de ${location.name}`}
                  ></iframe>
                </div>
              </div>
            </motion.div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default TinogastaModal;
