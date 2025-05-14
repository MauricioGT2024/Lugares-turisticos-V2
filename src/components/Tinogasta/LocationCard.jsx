// components/Tinogasta/TinogastaLocationCard.jsx
import PropTypes from 'prop-types';
import BaseImageHoverCard from '@/components/common/BaseImageHoverCard';
import { getTinogastaTheme } from './tinogastaThemes'; // lo creamos abajo

const TinogastaLocationCard = ({ location, onShowDetails }) => {
	const config = getTinogastaTheme(location.category); // usa categoría para temas
	const Icon = config.icon;

	return (
		<BaseImageHoverCard
			imgSrc={location.imgSrc}
			title={location.name}
			description={location.description}
			badge={location.category}
			icon={<Icon size={18} />}
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
	location: PropTypes.object.isRequired,
	onShowDetails: PropTypes.func.isRequired,
};

export default TinogastaLocationCard;
