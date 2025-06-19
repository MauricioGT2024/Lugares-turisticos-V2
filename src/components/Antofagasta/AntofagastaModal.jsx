import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { XMarkIcon, BookOpenIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

const AntofagastaModal = ({ isOpen, onClose, location }) => {
  if (!location) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Overlay oscuro */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 dark:bg-black/60" />
        </Transition.Child>

        {/* Contenedor modal con animación framer-motion */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-6">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full max-w-5xl transform overflow-hidden rounded-xl bg-white dark:bg-gray-900 shadow-xl transition-all"
              >
                {/* HEADER */}
                <div className="flex flex-col md:flex-row p-6 gap-6 border-b dark:border-gray-700 items-center">
                  {/* Izquierda: título + badge */}
                  <div className="md:w-1/2 space-y-1 flex flex-col justify-center items-center">
                    <Dialog.Title className="text-xl font-semibold text-gray-800 dark:text-white">
                      {location.title}
                    </Dialog.Title>
                    <span className="inline-block px-2 py-1 text-xs font-medium text-white bg-purple-600/90 rounded w-16 self-center text-center m-40">
                      {location.lugar}
                    </span>
                  </div>

                  {/* Derecha: imagen */}
                  <div className="md:w-1/2">
                    <img
                      src={location.imgSrc}
                      alt={location.title}
                      className="w-full h-48 md:h-64 object-cover rounded"
                    />
                  </div>
                </div>

                {/* BODY */}
                <div className="flex flex-col md:flex-row p-6 gap-6">
                  {/* Descripción */}
                  <div className="md:w-1/2 text-gray-700 dark:text-gray-300 overflow-y-auto">
                    <p className="text-base leading-relaxed">
                      {location.description}
                    </p>
                  </div>

                  {/* Mapa */}
                  <div className="md:w-1/2 h-64">
                    <iframe
                      src={location.mapSrc}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded"
                      name={`Mapa de ${location.title}`}
                    ></iframe>
                  </div>
                </div>

                {/* FOOTER */}
                <div className="flex justify-between items-center px-6 py-4 border-t dark:border-gray-700">
                  <div className="flex space-x-6">
                    {location.path && (
                      <a
                        href={location.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:underline"
                        aria-label="Ir a Wikipedia"
                      >
                        <BookOpenIcon className="w-5 h-5" />
                      </a>
                    )}
                    {location.mapUrl && (
                      <a
                        href={location.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:underline"
                        aria-label="Ver en Google Maps"
                      >
                        <MapPinIcon className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                  <button
                    onClick={onClose}
                    className="flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
                    aria-label="Cerrar modal"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
              </motion.div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AntofagastaModal;
