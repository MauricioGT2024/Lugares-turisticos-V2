import React from 'react';
import PropTypes from 'prop-types';
import BaseImageHoverCard from '@/components/common/BaseImageHoverCard';

const AntofagastaLocationCard = ({ location, onShowDetails }) => {
	return (
		<BaseImageHoverCard
			id={location.id}
			title={location.title}
			description={location.description}
			imgSrc={location.imgSrc}
			category={location.categoria}
			onClick={onShowDetails}
			categoryColor='bg-orange-500 text-white'
			overlayGradient='from-orange-800/70 via-orange-600/40 to-transparent'
		/>
	);
};

AntofagastaLocationCard.propTypes = {
	location: PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		imgSrc: PropTypes.string.isRequired,
		categoria: PropTypes.string,
	}).isRequired,
	onShowDetails: PropTypes.func.isRequired,
};

export default React.memo(AntofagastaLocationCard);
