import { memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useColorMode } from '@chakra-ui/react';
import { getAreaTheme, getIconByArea } from './config';
import { useCallback } from 'react';
import clsx from 'clsx';
import { useMemo } from 'react';


const cardVariants = {
	initial: { opacity: 0, y: 40 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -40 },
	hover: {
		scale: 1.025,
		boxShadow: '0 6px 32px 0 rgba(0,0,0,0.10), 0 1.5px 6px 0 rgba(0,0,0,0.06)',
	},
	tap: { scale: 0.98 },
};

const contentVariants = {
	initial: { opacity: 0, y: 16 },
	animate: { opacity: 1, y: 0, transition: { duration: 0.25, delay: 0.15 } },
	hover: { y: -4, transition: { duration: 0.2 } },
};

const textVariants = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
	exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
};

export const LocationCard = memo(({ location, onShowDetails }) => {
	const { id, imgSrc, title, description, area } = location;
	const { gradient } = getAreaTheme(area);
	const { colorMode } = useColorMode();

	const handleClick = useCallback(() => {
		onShowDetails(id);
	}, [onShowDetails, id]);

	const AreaIcon = useMemo(() => getIconByArea(area), [area]);
	if (!AreaIcon) {
		console.warn(`No icon found for area: ${area}`);
		return null;
	}
	if (!imgSrc) {
		console.warn(`No image source provided for location: ${title}`);
		return null;
	}

	const bgCard =
		colorMode === 'dark'
			? 'bg-gray-900 border-gray-800'
			: 'bg-white border-gray-100';
	const textTitle =
		colorMode === 'dark'
			? 'text-white'
			: 'text-gray-900';
	const textDesc =
		colorMode === 'dark'
			? 'text-gray-300'
			: 'text-gray-700';

	return (
		<motion.article
			layout
			variants={cardVariants}
			initial='initial'
			animate='animate'
			exit='exit'
			whileHover='hover'
			whileTap='tap'
			onClick={handleClick}
			className={`group relative h-[370px] rounded-xl overflow-hidden ${bgCard} border shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer`}
		>
			<motion.img
				src={imgSrc}
				alt={`Imagen de ${title} en ${area}`}
				className='w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105'
				variants={cardVariants}
				initial='initial'
				animate='animate'
				whileHover='hover'
				loading='lazy'
			/>
			{/* Overlay minimalista */}
			<div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none' />
			{/* Chip de área */}
			<div
				className={`absolute top-4 right-4 px-3 py-1 rounded-full flex items-center gap-2 shadow-sm text-white text-xs font-medium ${gradient} bg-opacity-90 backdrop-blur-sm transition-all duration-300 group-hover:scale-105`}
				style={{ minWidth: 0 }}
			>
				{/* Icono del área */}

				<AreaIcon className='w-4 h-4' />
				<span className='truncate'>{area}</span>
			</div>
			{/* Contenido */}
			<motion.div
				className='absolute inset-x-0 bottom-0 p-5'
				variants={contentVariants}
				whileHover='hover'
			>
				<motion.h3
					className={`text-lg font-semibold mb-1 drop-shadow-sm ${textTitle}`}
					variants={textVariants}
					initial='initial'
					animate='animate'
					exit='exit'
				>
					{title}
				</motion.h3>
				<motion.p
					className={`text-sm line-clamp-2 drop-shadow-sm ${textDesc}`}
					variants={textVariants}
					initial='initial'
					animate='animate'
					exit='exit'
					transition={{ delay: 0.15 }}
				>
					{description}
				</motion.p>
			</motion.div>
		</motion.article>
	);
});

LocationCard.displayName = 'LocationCard';

LocationCard.propTypes = {
	location: PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		imgSrc: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		area: PropTypes.string.isRequired,
	}).isRequired,
	onShowDetails: PropTypes.func.isRequired,
};

const filterVariants = {
	initial: { opacity: 0, scale: 0.8 },
	animate: { opacity: 1, scale: 1 },
	hover: { scale: 1.1 },
	tap: { scale: 0.9 },
};

export const AreaFilter = memo(({ area, isSelected, onClick }) => {
	const { colorMode } = useColorMode();
	const { icon: Icon, gradient } = getAreaTheme(area);

	const buttonClasses = clsx(
		'inline-flex items-center gap-2 px-5 py-2 rounded-full font-semibold shadow-sm transition-colors duration-300',
		{
			[gradient]: isSelected,
			'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white':
				!isSelected && colorMode === 'dark',
			'bg-white text-gray-700 hover:bg-gray-100':
				!isSelected && colorMode === 'light',
		},
		'border border-transparent hover:border-yellow-500/50'
	);

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
