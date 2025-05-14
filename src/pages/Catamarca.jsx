// React & Third-party
import React, { Suspense, useMemo, useCallback, useState } from 'react';
import { m } from 'framer-motion';
import PropTypes from 'prop-types';
import { FaMapMarkerAlt, FaInfoCircle } from 'react-icons/fa';

// Chakra UI
import {
	Box,
	Flex,
	Text,
	IconButton,
	useColorModeValue,
} from '@chakra-ui/react';

// Internal
import { locations } from '@/data/catamarca';
import { AreaFilter } from '@/components/Catamarca/AreaFilter';
import { ANIMATIONS } from '@/components/Catamarca/animations';
import { getAreaTheme } from '@/components/Catamarca/areaThemes';
import ModalContent from '@/components/common/ModalContent';
import CatamarcaLocationCard from '@/components/Catamarca/LocationCard';
import CatamarcaModal from '@/components/Catamarca/CatamarcaModal';

import LoadingSpinner from '@/components/common/LoadingSpinner';

const CatamarcaModalHeader = ({ location, onClose }) => {
	const { gradient } = getAreaTheme(location.area);

	return (
		<Box
			bgGradient={`to-r, ${gradient}`}
			color='white'
			px={6}
			pt={6}
			pb={8}
			position='relative'
			borderTopRadius='lg'
		>
			<IconButton
				aria-label='Cerrar'
				icon={<span>&times;</span>}
				onClick={onClose}
				position='absolute'
				top={2}
				right={2}
				bg='blackAlpha.600'
				_hover={{ bg: 'blackAlpha.800' }}
				size='sm'
			/>
			<Text fontSize='xl' fontWeight='bold' textAlign='center'>
				{location.title}
			</Text>
		</Box>
	);
};

const CatamarcaModalBody = ({ location }) => (
	<Box py={6} px={6}>
		{/* Imagen principal */}
		<Box
			mb={6}
			overflow='hidden'
			borderRadius='lg'
			maxH='250px'
			display='flex'
			justifyContent='center'
			alignItems='center'
		>
			<img
				src={location.imgSrc}
				alt={location.title}
				style={{
					width: '100%',
					height: '250px',
					objectFit: 'cover',
					borderRadius: '12px',
				}}
			/>
		</Box>
		{/* Layout de mapa y descripción */}
		<Flex
			direction={{ base: 'column', md: 'row' }}
			gap={6}
			align='stretch'
		>
			<Box flex='1'>
				<Text color={useColorModeValue('gray.700', 'gray.300')}>
					{location.description}
				</Text>
			</Box>
			<Box
				flex='1'
				overflow='hidden'
				borderWidth='1px'
				borderRadius='lg'
				shadow='md'
				minW={{ md: '300px' }}
				maxW='400px'
				alignSelf='flex-start'
			>
				<Box
					as='iframe'
					src={location.mapSrc}
					title={location.title}
					w='100%'
					h='220px'
					loading='lazy'
					border='0'
					style={{ borderRadius: '12px' }}
				/>
			</Box>
		</Flex>
	</Box>
);

const CatamarcaModalFooter = ({ location }) => (
	<Flex justify='center' align='center' gap={4} px={6} py={4}>
		{location.path && (
			<IconButton
				as='a'
				href={location.path}
				target='_blank'
				rel='noopener noreferrer'
				icon={<FaMapMarkerAlt />}
				aria-label='Ver en mapa'
				colorScheme='blue'
				isRound
			/>
		)}
		{location.wiki && (
			<IconButton
				as='a'
				href={location.wiki}
				target='_blank'
				rel='noopener noreferrer'
				icon={<FaInfoCircle />}
				aria-label='Más información'
				colorScheme='teal'
				isRound
			/>
		)}
		{!location.path && !location.wiki && (
			<Text color='red.500' fontSize='sm'>
				No hay información disponible
			</Text>
		)}
	</Flex>
);

const CatamarcaAreaFilterComponent = ({ filters, setFilters }) => {
	const areas = useMemo(
		() => [...new Set(locations.map((loc) => loc.area))].sort(),
		[]
	);

	const selectedArea = filters.area || 'all';

	const handleClick = useCallback(
		(area) => {
			setFilters((prev) => ({ ...prev, area }));
		},
		[setFilters]
	);

	return (
		<m.div
			variants={ANIMATIONS.container}
			className='flex flex-wrap justify-center gap-4 py-4'
		>
			<AreaFilter
				area='Todos'
				isSelected={selectedArea === 'all'}
				onClick={() => handleClick('all')}
			/>
			{areas.map((area) => (
				<AreaFilter
					key={area}
					area={area}
					isSelected={selectedArea === area}
					onClick={() => handleClick(area)}
					gradient={getAreaTheme(area).gradient}
					icon={getAreaTheme(area).icon}
				/>
			))}
		</m.div>
	);
};

const filterCatamarcaLocations = (locations, filters) => {
	const selectedArea = filters.area || 'all';
	return selectedArea === 'all'
		? locations
		: locations.filter((loc) => loc.area === selectedArea);
};

const LocationCard = ({ location }) => {
	const [isOpen, setIsOpen] = useState(false);
	const config = getAreaTheme(location.area);

	return (
		<>
			<CatamarcaLocationCard
				location={location}
				config={config}
				onClick={() => setIsOpen(true)}
			/>


			<CatamarcaModal
				location={location}
				title={location.title}
				description={location.description}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				config={config}

			/>

		</>
	);
};

const Catamarca = () => {
	const LocationPage = React.lazy(() =>
		import('@/components/common/LocationPage')
	);

	return (
		<Suspense fallback={<LoadingSpinner />}>
			<LocationPage
				title='San Fernando del Valle'
				locations={locations}
				filterComponent={CatamarcaAreaFilterComponent}
				locationCardComponent={LocationCard}
				modalContent={({ location, onClose }) => (
					<ModalContent
						size='sm'
						header={
							<CatamarcaModalHeader location={location} onClose={onClose} />
						}
						body={<CatamarcaModalBody location={location} />}
						footer={<CatamarcaModalFooter location={location} />}
					/>
				)}
				pageVariants={ANIMATIONS.fadeInDown}
				filterFunction={filterCatamarcaLocations}
			/>
		</Suspense>
	);
};

export default React.memo(Catamarca);
Catamarca.displayName = 'Catamarca';
CatamarcaModalHeader.displayName = 'CatamarcaModalHeader';
CatamarcaModalBody.displayName = 'CatamarcaModalBody';
CatamarcaModalFooter.displayName = 'CatamarcaModalFooter';
CatamarcaAreaFilterComponent.displayName = 'CatamarcaAreaFilterComponent';
CatamarcaLocationCard.displayName = 'CatamarcaLocationCard';
CatamarcaModalHeader.propTypes = {
	location: PropTypes.object.isRequired,
	onClose: PropTypes.func.isRequired,
};
CatamarcaModalBody.propTypes = {
	location: PropTypes.object.isRequired,
};
CatamarcaModalFooter.propTypes = {
	location: PropTypes.object.isRequired,
};
CatamarcaAreaFilterComponent.propTypes = {
	filters: PropTypes.object.isRequired,
	setFilters: PropTypes.func.isRequired,
};
LocationCard.propTypes = {
	location: PropTypes.object.isRequired,
};
LocationCard.defaultProps = {
	onClick: () => {},
};
