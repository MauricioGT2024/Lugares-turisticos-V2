import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { CATEGORY_CONFIG } from './components';
import { memo } from 'react';

const LocationCard = memo(({ location, onShowDetails }) => {
	const config = CATEGORY_CONFIG[location.category] || {};

	return (
		<motion.article
			layout
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.98 }}
			className='relative h-[400px] rounded-2xl overflow-hidden group shadow-lg cursor-pointer'
			onClick={() => onShowDetails(location)}
			aria-label={`Abrir ${location.title}`}
			role='button'
		>
			<img
				src={location.imgSrc}
				alt={`Imagen de ${location.title}`}
				className='absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
				loading='lazy'
			/>

			{/* Gradiente superior */}
			<div className='absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent group-hover:opacity-90 transition-opacity duration-500' />

			{/* Badge de categoría */}
			<div className='absolute top-4 right-4 z-10'>
				<span
					className={`inline-block px-4 py-1 text-sm font-medium rounded-full text-white shadow-lg ${config.bgClass}`}
				>
					{location.category}
				</span>
			</div>

			{/* Texto inferior */}
			<motion.div className='absolute inset-x-0 bottom-0 p-6 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500'>
				<h2 className='text-xl font-semibold text-white'>{location.title}</h2>
				<p className='text-sm text-gray-200 mt-2 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75'>
					{location.description}
				</p>
			</motion.div>
		</motion.article>
	);
});

LocationCard.displayName = 'LocationCard';
LocationCard.propTypes = {
	location: PropTypes.shape({
		imgSrc: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		category: PropTypes.string.isRequired,
	}).isRequired,
	onShowDetails: PropTypes.func.isRequired,
};

export default LocationCard;
