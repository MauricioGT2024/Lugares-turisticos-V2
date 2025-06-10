import { useState } from 'react';
import AntofagastaCard from './AntofagastaCard';
import AntofagastaModal from './AntofagastaModal';

const AntofagastaGrid = ({ locations, onLocationClick }) => {
	if (!locations) return null;

	return (
		<div className='bg-gradient-to-br from-teal-50 to-white py-12'>
			<div className='max-w-7xl mx-auto px-6'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{locations.map((location) => (
						<AntofagastaCard
							key={location.id}
							item={location}
							onClick={() => onLocationClick(location.id)}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default AntofagastaGrid;
