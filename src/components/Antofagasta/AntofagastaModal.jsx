import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { XMarkIcon, BookOpenIcon, MapPinIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import React from 'react';

const AntofagastaModal = ({ isOpen, onClose, location }) => {
  if (!location) return null;

  const modalVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, y: 30, scale: 0.98, transition: { duration: 0.2, ease: "easeIn" } },
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm transition-opacity" aria-hidden="true" />
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
                className="relative w-full max-w-3xl lg:max-w-4xl transform rounded-2xl bg-white dark:bg-gray-800 shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
              >
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 z-10 p-2.5 rounded-full bg-white/15 text-white hover:bg-white/25 backdrop-blur-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/60"
                  aria-label="Cerrar modal"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>

                {/* Header with Image and Title */}
                <div className="relative h-56 sm:h-64 md:h-72 lg:h-80 overflow-hidden">
                  <img
                    src={location.imgSrc}
                    alt={location.title}
                    className="w-full h-full object-cover brightness-[0.75]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 p-5 sm:p-7 w-full text-white">
                    <Dialog.Title className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight drop-shadow-sm">
                      {location.title}
                    </Dialog.Title>
                    <span className="inline-flex items-center mt-2 px-3 py-1 text-xs font-medium rounded-full bg-orange-500/80 text-white uppercase tracking-wide">
                      {location.lugar}
                    </span>
                  </div>
                </div>

                {/* Modal Content - Description and Map */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8">
                  {/* Description */}
                  <div className="text-gray-700 dark:text-gray-300 overflow-y-auto max-h-[300px] pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">Acerca de {location.title}</h3>
                    <p className="text-base leading-relaxed whitespace-pre-wrap">{location.description}</p>
                  </div>

                  {/* Map */}
                  <div className="rounded-lg overflow-hidden shadow-md aspect-w-16 aspect-h-9 w-full h-64 md:h-auto border border-gray-100 dark:border-gray-700">
                    <iframe
                      src={location.mapSrc}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-lg"
                      title={`Mapa de ${location.title}`}
                    ></iframe>
                  </div>
                </div>

                {/* Footer - Links */}
                <div className="flex flex-wrap justify-center sm:justify-end items-center px-6 py-5 sm:p-8 border-t border-gray-100 dark:border-gray-800 gap-3">
                  {location.path && (
                    <a
                      href={location.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-5 py-2 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 transition-colors duration-200 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                      aria-label="Más información"
                    >
                      <BookOpenIcon className="w-4 h-4" />
                      <span>Más Información</span>
                    </a>
                  )}
                  {location.mapSrc && (
                    <a
                      href={location.mapSrc}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-5 py-2 bg-green-500 text-white rounded-full text-sm font-medium hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-500 transition-colors duration-200 shadow-sm focus:outline-none focus:ring-1 focus:ring-green-400"
                      aria-label="Ver en Google Maps"
                    >
                      <MapPinIcon className="w-4 h-4" />
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

export default React.memo(AntofagastaModal);