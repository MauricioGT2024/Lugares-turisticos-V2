import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

const AntofagastaModal = ({ isOpen, onClose, location, gradient }) => {
  if (!location) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Fondo oscuro */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Centro modal */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-6xl rounded-lg shadow-xl bg-white dark:bg-gray-900 overflow-hidden">
          {/* Header (solo texto) */}
          <div
            className="p-6"
            style={{
              background:
                gradient || "linear-gradient(to right, #4f46e5, #9333ea)",
            }}
          >
            <div className="flex justify-between items-start">
              <div>
                <DialogTitle className="text-3xl font-bold text-white mb-2">
                  {location.title}
                </DialogTitle>
                {location.categoria && (
                  <span className="inline-block bg-white/30 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {location.categoria}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="text-white text-2xl font-bold hover:text-gray-200"
                aria-label="Cerrar modal"
              >
                &times;
              </button>
            </div>
          </div>

          {/* Body: descripción + imagen + iframe */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {/* Izquierda: texto */}
            <div className="text-gray-800 dark:text-gray-200 whitespace-pre-line text-base leading-relaxed">
              <p>{location.description}</p>
            </div>

            {/* Derecha: imagen + iframe */}
            <div className="space-y-4">
              <img
                src={location.imgSrc}
                alt={location.title}
                className="w-full h-48 object-cover rounded-md shadow-md"
                loading="lazy"
              />
              <div className="aspect-video w-full">
                <iframe
                  src={
                    location.mapSrc ||
                    "https://www.youtube.com/embed/dQw4w9WgXcQ"
                  }
                  title={`Contenido de ${location.name}`}
                  frameBorder="0"
                  allowFullScreen
                  className="w-full h-full rounded-md shadow-md"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-4 px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            {location.mapUrl && (
              <a
                href={location.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold"
              >
                Ver Mapa
              </a>
            )}
            {location.path && (
              <a
                href={location.path}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold"
              >
                Ver más
              </a>
            )}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default AntofagastaModal;
