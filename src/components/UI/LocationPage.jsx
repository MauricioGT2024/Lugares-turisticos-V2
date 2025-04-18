import { motion, AnimatePresence } from 'framer-motion';
import {
	Modal,
	ModalOverlay,
	useColorMode,
	ModalContent,
} from '@chakra-ui/react';
import useLocationPage from '../../hooks/useLocationPage';
import PropTypes from 'prop-types';

const LocationPage = ({
	title,
	locations,
	filterComponent: FilterComponent,
	locationCardComponent: LocationCardComponent,
	modalContent: ModalContentComponent,
	pageVariants,
	filterFunction,
	description,
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
			<div className='container mx-auto px-4 md:px-8 max-w-7xl'>
				<div className='flex flex-col space-y-8'>
					<motion.header className='text-center space-y-6'>
						<span className='inline-block px-6 py-2 rounded-full bg-gradient-to-r from-orange-400 to-red-400 text-white text-md uppercase tracking-wider shadow-lg'>
							Explora
						</span>
						<h1 className='text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 via-yellow-400 to-red-400 bg-clip-text text-transparent'>
							{title}
						</h1>
						<p className='text-xl md:text-2xl max-w-3xl mx-auto opacity-90'>
							{description}
						</p>
					</motion.header>

					{FilterComponent && (
						<FilterComponent filters={filters} setFilters={setFilters} />
					)}

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
						<AnimatePresence mode='popLayout'>
							{filteredLocations.map((location) => (
								<motion.div
									key={location.id} // Asegúrate de que 'location.id' sea único
									layout
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -20 }}
									transition={{ duration: 0.3 }}
								>
									<LocationCardComponent
										location={location}
										onShowDetails={() => handleShowDetails(location)}
									/>
								</motion.div>
							))}
						</AnimatePresence>
					</div>
				</div>
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
						<ModalContentComponent
							location={selectedLocation}
							onClose={handleCloseModal}
						/>
					)}
				</ModalContent>
			</Modal>
		</motion.div>
	);
};

LocationPage.propTypes = {
	title: PropTypes.string.isRequired,
	locations: PropTypes.array.isRequired,
	filterComponent: PropTypes.elementType,
	locationCardComponent: PropTypes.elementType.isRequired,
	modalContent: PropTypes.elementType.isRequired,
	pageVariants: PropTypes.object.isRequired,
	filterFunction: PropTypes.func,
	description: PropTypes.string.isRequired,
};

export default LocationPage;
