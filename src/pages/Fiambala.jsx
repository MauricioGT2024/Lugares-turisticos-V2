import { useState, useMemo, useCallback } from 'react';
import {
	useColorMode,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	ModalCloseButton,
	useDisclosure,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInfoCircle } from 'react-icons/fa';
import { locations } from '../data/fiambala';
import { CATEGORY_CONFIG } from '../components/Fiambala/components';
import LocationCard from '../components/UI/Cards/LocationCard';

const Fiambala = () => {
	const [categoryFilter, setCategoryFilter] = useState('');
	const [selectedLocationData, setSelectedLocationData] = useState(null);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { colorMode } = useColorMode();

	const categories = Object.keys(CATEGORY_CONFIG);

	// Manejando el click para abrir el modal
	const handleLocationClick = useCallback(
		(location) => {
			if (selectedLocationData && selectedLocationData.id === location.id) {
				onClose();
				return;
			}
			const locationData = locations.find((loc) => loc.id === location.id);
			if (locationData) {
				setSelectedLocationData(locationData);
				onOpen();
			}
		},
		[selectedLocationData, onOpen, onClose]
	);

	const handleCloseModal = useCallback(() => {
		setSelectedLocationData(null);
		onClose();
	}, [onClose]);

	// Filtrar ubicaciones por categoría
	const filteredLocations = useMemo(
		() =>
			categoryFilter
				? locations.filter((loc) => loc.category === categoryFilter)
				: locations,
		[categoryFilter]
	);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className={`min-h-screen ${
				colorMode === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-amber-50 to-orange-50'
			}`}
		>
			{/* Hero Section */}
			<div className="relative h-[50vh] mb-12">
				<div className="absolute inset-0">
					<img
						src="/fiambala-hero.jpg" // Asegúrate de tener esta imagen
						alt="Fiambala Panorama"
						className="w-full h-full object-cover"
					/>
					<div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent" />
				</div>
				
				<motion.div 
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center"
				>
					<motion.span 
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						className="inline-block px-6 py-2 rounded-full text-sm font-medium bg-amber-500/80 text-white backdrop-blur-sm"
					>
						Descubre la magia de
					</motion.span>
					
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4 }}
						className="text-6xl md:text-7xl font-bold mt-4 mb-6 text-white font-['JetBrains_Mono']"
					>
						Fiambala
					</motion.h1>
					
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.6 }}
						className="max-w-2xl text-lg text-gray-200"
					>
						Donde el desierto se encuentra con las termas, creando un oasis de aventura y relax
					</motion.p>
				</motion.div>
			</div>

			<div className="container mx-auto px-4 py-12">
				{/* Filtros con nuevo diseño */}
				<motion.div 
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="mb-16"
				>
					<h2 className="text-2xl font-semibold mb-6 text-center">
						Explora por categoría
					</h2>
					<div className="flex flex-wrap justify-center gap-3">
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
								categoryFilter === ''
									? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30'
									: colorMode === 'dark'
									? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
									: 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
							}`}
							onClick={() => setCategoryFilter('')}
						>
							Todos
						</motion.button>
						{categories.map((category) => (
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								key={category}
								className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
									categoryFilter === category
										? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30'
										: colorMode === 'dark'
										? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
										: 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
								}`}
								onClick={() => setCategoryFilter(category)}
							>
								{CATEGORY_CONFIG[category]?.label || category}
							</motion.button>
						))}
					</div>
				</motion.div>

				{/* Grid con nuevo layout */}
				<motion.div
					layout
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4"
				>
					<AnimatePresence mode="popLayout">
						{filteredLocations.map((loc) => (
							<motion.div
								key={loc.id}
								layout
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.8 }}
								transition={{ duration: 0.3 }}
							>
								<LocationCard
									location={loc}
									onClick={handleLocationClick}
									Icon={CATEGORY_CONFIG[loc.category]?.icon}
									gradientClass={CATEGORY_CONFIG[loc.category]?.bgClass}
								/>
							</motion.div>
						))}
					</AnimatePresence>
				</motion.div>
			</div>

			{/* Modal de Detalles */}
			<Modal
				isOpen={isOpen}
				onClose={handleCloseModal}
				size='4xl'
				isCentered
				motionPreset='slideInBottom'
			>
				<ModalOverlay 
					bg='blackAlpha.800' 
					backdropFilter='blur(8px)'
					motionPreset='fade'
				/>
				<ModalContent
					bg={colorMode === 'dark' ? 'gray.800' : 'white'}
					className='rounded-2xl overflow-hidden shadow-2xl border border-white/10'
				>
					{selectedLocationData && (
						<>
							<div className="relative h-[200px] overflow-hidden">
								<img 
									src={selectedLocationData.imgSrc}
									alt={selectedLocationData.title}
									className="w-full h-full object-cover"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
								<ModalHeader className="absolute bottom-0 left-0 right-0 text-white bg-transparent">
									<div className="container px-6">
										<span className={`
											inline-block px-3 py-1 rounded-full text-sm font-medium mb-2
											${CATEGORY_CONFIG[selectedLocationData.category]?.bgClass}
										`}>
											{selectedLocationData.category}
										</span>
										<h2 className="text-2xl font-bold font-['JetBrains_Mono']">
											{selectedLocationData.title}
										</h2>
									</div>
								</ModalHeader>
								<ModalCloseButton 
									className='absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2'
									size='lg'
								/>
							</div>

							<ModalBody className='p-8'>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
									<div className='space-y-4'>
										<h3 className="text-lg font-semibold text-gray-400">Descripción</h3>
										<p className={`text-lg leading-relaxed ${
											colorMode === 'dark' ? 'text-gray-200' : 'text-gray-700'
										}`}>
											{selectedLocationData.description}
										</p>
									</div>
									
									<div className='space-y-4'>
										<h3 className="text-lg font-semibold text-gray-400">Ubicación</h3>
										<div className='h-[300px] rounded-xl overflow-hidden shadow-lg border border-gray-200/10'>
											<iframe
												title={selectedLocationData.title}
												src={selectedLocationData.mapSrc}
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
								<div className="flex items-center justify-between w-full">
									<div className="flex items-center space-x-2">
										<FaInfoCircle className="text-gray-400" />
										<span className={`text-sm ${
											colorMode === 'dark' ? 'text-gray-400' : 'text-gray-600'
										}`}>
											Información actualizada
										</span>
									</div>
									
									<div className="space-x-3">
										{selectedLocationData.path && (
											<a
												href={selectedLocationData.path}
												target='_blank'
												rel='noopener noreferrer'
												className={`
													inline-flex items-center px-6 py-2.5 text-sm font-medium 
													rounded-lg border-2 border-amber-500 text-amber-500 
													hover:bg-amber-500 hover:text-white
													transition-all duration-300
												`}
											>
												<FaInfoCircle className='mr-2' />
												Más Información
											</a>
										)}
										<button
											onClick={handleCloseModal}
											className={`
												px-6 py-2.5 text-sm font-medium rounded-lg
												${colorMode === 'dark' 
													? 'bg-gray-700 hover:bg-gray-600' 
													: 'bg-gray-100 hover:bg-gray-200'
												}
												transition-colors duration-300
											`}
										>
											Cerrar
										</button>
									</div>
								</div>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</motion.div>
	);
};

export default Fiambala;
