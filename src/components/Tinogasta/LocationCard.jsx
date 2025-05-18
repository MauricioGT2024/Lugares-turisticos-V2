// components/Tinogasta/TinogastaLocationCard.jsx
import PropTypes from 'prop-types';
import BaseImageHoverCard from '@/components/common/BaseImageHoverCard';
import { getTinogastaTheme } from './tinogastaThemes';
import React from 'react';

const TinogastaLocationCard = ({ location: { imgSrc, id, title, description, category }, onShowDetails }) => {
	const config = getTinogastaTheme(category);

	return (
		<BaseImageHoverCard
			imgSrc={imgSrc}
			id={id} // Assuming id exists and is needed by BaseImageHoverCard
			title={title} // Changed back to  for Tinogasta data
			description={description}
			badge={category.toUpperCase()}
			onClick={() => onShowDetails(location)}
			variant='tinogasta'
			styleConfig={{
				overlayGradient: config.overlayGradient,
				badgeBg: config.badgeBg,
				height: '420px',
			}}
		/>
	);
};

TinogastaLocationCard.propTypes = {
	location: PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		title: PropTypes.string.isRequired, // Changed propTypes back to require 'name'
		description: PropTypes.string.isRequired,
		imgSrc: PropTypes.string.isRequired,
		category: PropTypes.string,
	}).isRequired,
	onShowDetails: PropTypes.func.isRequired,
};

export default React.memo(TinogastaLocationCard);
