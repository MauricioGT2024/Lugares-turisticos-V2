import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { FaInfoCircle, FaMapMarkerAlt, FaTimes } from "react-icons/fa";
import clsx from "clsx";

const CatamarcaModal = ({ location, isOpen, setIsOpen }) => {
  const { title, name, imgSrc, description, mapSrc, area, path } =
    location || {};

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40" />

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <Dialog.Content
                className={clsx(
                  "w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-700 transition-all"
                )}
              >
                {/* Header con imagen */}
                <div className="relative h-[200px] overflow-hidden">
                  <img
                    src={imgSrc}
                    alt={`Imagen de ${title || name}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-6 text-white z-10">
                    {area && (
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-emerald-400 to-teal-400">
                        {area}
                      </span>
                    )}
                    <h2 className="text-2xl font-bold font-mono mt-1">
                      {title || name}
                    </h2>
                  </div>
                  <Dialog.Close asChild>
                    <button
                      className="absolute top-4 right-4 text-white hover:bg-white/20 p-2 rounded-full transition"
                      aria-label="Cerrar"
                    >
                      <FaTimes size={18} />
                    </button>
                  </Dialog.Close>
                </div>

                {/* Cuerpo del modal */}
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Descripción
                    </h3>
                    <p className="text-base text-gray-600 dark:text-gray-200 leading-relaxed">
                      {description || "Sin descripción disponible."}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Ubicación
                    </h3>
                    <div className="h-[300px] rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
                      <iframe
                        title={title || name}
                        src={mapSrc}
                        className="w-full h-full border-0"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-8 py-6 flex justify-between items-center border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center text-sm gap-2 text-gray-500 dark:text-gray-400">
                    <FaInfoCircle />
                    <span>Información actualizada</span>
                  </div>
                  <div className="space-x-3">
                    {path && (
                      <a
                        href={path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-5 py-2 text-sm font-medium rounded-lg border border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white transition"
                      >
                        <FaMapMarkerAlt className="mr-2" />
                        Más Información
                      </a>
                    )}
                    <Dialog.Close asChild>
                      <button className="px-5 py-2 text-sm font-medium rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition">
                        Cerrar
                      </button>
                    </Dialog.Close>
                  </div>
                </div>
              </Dialog.Content>
            </motion.div>
          )}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

CatamarcaModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  location: PropTypes.shape({
    title: PropTypes.string,
    name: PropTypes.string,
    imgSrc: PropTypes.string,
    description: PropTypes.string,
    mapSrc: PropTypes.string,
    area: PropTypes.string,
    path: PropTypes.string,
  }),
};

export default CatamarcaModal;
