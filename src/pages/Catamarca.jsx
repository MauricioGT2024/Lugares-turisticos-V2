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
	IconButton,
	useDisclosure,
} from '@chakra-ui/react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { FaMapMarkerAlt, FaInfoCircle } from 'react-icons/fa';
import { locations } from '../data/catamarca';
import {
	ANIMATIONS,
	AreaFilter,
	LocationCard,
	filterAnimations,
	getAreaTheme,
} from '../components/Catamarca';
import React from 'react';

const Catamarca = () => {
	const [selectedArea, setSelectedArea] = useState('all');
	const [selectedLocationData, setSelectedLocationData] = useState(null);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { colorMode } = useColorMode();
	const isDark = colorMode === 'dark';

	const { filteredLocations, areas } = useMemo(() => {
		const filtered =
			selectedArea === 'all'
				? locations
				: locations.filter((loc) => loc.area === selectedArea);

		const uniqueAreas = [...new Set(locations.map((loc) => loc.area))].sort();
		return { filteredLocations: filtered, areas: uniqueAreas };
	}, [selectedArea]);

	const openModal = useCallback(
		(id) => {
			const foundLocation = locations.find((loc) => loc.id === id);
			if (foundLocation) {
				setSelectedLocationData(foundLocation);
				onOpen();
			}
		},
		[onOpen]
	);

	const closeModal = useCallback(() => {
		onClose();
		setTimeout(() => setSelectedLocationData(null), 300);
	}, [onClose]);

	return (
		<LayoutGroup>
			<main
				className={`
        min-h-screen py-12 
        ${
					isDark
						? 'bg-gradient-to-b from-gray-900 to-gray-800'
						: 'bg-gradient-to-b from-gray-50 to-white'
				}
        transition-colors duration-300
      `}
			>
				<div className='container mx-auto max-w-7xl px-4'>
					<div className='space-y-10'>
						{/* Header Section */}
						<motion.div
							{...ANIMATIONS.fadeInDown}
							className='text-center space-y-6'
						>
							<span
								className='inline-block px-6 py-2 rounded-full text-sm font-medium 
                             bg-yellow-400 text-white uppercase tracking-wide shadow-sm'
							>
								Capital Histórica
							</span>

							<motion.h1
								className='text-5xl font-bold bg-gradient-to-r from-yellow-400 via-green-400 to-yellow-400 
                         bg-clip-text text-transparent'
								whileHover={{ scale: 1.02 }}
								transition={{ type: 'spring', stiffness: 300 }}
							>
								San Fernando del Valle
							</motion.h1>

							<p
								className={`text-xl max-w-2xl mx-auto leading-relaxed
                ${isDark ? 'text-gray-300' : 'text-gray-600'}`}
							>
								Descubre los tesoros escondidos de la capital catamarqueña
							</p>
						</motion.div>

						{/* Filter Section */}
						<motion.div
							variants={ANIMATIONS.container}
							className='flex flex-wrap justify-center gap-4 py-4'
						>
							<AreaFilter
								area='Todos'
								isSelected={selectedArea === 'all'}
								onClick={() => setSelectedArea('all')}
							/>
							{areas.map((area) => (
								<AreaFilter
									key={area}
									area={area}
									isSelected={selectedArea === area}
									onClick={() => setSelectedArea(area)}
								/>
							))}
						</motion.div>

						{/* Grid Section */}
						<motion.div
							layout
							className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
						>
							<AnimatePresence mode='popLayout' initial={false}>
								{filteredLocations.map((location) => (
									<motion.div
										key={location.id}
										variants={filterAnimations}
										initial='hidden'
										animate='visible'
										exit='exit'
										layout
									>
										<LocationCard
											location={location}
											onShowDetails={openModal}
										/>
									</motion.div>
								))}
							</AnimatePresence>
						</motion.div>
					</div>
				</div>

				{/* Modal */}
				<Modal
					isOpen={isOpen}
					onClose={closeModal}
					size='xl'
					isCentered
					motionPreset='slideInBottom'
				>
					<ModalOverlay backdropFilter='blur(8px)' bg='blackAlpha.600' />
					<ModalContent bg={isDark ? 'gray.800' : 'white'}>
						{selectedLocationData && (
							<>
								<ModalHeader
									className={`bg-gradient-to-r ${
										getAreaTheme(selectedLocationData.area).gradient
									} text-white`}
								>
									{selectedLocationData.title}
								</ModalHeader>
								<ModalCloseButton color='white' />

								<ModalBody py={6}>
									<div className='rounded-lg overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 mb-4'>
										<iframe
											title={selectedLocationData.title}
											src={selectedLocationData.mapSrc}
											className='w-full h-[300px]'
											loading='lazy'
											allowFullScreen
										/>
									</div>
									<p className={isDark ? 'text-gray-200' : 'text-gray-700'}>
										{selectedLocationData.description}
									</p>
								</ModalBody>

								<ModalFooter gap={2}>
									{selectedLocationData.path && (
										<IconButton
											as='a'
											href={selectedLocationData.path}
											target='_blank'
											rel='noopener noreferrer'
											aria-label='Ver en mapa'
											icon={<FaMapMarkerAlt />}
											colorScheme='blue'
											variant='ghost'
										/>
									)}
									{selectedLocationData.wiki && (
										<IconButton
											as='a'
											href={selectedLocationData.wiki}
											target='_blank'
											rel='noopener noreferrer'
											aria-label='Más información'
											icon={<FaInfoCircle />}
											colorScheme='teal'
											variant='ghost'
										/>
									)}
								</ModalFooter>
							</>
						)}
					</ModalContent>
				</Modal>
			</main>
		</LayoutGroup>
	);
};

export default React.memo(Catamarca);
