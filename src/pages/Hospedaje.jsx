import { useState } from 'react';
import {
	useColorMode,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	ModalFooter,
	IconButton,
} from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaMapMarkedAlt, FaTimes } from 'react-icons/fa';
import { hospedajes } from '../data/hospedajes';
import HospedajeHeader from '../components/Hospedaje/HospedajeHeader';
import HotelCard from '../components/Hospedaje/HotelCard';

const Hospedaje = () => {
	const [selectedLocation, setSelectedLocation] = useState('all');
	const { colorMode } = useColorMode();
	const locations = ['all', ...new Set(hospedajes.map((h) => h.location))];
	const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
	const [selectedHotel, setSelectedHotel] = useState(null);
	const [isMapModalOpen, setIsMapModalOpen] = useState(false);

	const handleCloseFilterModal = () => setIsFilterModalOpen(false);
	const handleOpenFilterModal = () => setIsFilterModalOpen(true);

	const handleOpenMap = (hospedaje) => {
		setSelectedHotel(hospedaje);
		setIsMapModalOpen(true);
	};

	const handleCloseMap = () => {
		setIsMapModalOpen(false);
		setSelectedHotel(null);
	};

	const filteredHospedajes =
		selectedLocation === 'all'
			? hospedajes
			: hospedajes.filter((h) => h.location === selectedLocation);

	return (
		<div
			className={`min-h-screen ${
				colorMode === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
			}`}
		>
			<HospedajeHeader onOpenFilter={handleOpenFilterModal} />

			<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				{/* Filtros */}
				<Modal
					isOpen={isFilterModalOpen}
					onClose={handleCloseFilterModal}
					motionPreset='slideInBottom'
					scrollBehavior='inside'
				>
					<ModalOverlay backdropFilter='blur(8px)' bg='blackAlpha.600' />
					<ModalContent
						position='fixed'
						bottom='0'
						mb='0'
						borderRadius='24px 24px 0 0'
						bg={colorMode === 'dark' ? 'gray.800' : 'white'}
					>
						<ModalHeader>Filtros</ModalHeader>
						<ModalCloseButton />
						<ModalBody pb={6}>
							<div className='space-y-4'>
								{locations.map((loc) => (
									<button
										key={loc}
										onClick={() => {
											setSelectedLocation(loc);
											handleCloseFilterModal();
										}}
										className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
											selectedLocation === loc
												? colorMode === 'dark'
													? 'bg-teal-600 text-white'
													: 'bg-teal-500 text-white'
												: colorMode === 'dark'
												? 'text-gray-300 hover:bg-gray-700'
												: 'text-gray-600 hover:bg-gray-100'
										}`}
									>
										{loc === 'all' ? 'Todas las ubicaciones' : loc}
									</button>
								))}
							</div>
						</ModalBody>
					</ModalContent>
				</Modal>

				{/* Grid de hoteles */}
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					<AnimatePresence mode='popLayout'>
						{filteredHospedajes.map((hospedaje) => (
							<motion.div
								key={hospedaje.id}
								layout
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.9 }}
								transition={{ duration: 0.3 }}
							>
								<HotelCard hotel={hospedaje} onOpenMap={handleOpenMap} />
							</motion.div>
						))}
					</AnimatePresence>
				</div>

				{/* Modal del Mapa */}
				<Modal
					isOpen={isMapModalOpen}
					onClose={handleCloseMap}
					size='xl'
					isCentered
				>
					<ModalOverlay backdropFilter='blur(5px)' />
					<ModalContent>
						<ModalHeader>{selectedHotel?.title}</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							{selectedHotel && (
								<iframe
									src={selectedHotel.iframe}
									width='100%'
									height='450'
									style={{ border: 0 }}
									allowFullScreen=''
									loading='lazy'
									referrerPolicy='no-referrer-when-downgrade'
								/>
							)}
						</ModalBody>
						<ModalFooter>
							<IconButton
								as='a'
								href={selectedHotel?.mapUrl}
								target='_blank'
								rel='noopener noreferrer'
								aria-label='Ver en Google Maps'
								icon={<FaMapMarkedAlt />}
								colorScheme='blue'
								variant='ghost'
								mr={3}
							/>
							<IconButton
								onClick={handleCloseMap}
								aria-label='Cerrar'
								icon={<FaTimes />}
								colorScheme='red'
							/>
						</ModalFooter>
					</ModalContent>
				</Modal>
			</main>
		</div>
	);
};

export default Hospedaje;
