import BaseImageHoverCard from '@/components/common/BaseImageHoverCard';
import PropTypes from 'prop-types';
import { getAreaTheme } from '@/components/Catamarca/areaThemes';

const CatamarcaLocationCard = ({ location, onClick }) => {
	const config = getAreaTheme(location.area);
	

	return (
		<BaseImageHoverCard
			imgSrc={location.imgSrc}
			title={location.title}
			description={location.description}
			badge={location.category}
			icon={config.icon}
			onClick={onClick}
			variant='catamarca'
			styleConfig={{
				overlayGradient: 'linear(to-t, cyan.600, transparent)',
				badgeBg: 'blue.400',
				height: '300px',
			}}
		/>
	);
};

export default CatamarcaLocationCard;
CatamarcaLocationCard.propTypes = {
  location: PropTypes.shape({
    imgSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
