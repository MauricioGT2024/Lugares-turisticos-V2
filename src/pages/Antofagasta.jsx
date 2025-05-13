import React, { useState, useCallback, useMemo } from 'react';
import {
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { location } from '@/data/antofagasta';
import AntofagastaModal from '@/components/Antofagasta/AntofagastaModal';
import CategoryFilterButton from '@/components/Antofagasta/CategoryFilterButton';
import ModernLocationCard from '@/components/Antofagasta/ModernLocationCard';
import { ANTOFAGASTA_ANIMATIONS } from '@/components/Antofagasta/animations';

const CATEGORY_ALL = 'Todos';

const getCategories = (locations) => [
  CATEGORY_ALL,
  ...Array.from(new Set(locations.map((loc) => loc.categoria))).sort(),
];

const Antofagasta = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  // Filtro de categoría único y dinámico
  const categories = useMemo(() => getCategories(location), []);
  const [category, setCategory] = useState(CATEGORY_ALL);

  const filteredLocations = useMemo(
	() =>
	  location.filter(
		(loc) => category === CATEGORY_ALL || loc.categoria === category
	  ),
	[category]
  );

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

		  {/* Filtros dinámicos de categoría */}
		  <div className='flex flex-wrap justify-center gap-3 mb-10'>
			{categories.map((cat) => (
			  <CategoryFilterButton
				key={cat}
				item={cat}
				selected={category === cat}
				onClick={() => setCategory(cat)}
			  />
			))}
		  </div>

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
				  <ModernLocationCard
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

	{selectedLocation && (
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
