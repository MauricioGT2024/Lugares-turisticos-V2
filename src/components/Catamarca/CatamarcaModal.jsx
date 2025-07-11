import React, { Fragment, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CatamarcaModal = ({ isOpen, onClose, location }) => {
  const closeRef = useRef(null);
  const { title, imgSrc, description, area, mapSrc, path } = location || {};

  const modalVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 40, scale: 0.98 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
      },
      exit: {
        opacity: 0,
        y: 40,
        scale: 0.95,
        transition: { duration: 0.25, ease: "easeInOut" },
      },
    }),
    []
  );

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={onClose}
        initialFocus={closeRef}
      >
        {/* BACKDROP */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
        </Transition.Child>

        {/* MODAL CONTENT */}
        <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-6">
          <Transition.Child
            as={motion.div}
            className="relative w-full max-w-5xl mx-auto overflow-hidden rounded-2xl bg-white dark:bg-gray-900/90 shadow-2xl ring-1 ring-black/10 dark:ring-white/10"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* HEADER IMAGE */}
            <div className="relative w-full h-56 sm:h-64 md:h-72 lg:h-80 overflow-hidden">
              <img
                src={imgSrc}
                alt={title}
                className="w-full h-full object-cover object-center"
              />
              {/* BADGE */}
              <div className="absolute top-4 left-4 bg-teal-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
                {area}
              </div>
              {/* CLOSE BUTTON */}
              <button
                ref={closeRef}
                onClick={onClose}
                className=" absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full p-2 shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                aria-label="Cerrar"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* BODY */}
            <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-300 dark:divide-gray-700">
              {/* Left - Description */}
              <div className="w-full md:w-1/2 p-6 space-y-3">
                <Dialog.Title className=" text-2xl font-bold text-gray-900 dark:text-white">
                  {title}
                </Dialog.Title>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {description}
                </p>
              </div>

              {/* Right - Media */}
              <div className="w-full md:w-1/2 p-6 flex items-center justify-center">
                <motion.iframe
                  key={mapSrc}
                  src={mapSrc}
                  loading="lazy"
                  title={`Vista interactiva de ${title}`}
                  className="w-full h-64 sm:h-80 md:h-64 lg:h-[250px] rounded-lg shadow-lg"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex justify-between items-center px-6 py-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => window.open(path, "_blank")}
                className="px-4 py-2 text-sm rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                Ver Mapa
              </button>

              {path && (
                <Link
                  to={path}
                  className="px-4 py-2 text-sm rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition"
                >
                  Ver más detalle de {title}
                </Link>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

CatamarcaModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  location: PropTypes.shape({
    title: PropTypes.string,
    imgSrc: PropTypes.string,
    description: PropTypes.string,
    area: PropTypes.string,
    badge: PropTypes.string,
    iframeSrc: PropTypes.string,
    path: PropTypes.string,
  }),
};

export default CatamarcaModal;
