// src/components/Catamarca/CatamarcaModal.jsx
import PropTypes from 'prop-types';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from '@chakra-ui/react';
import { FaInfoCircle, FaMapMarkerAlt } from 'react-icons/fa';
import { useColorMode } from '@chakra-ui/react';

export const CatamarcaModal = ({ location, isOpen, setIsOpen }) => {
  const { colorMode } = useColorMode();
  const handleClose = () => setIsOpen(false);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size='4xl'
      isCentered
      motionPreset='slideInBottom'
    >
      <ModalOverlay bg='blackAlpha.800' backdropFilter='blur(8px)' />
      <ModalContent
        bg={colorMode === 'dark' ? 'gray.800' : 'white'}
        className='rounded-2xl overflow-hidden shadow-2xl border border-white/10'
      >
        {location ? (
          <>
            {/* Imagen Header */}
            <div className='relative h-[200px] overflow-hidden'>
              <img
                src={location.imgSrc}
                alt={`Imagen de ${location.title || location.name}`}
                className='w-full h-full object-cover'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent' />
              <ModalHeader className='absolute bottom-0 left-0 right-0 text-white bg-transparent'>
                <div className='container px-6'>
                  <span
                    className='inline-block px-3 py-1 rounded-full text-sm font-medium mb-2 bg-gradient-to-r from-emerald-500 to-teal-500'
                  >
                    {location.area}
                  </span>
                  <h2 className="text-2xl font-bold font-['JetBrains_Mono']">
                    {location.title || location.name}
                  </h2>
                </div>
              </ModalHeader>
              <ModalCloseButton
                className='absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2'
                size='lg'
              />
            </div>

            <ModalBody className='p-8'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div>
                  <h3 className='text-lg font-semibold text-gray-400 mb-2'>
                    Descripción
                  </h3>
                  <p
                    className={`text-lg leading-relaxed ${
                      colorMode === 'dark' ? 'text-gray-200' : 'text-gray-700'
                    }`}
                  >
                    {location.description}
                  </p>
                </div>
                <div>
                  <h3 className='text-lg font-semibold text-gray-400 mb-2'>
                    Ubicación
                  </h3>
                  <div className='h-[300px] rounded-xl overflow-hidden shadow-lg border border-gray-200/10'>
                    <iframe
                      title={location.title || location.name}
                      src={location.mapSrc}
                      className='w-full h-full border-0'
                      loading='lazy'
                    />
                  </div>
                </div>
              </div>
            </ModalBody>

            <ModalFooter
              className={`px-8 py-6 border-t ${
                colorMode === 'dark' ? 'border-gray-700' : 'border-gray-200'
              }`}
            >
              <div className='flex items-center justify-between w-full'>
                <div className='flex items-center space-x-2'>
                  <FaInfoCircle className='text-gray-400' />
                  <span
                    className={`text-sm ${
                      colorMode === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    Información actualizada
                  </span>
                </div>
                <div className='space-x-3'>
                  {location.path && (
                    <a
                      href={location.path}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='inline-flex items-center px-6 py-2.5 text-sm font-medium rounded-lg border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all duration-300'
                    >
                      <FaMapMarkerAlt className='mr-2' />
                      Más Información
                    </a>
                  )}
                  <button
                    onClick={handleClose}
                    className={`px-6 py-2.5 text-sm font-medium rounded-lg ${
                      colorMode === 'dark'
                        ? 'bg-gray-700 hover:bg-gray-600'
                        : 'bg-gray-100 hover:bg-gray-200'
                    } transition-colors duration-300`}
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </ModalFooter>
          </>
        ) : (
          <ModalBody className='p-8'>
            <p className='text-center text-gray-400'>Cargando...</p>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CatamarcaModal;

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
    wiki: PropTypes.string,
  }),
  config: PropTypes.shape({
    gradient: PropTypes.string,
  }).isRequired,
};