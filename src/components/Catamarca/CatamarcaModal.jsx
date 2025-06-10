import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

const CatamarcaModal = ({ isOpen, onClose, location, isDark }) => {
  if (!location) return null;

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/90 to-indigo-900/90 backdrop-blur-sm" aria-hidden="true" />
      
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-2xl transition-all">
          <div className="relative">
            <img
              src={location.imgSrc}
              alt={location.title}
              className="w-full h-72 object-cover rounded-xl"
            />
            <div className="absolute top-0 right-0 m-4">
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="mt-6">
            <DialogTitle
              as="h3"
              className="text-2xl font-bold text-gray-900 dark:text-white"
            >
              {location.title}
            </DialogTitle>

            <div className="mt-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                {location.area}
              </span>
            </div>

            <div className="mt-4 prose prose-blue dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                {location.description}
              </p>
            </div>

            {location.details && (
              <div className="mt-6 space-y-4">
                {Object.entries(location.details).map(([key, value]) => (
                  <div key={key} className="flex items-start">
                    <span className="text-blue-600 dark:text-blue-400 font-medium min-w-[120px]">
                      {key}:
                    </span>
                    <span className="text-gray-600 dark:text-gray-300 ml-4">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default CatamarcaModal;
