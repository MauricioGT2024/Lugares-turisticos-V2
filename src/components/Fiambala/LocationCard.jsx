// src/components/Fiambala/FiambalaLocationCard.jsx
import BaseImageHoverCard from '@/components/common/BaseImageHoverCard';
import { FaHiking } from 'react-icons/fa';
import PropTypes from 'prop-types';

const FiambalaLocationCard = ({ location, onClick }) => {
	return (
		<BaseImageHoverCard
			imgSrc={location.imgSrc}
			title={location.title}
			description={location.description}
			badge='Aventura'
			icon={FaHiking}
			onClick={onClick}
			variant='fiambala'
			styleConfig={{
				overlayGradient: 'linear(to-t, pink.600, transparent)',
				badgeBg: 'pink.500',
				height: '320px',
			}}
		/>
	);
};

export default FiambalaLocationCard;

FiambalaLocationCard.propTypes = {
	location: PropTypes.shape({
		imgSrc: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		category: PropTypes.string.isRequired,
		area: PropTypes.string.isRequired,
	}).isRequired,
	onClick: PropTypes.func.isRequired,
};
