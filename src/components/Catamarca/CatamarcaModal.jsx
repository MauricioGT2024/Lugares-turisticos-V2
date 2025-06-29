import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { XMarkIcon, BookOpenIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import React from "react";

const CatamarcaModal = ({ isOpen, onClose, location }) => {
  if (!location) return null;

  const modalVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.35, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: 40,
      scale: 0.95,
      transition: { duration: 0.25, ease: "easeIn" },
    },
  };

  // Colores acento verdes para botones
  const greenPrimary = "#3B7A57"; // verde natural oscuro
  const greenHover = "#2E5D43";   // verde más oscuro para hover

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Overlay con blur y oscurecido */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-90"
          leave="ease-in duration-200"
          leaveFrom="opacity-90"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
          />
        </Transition.Child>

        {/* Modal Container */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 sm:p-6 lg:p-8">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transform transition ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full max-w-3xl lg:max-w-4xl transform rounded-3xl bg-white dark:bg-gray-900 shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                {/* Header with Image */}
                <div className="relative h-56 sm:h-64 md:h-72 lg:h-80 overflow-hidden rounded-t-3xl">
                  <img
                    src={location.imgSrc}
                    alt={location.title}
                    className="w-full h-full object-cover brightness-90"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" aria-hidden="true" />
                  <div className="absolute bottom-4 left-6 sm:bottom-6 sm:left-8 w-[calc(100%-3rem)] text-white">
                    <Dialog.Title className="text-3xl sm:text-4xl font-extrabold leading-tight drop-shadow-lg">
                      {location.title}
                    </Dialog.Title>
                    <span className="inline-block mt-2 px-4 py-1 text-sm font-semibold rounded-full bg-green-700/90 shadow-md">
                      {location.area}
                    </span>
                  </div>
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
                    aria-label="Cerrar modal"
                  >
                    <XMarkIcon className="w-7 h-7" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 text-gray-800 dark:text-gray-300 max-h-[480px] overflow-y-auto">
                  {/* Description */}
                  <p className="text-base leading-relaxed whitespace-pre-wrap">
                    {location.description}
                  </p>

                  {/* Map */}
                  <div className="rounded-xl overflow-hidden shadow-lg aspect-w-16 aspect-h-9 w-full h-64 md:h-auto border border-gray-300 dark:border-gray-700">
                    <iframe
                      src={location.mapSrc}
                      width="100%"
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-xl"
                      title={`Mapa de ${location.title}`}
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="flex flex-wrap justify-center sm:justify-end items-center px-6 py-5 sm:p-8 border-t border-gray-200 dark:border-gray-700 gap-4">
                  {location.wiki && (
                    <a
                      href={location.wiki}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-5 py-2 rounded-full text-sm font-medium shadow-md transform transition duration-200 hover:scale-105"
                      style={{ backgroundColor: greenPrimary, color: "white" }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = greenHover)}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = greenPrimary)}
                      aria-label="Más información"
                    >
                      <BookOpenIcon className="w-5 h-5" />
                      <span>Más Información</span>
                    </a>
                  )}
                  {location.path && (
                    <a
                      href={location.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-5 py-2 rounded-full text-sm font-medium shadow-md transform transition duration-200 hover:scale-105"
                      style={{ backgroundColor: "#2D6A4F", color: "white" }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#1B4332")}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#2D6A4F")}
                      aria-label="Ver en Google Maps"
                    >
                      <MapPinIcon className="w-5 h-5" />
                      <span>Ver en Mapa</span>
                    </a>
                  )}
                </div>
              </motion.div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default React.memo(CatamarcaModal);
