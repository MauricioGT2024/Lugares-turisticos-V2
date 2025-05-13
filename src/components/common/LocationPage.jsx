import { motion, AnimatePresence } from 'framer-motion';
import {
	Modal,
	ModalOverlay,
	useColorMode,
	ModalContent as ChakraModalContent,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import useLocationPage from '@/hooks/useLocationPage';

// Extra fallback si usás íconos por categoría
import { CATEGORY_CONFIG } from '@/components/Fiambala/components'; // o donde esté tu config

const LocationPage = ({
	title,
	description,
	locations,
	filterComponent: FilterComponent,
	locationCardComponent: LocationCardComponent,
	modalContent: ModalContentComponent,
	pageVariants,
	filterFunction,
}) => {
	const { colorMode } = useColorMode();
	const isDark = colorMode === 'dark';

	const {
		selectedLocation,
		isOpen,
		handleShowDetails,
		handleCloseModal,
		filteredLocations,
		filters,
		setFilters,
	} = useLocationPage(locations, filterFunction);

	return (
		<motion.div
			variants={pageVariants}
			initial='initial'
			animate='animate'
			exit='exit'
			className={`min-h-screen py-12 ${
				isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
			}`}
		>
			<section className='container mx-auto px-4 md:px-8 max-w-7xl'>
				<header className='text-center space-y-6 mb-12'>
					<span className='inline-block px-6 py-2 rounded-full bg-gradient-to-r from-orange-400 to-red-400 text-white text-md uppercase tracking-wider shadow'>
						Explora
					</span>
					<h1 className='text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 via-yellow-400 to-red-400 bg-clip-text text-transparent'>
						{title}
					</h1>
					{description && (
						<p className='text-xl md:text-2xl max-w-3xl mx-auto opacity-90'>
							{description}
						</p>
					)}
				</header>

				{FilterComponent && (
					<FilterComponent filters={filters} setFilters={setFilters} />
				)}

				<section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12'>
					<AnimatePresence mode='popLayout'>
						{filteredLocations.map((location) => {
							const config = CATEGORY_CONFIG?.[location.category] || {};
							return (
								<motion.div
									key={location.id}
									layout
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -20 }}
									transition={{ duration: 0.3 }}
								>
									<LocationCardComponent
										location={location}
										onShowDetails={() => handleShowDetails(location)}
										Icon={config.icon}
										gradientClass={config.bgClass}
									/>
								</motion.div>
							);
						})}
					</AnimatePresence>
				</section>
			</section>

			<Modal
				isOpen={isOpen}
				onClose={handleCloseModal}
				motionPreset='slideInBottom'
				size='xl'
				isCentered
			>
				<ModalOverlay backdropFilter='blur(10px)' bg='blackAlpha.600' />
				<ChakraModalContent
					bg={isDark ? 'gray.800' : 'white'}
					borderRadius='xl'
					mx={4}
				>
					{selectedLocation && (
						<ModalContentComponent
							location={selectedLocation}
							onClose={handleCloseModal}
						/>
					)}
				</ChakraModalContent>
			</Modal>
		</motion.div>
	);
};

LocationPage.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	locations: PropTypes.arrayOf(PropTypes.object).isRequired,
	filterComponent: PropTypes.elementType,
	locationCardComponent: PropTypes.elementType.isRequired,
	modalContent: PropTypes.elementType.isRequired,
	pageVariants: PropTypes.object.isRequired,
	filterFunction: PropTypes.func,
};

export default LocationPage;
