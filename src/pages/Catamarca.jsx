// React & Third-party
import * as RadioGroup from '@radix-ui/react-radio-group';
import React, { Suspense, useMemo, useState } from 'react';
import { m } from 'framer-motion';
import PropTypes from 'prop-types';


// Internal
import { locations } from '@/data/catamarca';
import { AreaFilter } from '@/components/Catamarca/AreaFilter';
import { ANIMATIONS } from '@/components/Catamarca/animations';
import { getAreaTheme } from '@/components/Catamarca/areaThemes';
import CatamarcaLocationCard from '@/components/Catamarca/LocationCard';
import CatamarcaModal from '@/components/Catamarca/CatamarcaModal';

import LoadingSpinner from '@/components/common/LoadingSpinner';



const CatamarcaAreaFilterComponent = ({ filters, setFilters }) => {
	const areas = useMemo(
		() => [...new Set(locations.map((loc) => loc.area))].sort(),
		[]
	);

	const selectedArea = filters.area || 'all';

	const handleAreaChange = (area) => {
		setFilters((prev) => ({ ...prev, area }));
	};

	return (
		<m.div
			variants={ANIMATIONS.container}
			className='flex flex-wrap justify-center gap-4 py-4'
		>
			<RadioGroup.Root value={selectedArea} onValueChange={handleAreaChange}>
				<RadioGroup.Item value='all'>
					{/* Aquí puedes personalizar tu diseño */}
					<AreaFilter area='Todos' isSelected={selectedArea === 'all'} />
				</RadioGroup.Item>
				{areas.map((area) => (
					<RadioGroup.Item key={area} value={area}>
						<AreaFilter
							area={area}
							isSelected={selectedArea === area}
							gradient={getAreaTheme(area).gradient}
							icon={getAreaTheme(area).icon}
						/>
					</RadioGroup.Item>
				))}
			</RadioGroup.Root>
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
			
				pageVariants={ANIMATIONS.fadeInDown}
				filterFunction={filterCatamarcaLocations}
			/>
		</Suspense>
	);
};

export default React.memo(Catamarca);
Catamarca.displayName = 'Catamarca';
CatamarcaAreaFilterComponent.displayName = 'CatamarcaAreaFilterComponent';
CatamarcaLocationCard.displayName = 'CatamarcaLocationCard';

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
