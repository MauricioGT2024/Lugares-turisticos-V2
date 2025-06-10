import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const TinogastaCard = ({ location, onClick }) => {
	if (!location) return null;

	return (
		<motion.article
			whileHover={{ scale: 1.02, y: -5 }}
			whileTap={{ scale: 0.98 }}
			className='group relative break-inside-avoid h-[500px] cursor-pointer rounded-3xl overflow-hidden shadow-2xl hover:shadow-purple-500/20 transition-all duration-500'
			onClick={onClick}
		>
			<div className='absolute inset-0 transform group-hover:scale-110 transition-transform duration-700'>
				<img
					src={location.imgSrc}
					alt={location.name}
					className='h-full w-full object-cover'
				/>
				<div className='absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-900/50 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-300' />
			</div>

			{/* Contenido con animación */}
			<div className='absolute inset-x-0 bottom-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500'>
				{location.category && (
					<motion.span
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						className='inline-block px-4 py-2 rounded-lg bg-purple-600/90 text-white text-sm font-medium mb-4 backdrop-blur-sm'
					>
						{location.category}
					</motion.span>
				)}
				<h3 className='text-3xl font-bold text-white mb-4 transform -translate-y-2 group-hover:translate-y-0 transition-all duration-500'>
					{location.name}
				</h3>
				<p className='text-gray-200 leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100'>
					{location.description}
				</p>
			</div>
		</motion.article>
	);
};

TinogastaCard.propTypes = {
	location: PropTypes.shape({
		imgSrc: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		category: PropTypes.string,
	}).isRequired,
	onClick: PropTypes.func.isRequired,
};

export default TinogastaCard;
