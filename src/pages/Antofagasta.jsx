import { useState, useMemo, useCallback } from 'react';
import React from 'react';
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
	IconButton,
} from '@chakra-ui/react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { FaMapMarkedAlt, FaInfoCircle, FaTimes } from 'react-icons/fa';
import { location } from '../data/antofagasta';
import LocationCard from '../components/Antofagasta/LocationCard';
import FilterGroup from '../components/FilterSystem/FilterGroup';
import { ANTOFAGASTA_ANIMATIONS } from '../components/Antofagasta/config/animations';

const Antofagasta = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [selectedLocation, setSelectedLocation] = useState(null);
	const [filters, setFilters] = useState({ category: 'Todos', search: '' });
	const { colorMode } = useColorMode();
	const isDark = colorMode === 'dark';

	const categories = useMemo(
		() => ['Todos', ...new Set(location.map((loc) => loc.categoria))],
		[]
	);

	const filteredLocations = useMemo(() => {
		return location.filter((loc) => {
			const matchesCategory =
				filters.category === 'Todos' || loc.categoria === filters.category;
			const matchesSearch =
				!filters.search ||
				loc.title.toLowerCase().includes(filters.search.toLowerCase()) ||
				(loc.description &&
					loc.description.toLowerCase().includes(filters.search.toLowerCase()));
			return matchesCategory && matchesSearch;
		});
	}, [filters]);

	const handleShowDetails = useCallback(
		(id) => {
			const foundLocation = location.find((loc) => loc.id === id);
			if (foundLocation) {
				setSelectedLocation(foundLocation);
				onOpen();
			}
		},
		[onOpen]
	);

	const handleCloseModal = () => {
		onClose();
		setTimeout(() => setSelectedLocation(null), 300);
	};

	return (
		<motion.div
			variants={ANTOFAGASTA_ANIMATIONS.pageVariants}
			initial='initial'
			animate='animate'
			exit='exit'
			className={`min-h-screen py-12 ${
				isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
			}`}
		>
			<div className='container mx-auto px-4 md:px-8 max-w-7xl'>
				<LayoutGroup>
					<div className='flex flex-col space-y-8'>
						<motion.header
							variants={ANTOFAGASTA_ANIMATIONS.headerVariants}
							className='text-center space-y-6'
						>
							<span className='inline-block px-6 py-2 rounded-full bg-gradient-to-r from-orange-400 to-red-400 text-white text-md uppercase tracking-wider shadow-lg'>
								Explora la Puna
							</span>
							<h1 className='text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 via-yellow-400 to-red-400 bg-clip-text text-transparent'>
								Antofagasta de la Sierra
							</h1>
							<p className='text-xl md:text-2xl max-w-3xl mx-auto opacity-90'>
								Donde el desierto de altura se encuentra con volcanes milenarios
								y salares brillantes, creando paisajes únicos en la Puna
								catamarqueña
							</p>
						</motion.header>

						<FilterGroup
							title='Categorías'
							items={categories.filter((cat) => cat !== 'Todos')}
							selected={filters.category}
							onSelect={(value) =>
								setFilters((prev) => ({
									...prev,
									category: value || 'Todos',
								}))
							}
						/>

						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
							<AnimatePresence mode='popLayout'>
								{filteredLocations.map((loc) => (
									<motion.div
										key={loc.id}
										layout
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -20 }}
										transition={{ duration: 0.3 }}
									>
										<LocationCard
											location={loc}
											onShowDetails={handleShowDetails}
										/>
									</motion.div>
								))}
							</AnimatePresence>
						</div>
					</div>
				</LayoutGroup>
			</div>

			<Modal
				isOpen={isOpen}
				onClose={handleCloseModal}
				motionPreset='slideInBottom'
				size='xl'
				isCentered
			>
				<ModalOverlay backdropFilter='blur(10px)' bg='blackAlpha.600' />
				<ModalContent
					bg={isDark ? 'gray.800' : 'white'}
					borderRadius='xl'
					mx={4}
				>
					{selectedLocation && (
						<>
							<ModalHeader>{selectedLocation.title}</ModalHeader>
							<ModalCloseButton />
							<ModalBody>
								<motion.div
									className='rounded-lg overflow-hidden h-[300px] mb-4'
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
								>
									<iframe
										title={selectedLocation.title}
										src={selectedLocation.mapSrc}
										className='w-full h-full border-0'
										loading='lazy'
									/>
								</motion.div>
								<motion.p
									className='text-md'
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.2 }}
								>
									{selectedLocation.description}
								</motion.p>
							</ModalBody>
							<ModalFooter gap={2}>
								{selectedLocation.mapUrl && (
									<IconButton
										as='a'
										href={selectedLocation.mapUrl}
										target='_blank'
										rel='noopener noreferrer'
										aria-label='Ver en mapa'
										icon={<FaMapMarkedAlt />}
										colorScheme='blue'
										variant='ghost'
									/>
								)}
								{selectedLocation.path && (
									<IconButton
										as='a'
										href={selectedLocation.path}
										target='_blank'
										rel='noopener noreferrer'
										aria-label='Más información'
										icon={<FaInfoCircle />}
										colorScheme='teal'
										variant='ghost'
									/>
								)}
								<IconButton
									onClick={handleCloseModal}
									aria-label='Cerrar'
									icon={<FaTimes />}
									colorScheme='red'
								/>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</motion.div>
	);
};

export default React.memo(Antofagasta);
