import  { memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useColorMode } from '@chakra-ui/react';
import { getAreaTheme, getIconByArea } from './config';

const cardVariants = {
	initial: { opacity: 0, y: 50 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -50 },
	hover: {
		scale: 1.05,
		boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.3)',
	},
	tap: { scale: 0.95 },
};

const contentVariants = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.2 } },
	hover: { y: -10, transition: { duration: 0.3 } },
};

export const LocationCard = memo(({ location, onShowDetails }) => {
	const { gradient } = getAreaTheme(location.area);
	const AreaIcon = getIconByArea(location.area);

	return (
		<motion.article
			variants={cardVariants}
			initial='initial'
			animate='animate'
			exit='exit'
			whileHover='hover'
			whileTap='tap'
			onClick={() => onShowDetails(location.id)}
			className='group relative h-[420px] rounded-2xl overflow-hidden shadow-lg transition-shadow duration-300 cursor-pointer'
		>
			<motion.img
				src={location.imgSrc}
				alt={location.title}
				className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-110'
			/>
			<motion.div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent' />
			<motion.div
				className='absolute inset-x-0 bottom-0 p-6'
				variants={contentVariants}
				whileHover='hover'
			>
				<h3 className='text-2xl font-bold text-white drop-shadow-md'>{location.title}</h3>
				<p className='text-gray-200 line-clamp-2 drop-shadow-md'>
					{location.description}
				</p>
			</motion.div>

			<div
				className={`absolute top-4 right-4 px-4 py-2 rounded-full flex items-center gap-2 shadow-md text-white text-sm font-medium ${gradient} transition-all duration-300 group-hover:scale-110`}
			>
				<AreaIcon className='w-4 h-4' />
				<span>{location.area}</span>
			</div>
		</motion.article>
	);
});

const filterVariants = {
	initial: { opacity: 0, scale: 0.8 },
	animate: { opacity: 1, scale: 1 },
	hover: { scale: 1.1 },
	tap: { scale: 0.9 },
};

export const AreaFilter = memo(({ area, isSelected, onClick }) => {
	const { colorMode } = useColorMode();
	const { icon: Icon } = getAreaTheme(area);
	const isDark = colorMode === 'dark';

	return (
		<motion.button
			variants={filterVariants}
			initial='initial'
			animate='animate'
			whileHover='hover'
			whileTap='tap'
			onClick={onClick}
			className={`inline-flex items-center gap-2 px-5 py-2 rounded-full font-semibold shadow-sm transition-colors duration-300
		${
					isSelected
						? 'bg-gradient-to-r from-yellow-500 via-green-500 to-yellow-500 text-white shadow-lg shadow-yellow-500/50'
						: isDark
						? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
						: 'bg-white text-gray-700 hover:bg-gray-100'
				}
		border border-transparent hover:border-yellow-500/50`}
		>
			<Icon className='w-4 h-4' />
			<span>{area}</span>
		</motion.button>
	);
});

LocationCard.displayName = 'LocationCard';
AreaFilter.displayName = 'AreaFilter';

LocationCard.propTypes = {
	location: PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		imgSrc: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		category: PropTypes.string.isRequired,
		area: PropTypes.string.isRequired,
	}).isRequired,
	onShowDetails: PropTypes.func.isRequired,
};

AreaFilter.propTypes = {
	area: PropTypes.string.isRequired,
	isSelected: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired,
};
