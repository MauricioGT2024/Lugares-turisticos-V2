import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

const TinogastaModal = ({ location, isOpen, onClose, isDark }) => {
  if (!location) return null;

  const { name, imgSrc, description } = location;

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-purple-900/75 backdrop-blur-sm" aria-hidden="true" />
      
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className={`w-full max-w-2xl transform overflow-hidden rounded-lg ${isDark ? 'dark:bg-gray-800' : 'bg-white'} p-6 shadow-xl transition-all`}>
          <DialogTitle
            as="h3"
            className="bg-gradient-to-r from-purple-500 to-purple-700 -mx-6 -mt-6 mb-6 p-4 text-xl font-semibold text-white"
          >
            {name}
          </DialogTitle>

          <div className="mt-2">
            <img
              src={imgSrc}
              alt={name}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p className={`${isDark ? 'text-gray-200' : 'text-gray-700'} text-lg leading-relaxed`}>
              {description}
            </p>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 transition-colors duration-200"
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default TinogastaModal;
