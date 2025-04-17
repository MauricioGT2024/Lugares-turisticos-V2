import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaInfoCircle } from 'react-icons/fa';
import { locations } from '../data/catamarca';
import {
	ANIMATIONS,
	AreaFilter as CatamarcaAreaFilter,
	LocationCard,
	getAreaTheme,
} from '../components/Catamarca';
import LocationPage from '../components/UI/LocationPage';
import {
	IconButton,
	ModalHeader,
	ModalBody,
	ModalFooter,
	useColorMode,
	Box,
	Text,
	Link,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import ModalContent from '../components/UI/ModalContent';

const CatamarcaModalHeader = ({ location }) => {
	return (
		<ModalHeader
			className={`text-white`}
			bgGradient={`linear(to-r, ${getAreaTheme(location.area).gradient})`}
			borderRadius='md'
		>
			<Text fontSize='xl' fontWeight='bold' textAlign='center'>
				{location.title}
			</Text>
		</ModalHeader>
	);
};

CatamarcaModalHeader.propTypes = {
	location: PropTypes.shape({
		title: PropTypes.string.isRequired,
		area: PropTypes.string.isRequired,
	}).isRequired,
};

const CatamarcaModalBody = ({ location }) => {
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
					title={location.title}
					src={location.mapSrc}
					className='w-full h-[300px]'
					loading='lazy'
					allowFullScreen
				/>
			</Box>
			<Text color={isDark}>{location.description}</Text>
		</ModalBody>
	);
};

CatamarcaModalBody.propTypes = {
	location: PropTypes.shape({
		title: PropTypes.string.isRequired,
		mapSrc: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
	}).isRequired,
};

const CatamarcaModalFooter = ({ location }) => (
	<ModalFooter justifyContent='center' gap={2}>
		{location.path && (
			<Link href={location.path} isExternal>
				<IconButton
					aria-label='Ver en mapa'
					icon={<FaMapMarkerAlt />}
					colorScheme='blue'
					variant='solid'
				/>
			</Link>
		)}
		{location.wiki && (
			<Link href={location.wiki} isExternal>
				<IconButton
					aria-label='Más información'
					icon={<FaInfoCircle />}
					colorScheme='teal'
					variant='solid'
				/>
			</Link>
		)}
	</ModalFooter>
);

CatamarcaModalFooter.propTypes = {
	location: PropTypes.shape({
		path: PropTypes.string,
		wiki: PropTypes.string,
	}).isRequired,
};

const CatamarcaAreaFilterComponent = ({ filters, setFilters }) => {
	const areas = React.useMemo(() => {
		return [...new Set(locations.map((loc) => loc.area))].sort();
	}, []);

	const selectedArea = filters.area || 'all';

	const setSelectedArea = (area) => {
		setFilters({ ...filters, area });
	};

	return (
		<motion.div
			variants={ANIMATIONS.container}
			className='flex flex-wrap justify-center gap-4 py-4'
		>
			<CatamarcaAreaFilter
				area='Todos'
				isSelected={selectedArea === 'all'}
				onClick={() => setSelectedArea('all')}
			/>
			{areas.map((area) => (
				<CatamarcaAreaFilter
					key={area}
					area={area}
					isSelected={selectedArea === area}
					onClick={() => setSelectedArea(area)}
				/>
			))}
		</motion.div>
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
	return (
		<LocationPage
			title='San Fernando del Valle'
			locations={locations}
			filterComponent={CatamarcaAreaFilterComponent}
			locationCardComponent={LocationCard}
			modalContent={({ location }) => (
				<ModalContent
					size="sm"
					header={<CatamarcaModalHeader location={location} />}
					body={<CatamarcaModalBody location={location} />}
					footer={<CatamarcaModalFooter location={location} />}
				/>
			)}
			pageVariants={ANIMATIONS.fadeInDown}
			filterFunction={filterCatamarcaLocations}
		/>
	);
};

export default React.memo(Catamarca);
