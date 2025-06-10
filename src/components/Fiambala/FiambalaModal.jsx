import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { FaMapMarkerAlt, FaInfoCircle } from 'react-icons/fa';

const FiambalaModal = ({ isOpen, onClose, location, isDark }) => {
  if (!location) return null;

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/75 backdrop-blur-sm" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-2xl transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 p-6 shadow-xl transition-all">
          <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {location.title}
          </DialogTitle>

          <div className="rounded-lg overflow-hidden shadow-2xl border border-orange-200 dark:border-orange-900 mb-4 transform hover:scale-[1.02] transition-transform duration-300">
            {location.mapSrc && (
              <iframe
                title={location.title}
                src={location.mapSrc}
                className="w-full h-[300px]"
                loading="lazy"
                allowFullScreen
              />
            )}
          </div>

          <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-6">
            {location.description}
          </p>

          <div className="flex justify-end gap-3">
            {location.path && (
              <a
                href={location.path}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center p-2 text-orange-600 hover:text-orange-700 hover:scale-110 transition-all"
                aria-label="Ver en mapa"
              >
                <FaMapMarkerAlt size={24} />
              </a>
            )}
            {location.wiki && (
              <a
                href={location.wiki}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center p-2 text-red-600 hover:text-red-700 hover:scale-110 transition-all"
                aria-label="Más información"
              >
                <FaInfoCircle size={24} />
              </a>
            )}
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
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    mapSrc: PropTypes.string,
    path: PropTypes.string,
    wiki: PropTypes.string,
  }),
  isDark: PropTypes.bool.isRequired,
};

export default FiambalaModal;
