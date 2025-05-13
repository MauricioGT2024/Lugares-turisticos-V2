// 1. React & Third-party
import React, { Suspense, useMemo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { m } from 'framer-motion';
import { FaMapMarkerAlt, FaInfoCircle } from 'react-icons/fa';

// 2. Chakra UI
import {
	Box,
	Text,
	Link,
	IconButton,
	CloseButton,
	ModalHeader,
	ModalBody,
	ModalFooter,
	useColorMode,
} from '@chakra-ui/react';

// 3. Internal
import { locations } from '@/data/catamarca';
import {
	ANIMATIONS,
	AreaFilter as CatamarcaAreaFilter,
	getAreaTheme,
} from '@/components/Catamarca';
import ModalContent from '@/components/common/ModalContent';
import LocationCard from '@/components/common/LocationCard';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import CustomModal from '@/components/common/CustomModal';

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
	const getUniqueAreas = () =>
		[...new Set(locations.map((loc) => loc.area))].sort();
	const areas = useMemo(getUniqueAreas, []);

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


const CatamarcaLocationCard = (props) => {
	const { location, ...rest } = props;
	const config = getAreaTheme(location.area);
	const [isOpen, setIsOpen] = useState(false);

	const handleOpen = () => setIsOpen(true);
	const handleClose = () => setIsOpen(false);

	return (
		<>
			<LocationCard
				location={location}
				config={config}
				{...rest}
				onClick={handleOpen}
			/>
			<CustomModal
				isOpen={isOpen}
				onClose={handleClose}
				title={location.title || location.name}
				headerGradient={config.gradient}
				size='xl'
				footer={
					<div
						style={{
							display: 'flex',
							gap: 12,
							flexWrap: 'wrap',
							justifyContent: 'flex-end',
							width: '100%',
						}}
					>
						{location.path && (
							<a
								href={location.path}
								target='_blank'
								rel='noopener noreferrer'
								className='px-6 py-2 rounded-full bg-gradient-to-r from-teal-500 to-amber-500 text-white font-semibold shadow hover:scale-105 hover:shadow-lg transition-all duration-300'
							>
								Ver en mapa
							</a>
						)}
						{location.wiki && (
							<a
								href={location.wiki}
								target='_blank'
								rel='noopener noreferrer'
								className='px-6 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold shadow hover:scale-105 hover:shadow-lg transition-all duration-300'
							>
								Más información
							</a>
						)}
					</div>
				}
			>
				<div
					style={{
						display: 'grid',
						gridTemplateRows: 'auto 1fr',
						gridTemplateColumns: '1fr 1fr',
						gap: 0,
						minHeight: 400,
					}}
				>
					{/* Header: Imagen */}
					<div style={{ gridColumn: '1 / 3', gridRow: 1 }}>
						<img
							src={location.imgSrc}
							alt={location.title || location.name}
							style={{
								width: '100%',
								borderRadius: 12,
								maxHeight: 320,
								objectFit: 'cover',
								marginBottom: 0,
							}}
						/>
					</div>
					{/* Izquierda: Descripción */}
					<div
						style={{
							gridColumn: 1,
							gridRow: 2,
							padding: 24,
							display: 'flex',
							alignItems: 'flex-start',
						}}
					>
						<p style={{ fontSize: 18, color: '#444', margin: 0 }}>
							{location.description}
						</p>
					</div>
					{/* Derecha: Iframe */}
					<Box
						as='iframe'
						title={location.title}
						src={location.mapSrc}
						loading='lazy'
						allowFullScreen
						w='full'
						h='300px'
						border='none'
						borderRadius='12px'
						boxShadow='md'
						overflow='hidden'
						style={{
							gridColumn: 2,
							gridRow: 2,
							padding: 24,
							display: 'flex',
							alignItems: 'flex-start',
						}}
						_dark={{ backgroundColor: 'gray.800' }}
					>
						{location.mapSrc && (
							<div
								style={{
									borderRadius: 12,
									overflow: 'hidden',
									width: '100%',
									minHeight: 240,
								}}
							>
								<iframe
									src={location.mapSrc}
									title={location.title || location.name}
									style={{ width: '100%', height: 240, border: 0 }}
									loading='lazy'
									allowFullScreen
								/>
							</div>
						)}
					</Box>
				</div>
			</CustomModal>
		</>
	);
};

CatamarcaLocationCard.propTypes = {
	location: PropTypes.shape({
		title: PropTypes.string,
		name: PropTypes.string,
		imgSrc: PropTypes.string,
		description: PropTypes.string,
		mapSrc: PropTypes.string,
		path: PropTypes.string,
		wiki: PropTypes.string,
		area: PropTypes.string,
	}).isRequired,
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
				locationCardComponent={CatamarcaLocationCard}
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
