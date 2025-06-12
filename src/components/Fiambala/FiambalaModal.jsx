import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import PropTypes from "prop-types";
import { FaXmark } from "react-icons/fa6";

const FiambalaModal = ({ isOpen, onClose, location, gradient }) => {
  if (!location) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        aria-hidden="true"
      />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-5xl bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          {location.imgSrc && (
            <div className="w-full h-64 rounded overflow-hidden">
              <img
                src={location.imgSrc}
                alt={location.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className={`p-6 ${gradient}`}>
            <div className="flex justify-between items-start">
              <div>
                <DialogTitle className="text-3xl font-bold dark:text-white ">
                  {location.title}
                </DialogTitle>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200"
              >
                <FaXmark className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {/* Izquierda: Descripción + Imagen */}
            <div className="space-y-4">
              <div>
                <h3 className="text-xl text-gray-800 dark:text-white mb-1 font-bold ">
                  Descripción
                </h3>
                <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line font-mono font-bold line">
                  {location.description}
                </p>
              </div>
            </div>

            {/* Derecha: Iframe */}
            <div>
              {location.mapSrc ? (
                <div className="aspect-video rounded-lg overflow-hidden shadow">
                  <iframe
                    src={location.mapSrc}
                    title={location.title}
                    allowFullScreen
                    className="w-full h-full border-none"
                  />
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">
                  Sin contenido multimedia disponible
                </p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-gray-200 dark:border-gray-700 px-6 py-4">
            <div className="text-md text-gray-700 dark:text-gray-300">
              <span className="mt-1 inline-block text-sm bg-white text-gray-900 font-medium px-2 py-1 rounded-full">
                {location.category}
              </span>
            </div>
            <div className="flex gap-3">
              {location.wiki && (
                <a
                  href={location.wiki}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Ver más
                </a>
              )}
              <button
                onClick={onClose}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md text-sm font-medium"
              >
                Cerrar
              </button>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

FiambalaModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  location: PropTypes.shape({
    title: PropTypes.string,
    category: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    mapSrc: PropTypes.string,
    ubicacion: PropTypes.string,
    url: PropTypes.string,
  }),
  isDark: PropTypes.bool,
  gradient: PropTypes.string,
};

export default FiambalaModal;
