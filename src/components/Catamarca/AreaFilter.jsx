import { memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useAreaFilterStyle } from '@/components/Catamarca/areaThemes';

const filterVariants = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
	hover: { scale: 1.05, transition: { duration: 0.2 } },
	tap: { scale: 0.95 },
};

export const AreaFilter = memo(({ area, isSelected, onClick }) => {
	const { Icon, buttonClasses } = useAreaFilterStyle(area, isSelected);

	return (
		<motion.button
			variants={filterVariants}
			initial='initial'
			animate='animate'
			whileHover='hover'
			whileTap='tap'
			onClick={onClick}
			className={buttonClasses}
		>
			<Icon className='w-4 h-4' />
			<span>{area}</span>
		</motion.button>
	);
});

AreaFilter.displayName = 'AreaFilter';

AreaFilter.propTypes = {
	area: PropTypes.string.isRequired,
	isSelected: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired,
};
AreaFilter.defaultProps = {
	area: 'Todos',
	isSelected: false,
	onClick: () => {},
};
