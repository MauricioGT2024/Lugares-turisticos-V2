import React, { useState, useMemo, useCallback } from 'react';
import { useColorMode, useDisclosure } from '@chakra-ui/react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';

import { locations } from '@/data/antofagasta';
import AntofagastaModal from '@/components/Antofagasta/AntofagastaModal';
import CategoryFilterButton from '@/components/Antofagasta/CategoryFilterButton';
import AntofagastaLocationCard from '@/components/Antofagasta/LocationCard';
import { ANTOFAGASTA_ANIMATIONS } from '@/components/Antofagasta/animations';

const CATEGORY_ALL = 'Todos';

const Antofagasta = () => {
	const { colorMode } = useColorMode();
	const isDark = colorMode === 'dark';
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [category, setCategory] = useState(CATEGORY_ALL);
	const [selectedLocation, setSelectedLocation] = useState(null);

	// Categorías únicas + "Todos"
	const categories = useMemo(() => {
		const uniqueCategories = new Set(locations.map((loc) => loc.categoria));
		return [CATEGORY_ALL, ...Array.from(uniqueCategories).sort()];
	}, []);

	// Filtro dinámico por categoría
	const filteredLocations = useMemo(() => {
		return category === CATEGORY_ALL
			? locations
			: locations.filter((loc) => loc.categoria === category);
	}, [category]);

	// Seleccionar ubicación y abrir modal
	const handleShowDetails = useCallback(
		(location) => {
			setSelectedLocation(location);
			onOpen();
		},
		[onOpen]
	);

	const handleCloseModal = useCallback(() => {
		setSelectedLocation(null);
		onClose();
	}, [onClose]);

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
					<header className='text-center space-y-6 mb-10'>
						<motion.span
							variants={ANTOFAGASTA_ANIMATIONS.headerVariants}
							className='inline-block px-6 py-2 rounded-full bg-gradient-to-r from-orange-400 to-red-400 text-white text-md uppercase tracking-wider shadow-lg'
						>
							Explora la Puna
						</motion.span>
						<motion.h1
							variants={ANTOFAGASTA_ANIMATIONS.headerVariants}
							className='text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 via-yellow-400 to-red-400 bg-clip-text text-transparent'
						>
							Antofagasta de la Sierra
						</motion.h1>
						<motion.p
							variants={ANTOFAGASTA_ANIMATIONS.headerVariants}
							className='text-xl md:text-2xl max-w-3xl mx-auto opacity-90'
						>
							Donde el desierto de altura se encuentra con volcanes milenarios y
							salares brillantes, creando paisajes únicos en la Puna
							catamarqueña.
						</motion.p>
					</header>

					{/* Filtro de Categorías */}
					<div className='flex flex-wrap justify-center gap-3 mb-10'>
						{categories.map((cat) => (
							<CategoryFilterButton
								key={cat}
								item={cat}
								selected={category === cat}
								onClick={() => setCategory(cat)}
								aria-pressed={category === cat}
							/>
						))}
					</div>

					{/* Tarjetas de Lugares */}
					<section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
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
									<AntofagastaLocationCard
										location={loc}
										onShowDetails={() => handleShowDetails(loc)}
									/>
								</motion.div>
							))}
						</AnimatePresence>
					</section>
				</LayoutGroup>
			</div>

			{/* Modal de Detalle */}
			{isOpen && selectedLocation && (
				<AntofagastaModal
					isOpen={isOpen}
					onClose={handleCloseModal}
					location={selectedLocation}
				/>
			)}
		</motion.div>
	);
};

export default React.memo(Antofagasta);
