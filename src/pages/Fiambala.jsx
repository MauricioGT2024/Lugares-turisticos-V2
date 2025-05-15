import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useColorMode, useDisclosure } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { locations } from '@/data/fiambala';
import { CATEGORY_CONFIG } from '@/components/Fiambala/config';
import { LocationModal } from '@/components/Fiambala/LocationModal';
import FiambalaLocationCard from '@/components/Fiambala/LocationCard';

// =========================
// Fiambala Main Component
// =========================
const Fiambala = () => {
	const [selectedCategory, setSelectedCategory] = useState('');
	const [selectedLocation, setSelectedLocation] = useState(null);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { colorMode } = useColorMode();

	const categories = useMemo(() => Object.keys(CATEGORY_CONFIG), []);

	const filteredLocations = useMemo(() => {
		return selectedCategory
			? locations.filter((loc) => loc.category === selectedCategory)
			: locations;
	}, [selectedCategory]);

	const handleLocationClick = (location) => {
		setSelectedLocation(location);
		onOpen();
	};

	const handleCloseModal = () => {
		setSelectedLocation(null);
		onClose();
	};

	// Simula la carga de datos
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className={`min-h-screen ${
				colorMode === 'dark'
					? 'bg-gray-900'
					: 'bg-gradient-to-br from-amber-50 to-orange-50'
			}`}
		>
			<HeroSection />
			<div className='container mx-auto px-4 py-12'>
				<CategoryFilter
					categories={categories}
					selectedCategory={selectedCategory}
					onSelect={setSelectedCategory}
					colorMode={colorMode}
				/>
				<motion.div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4'>
					<AnimatePresence mode='popLayout'>
						{filteredLocations.length === 0 ? (
							<p className='text-center col-span-full text-gray-500'>
								No hay lugares disponibles en esta categoría.
							</p>
						) : filteredLocations.map((loc) => (
							<motion.div
								key={loc.id}
								layout
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.8 }}
								transition={{ duration: 0.3 }}
							>
								<FiambalaLocationCard
									location={loc}
									onClick={() => handleLocationClick(loc)}
									colorMode={colorMode}
									className='shadow-lg hover:shadow-xl transition-shadow duration-300'
									loading='lazy'
									alt={`Imagen de ${loc.title}`}
									src={loc.imgSrc}
									imgSrc={loc.imgSrc}
									title={loc.title}
									description={loc.description}
									category={loc.category}
								/>
							</motion.div>
						))}
					</AnimatePresence>
				</motion.div>
			</div>

			{/* Modal de Detalle */}

			<LocationModal
				isOpen={isOpen}
				onClose={handleCloseModal}
				location={selectedLocation}
				colorMode={colorMode}
			/>
		</motion.div>
	);
};

export default Fiambala;

// =========================
// Hero Section
// =========================
const HeroSection = () => (
	<div className='relative h-[50vh] mb-12'>
		<div className='absolute inset-0'>
			<img
				src='/fiambala-hero.jpg'
				alt='Fiambala Panorama'
				className='w-full h-full object-cover'
			/>
			<div className='absolute inset-0 bg-gradient-to-b from-black/60 to-transparent' />
		</div>

		<motion.div className='relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center'>
			<motion.span className='inline-block px-6 py-2 rounded-full text-sm font-medium bg-amber-500/80 text-white backdrop-blur-sm'>
				Descubre la magia de
			</motion.span>
			<motion.h1 className="text-6xl md:text-7xl font-bold mt-4 mb-6 text-white font-['JetBrains_Mono']">
				Fiambala
			</motion.h1>
			<motion.p className='max-w-2xl text-lg text-gray-200'>
				Donde el desierto se encuentra con las termas, creando un oasis de
				aventura y relax
			</motion.p>
		</motion.div>
	</div>
);

// =========================
// Category Filter Buttons
// =========================
const CategoryFilter = ({
	categories,
	selectedCategory,
	onSelect,
	colorMode,
}) => {
	const baseButtonClass =
		'px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300';

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className='mb-16'
		>
			<h2 className='text-2xl font-semibold mb-6 text-center'>
				Explora por categoría
			</h2>
			<div className='flex flex-wrap justify-center gap-3'>
				{['', ...categories].map((cat) => {
					const isActive = selectedCategory === cat;
					return (
						<motion.button
							aria-pressed={isActive}
							aria-label={`Filtrar por ${
								cat ? CATEGORY_CONFIG[cat]?.label || cat : 'todos'
							}`}
							key={cat || 'all'}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className={`${baseButtonClass} ${
								isActive
									? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30'
									: colorMode === 'dark'
									? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
									: 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
							}`}
							onClick={() => onSelect(cat)}
						>
							{cat ? CATEGORY_CONFIG[cat]?.label || cat : 'Todos'}
						</motion.button>
					);
				})}
			</div>
		</motion.div>
	);
};

CategoryFilter.propTypes = {
	categories: PropTypes.arrayOf(PropTypes.string).isRequired,
	selectedCategory: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired,
	colorMode: PropTypes.string.isRequired,
};
CategoryFilter.displayName = 'CategoryFilter';

// =========================
// Modal de Detalle
// =========================

CategoryFilter.defaultProps = {
	colorMode: 'light', // Valor por defecto para el modo de color
};
