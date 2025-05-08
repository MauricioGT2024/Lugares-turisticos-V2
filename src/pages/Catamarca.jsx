import React from 'react';
import { m } from 'framer-motion';
import { FaMapMarkerAlt, FaInfoCircle } from 'react-icons/fa';
import { locations } from '../data/catamarca';
import {
	ANIMATIONS,
	AreaFilter as CatamarcaAreaFilter,
	LocationCard,
	getAreaTheme,
} from '../components/Catamarca';

import {
	IconButton,
	ModalHeader,
	ModalBody,
	ModalFooter,
	useColorMode,
	Box,
	Text,
	Link,
	CloseButton,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import ModalContent from '../components/UI/ModalContent';
import { useMemo, useCallback } from 'react'; // Import useCallback
import { Suspense } from 'react';
import LoadingSpinner from '../components/Screen/LoadingSpinner';

const CatamarcaModalHeader = React.memo(
	({ location: { title, area }, onClose }) => {
		return (
			<ModalHeader
				className='relative text-white'
				bgGradient={`linear(to-r, ${getAreaTheme(area).gradient})`}
				borderRadius='md'
				pb={6}
			>
				<CloseButton
					onClick={onClose}
					position='absolute'
					top={2}
					right={2}
					color='white'
					bg='blackAlpha.500'
					_hover={{ bg: 'blackAlpha.700' }}
					zIndex={2}
				/>
				<Text fontSize='xl' fontWeight='bold' textAlign='center'>
					{title}
				</Text>
			</ModalHeader>
		);
	}
);

CatamarcaModalHeader.displayName = 'CatamarcaModalHeader';

CatamarcaModalHeader.propTypes = {
	location: PropTypes.shape({
		title: PropTypes.string.isRequired,
		area: PropTypes.string.isRequired,
	}).isRequired,
	onClose: PropTypes.func.isRequired,
};

const CatamarcaModalBody = React.memo(
	({ location: { title, mapSrc, description } }) => {
		const { isDark } = useColorMode();
		return (
			<ModalBody py={6}>
				<Box
					borderRadius='lg'
					overflow='hidden'
					boxShadow='md'
					borderWidth='1px'
					borderColor='gray.200'
					_dark={{ borderColor: 'gray.700' }}
					mb={4}
				>
					<iframe
						title={title}
						src={mapSrc}
						className='w-full h-[300px]'
						loading='lazy'
						allowFullScreen
					/>
				</Box>
				<Text color={isDark}>{description}</Text>
			</ModalBody>
		);
	}
);

CatamarcaModalBody.displayName = 'CatamarcaModalBody';

CatamarcaModalBody.propTypes = {
	location: PropTypes.shape({
		title: PropTypes.string.isRequired,
		mapSrc: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
	}).isRequired,
};

const CatamarcaModalFooter = React.memo(({ location: { path, wiki } }) => (
	<ModalFooter justifyContent='center' gap={2}>
		{path && (
			<Link href={path} isExternal>
				<IconButton
					aria-label='Ver en mapa'
					icon={<FaMapMarkerAlt />}
					colorScheme='blue'
					variant='solid'
				/>
			</Link>
		)}
		{wiki && (
			<Link href={wiki} isExternal>
				<IconButton
					aria-label='Más información'
					icon={<FaInfoCircle />}
					colorScheme='teal'
					variant='solid'
				/>
			</Link>
		)}
		{!path && !wiki && (
			<Text color='red.500'>No hay información disponible</Text>
		)}
	</ModalFooter>
));

CatamarcaModalFooter.displayName = 'CatamarcaModalFooter';

CatamarcaModalFooter.propTypes = {
	location: PropTypes.shape({
		path: PropTypes.string,
		wiki: PropTypes.string,
	}).isRequired,
};

const CatamarcaAreaFilterComponent = ({ filters, setFilters }) => {
	const areas = useMemo(() => {
		return [...new Set(locations.map((loc) => loc.area))].sort();
	}, []);

	const selectedArea = filters.area || 'all';

	const handleClick = useCallback(
		(area) => {
			setFilters((prevFilters) => ({ ...prevFilters, area }));
		},
		[setFilters]
	);

	return (
		<m.div
			variants={ANIMATIONS.container}
			className='flex flex-wrap justify-center gap-4 py-4'
		>
			<CatamarcaAreaFilter
				area='Todos'
				isSelected={selectedArea === 'all'}
				onClick={() => handleClick('all')}
			/>
			{areas.map((area) => (
				<CatamarcaAreaFilter
					key={area}
					area={area}
					isSelected={selectedArea === area}
					onClick={() => handleClick(area)}
				/>
			))}
		</m.div>
	);
};

CatamarcaAreaFilterComponent.propTypes = {
	filters: PropTypes.shape({
		area: PropTypes.string,
	}).isRequired,
	setFilters: PropTypes.func.isRequired,
};

const filterCatamarcaLocations = (locations, filters) => {
	const selectedArea = filters.area || 'all';
	return selectedArea === 'all'
		? locations
		: locations.filter((loc) => loc.area === selectedArea);
};

const Catamarca = () => {
	const LocationPage = React.lazy(() =>
		import('../components/UI/LocationPage')
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
