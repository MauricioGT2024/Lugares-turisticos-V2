import { Dialog, DialogPanel, DialogTitle, DialogDescription } from '@headlessui/react';

const AntofagastaModal = ({
  location,
  isOpen,
  onClose,
}) => {
  if (!location) return null;
  
  const { title, imgSrc, description } = location;
  
  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose} 
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-teal-900/75" aria-hidden="true" />
      
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
          <div className='relative'>
            <img
              src={imgSrc}
              alt={title}
              className='w-full h-80 object-cover rounded-lg mb-6'
            />
            <div className='absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-400 to-teal-600' />
          </div>

          <DialogTitle
            as='h3'
            className='text-3xl font-bold text-teal-900 mb-4'
          >
            {title}
          </DialogTitle>

          <DialogDescription className='mt-4'>
            <p className='text-lg text-teal-700 leading-relaxed'>
              {description}
            </p>
          </DialogDescription>

          <div className='mt-8 flex justify-end'>
            <button
              type='button'
              className='inline-flex justify-center rounded-lg px-6 py-3 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 transition-colors duration-200'
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

export default AntofagastaModal;
