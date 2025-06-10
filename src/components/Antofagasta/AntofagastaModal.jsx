import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
} from "@headlessui/react";

import { motion } from "framer-motion";

const AntofagastaModal = ({ location, isOpen, onClose }) => {
  if (!location) return null;

  const { title, imgSrc, description } = location;

  // Clases reutilizables con soporte dark
  const buttonClasses =
    "inline-flex justify-center rounded-lg px-6 py-3 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 transition-colors duration-200 dark:bg-teal-700 dark:hover:bg-teal-600";
  const panelClasses =
    "w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all dark:bg-gray-900 dark:shadow-black/60";
  const titleClasses =
    "text-3xl font-bold text-teal-900 mb-4 dark:text-teal-400";
  const descriptionClasses =
    "text-lg text-teal-700 leading-relaxed dark:text-teal-300";
  const imgClasses = "w-full h-80 object-cover rounded-lg mb-6";

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-teal-900/75 dark:bg-black/80"
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 flex w-screen items-center justify-center p-4"
      >
        <DialogPanel className={panelClasses}>
          <div className="relative">
            <img src={imgSrc} alt={title} className={imgClasses} />
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-400 to-teal-600 dark:from-teal-700 dark:to-teal-500" />
          </div>

          <DialogTitle as="h3" className={titleClasses}>
            {title}
          </DialogTitle>

          <Description className="mt-4">
            <p className={descriptionClasses}>{description}</p>
          </Description>

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              className={buttonClasses}
              onClick={onClose}
              aria-label="Cerrar modal"
            >
              Cerrar
            </button>
          </div>
        </DialogPanel>
      </motion.div>
    </Dialog>
  );
};

export default AntofagastaModal;
