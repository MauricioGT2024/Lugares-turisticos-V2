import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { memo } from 'react';
import { CATEGORY_CONFIG } from './categoryConfig'; // Opcional mover a archivo aparte

const ImageHoverCard = memo(({ location, onShowDetails }) => {
	const config = CATEGORY_CONFIG[location.category] || {};

	return (
		<motion.article
			layout
			whileHover='hover'
			initial='initial'
			animate='animate'
			variants={{
				hover: {
					y: -6,
					transition: { duration: 0.3, ease: 'easeOut' },
				},
			}}
			onClick={() => onShowDetails(location)}
			className='relative rounded-3xl overflow-hidden group cursor-pointer shadow-xl h-[450px]'
			role='button'
			aria-label={`Ver detalles de ${location.title}`}
		>
			{/* Imagen */}
			<motion.div
				className='absolute inset-0'
				variants={{
					hover: { scale: 1.05, transition: { duration: 0.4 } },
				}}
			>
				<img
					src={location.imgSrc}
					alt={`Imagen de ${location.title}`}
					className='w-full h-full object-cover'
					loading='lazy'
				/>
			</motion.div>

			{/* Gradiente Overlay */}
			<motion.div
				className='absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent'
				variants={{ initial: { opacity: 0.4 }, hover: { opacity: 0.7 } }}
			/>

			{/* Contenido */}
			<div className='absolute bottom-0 inset-x-0 p-6'>
				<motion.div
					variants={{
						initial: { y: 20, opacity: 0 },
						animate: { y: 0, opacity: 1 },
						hover: { y: -8 },
					}}
					className='space-y-3'
				>
					<div className='flex items-center space-x-2'>
						{config.icon && <config.icon className='w-5 h-5 text-white/80' />}
						<span
							className={`px-3 py-1 rounded-full text-sm font-semibold text-white shadow ${config.bgClass}`}
						>
							{location.category}
						</span>
					</div>
					<h2 className='text-2xl font-bold text-white drop-shadow-sm'>
						{location.title}
					</h2>
					<motion.p
						variants={{ hover: { opacity: 1, y: 0 } }}
						className='text-sm text-gray-200 line-clamp-2 opacity-80'
					>
						{location.description}
					</motion.p>
				</motion.div>
			</div>
		</motion.article>
	);
});

ImageHoverCard.displayName = 'ImageHoverCard';

ImageHoverCard.propTypes = {
	location: PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		imgSrc: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		category: PropTypes.string.isRequired,
	}).isRequired,
	onShowDetails: PropTypes.func.isRequired,
};

export default ImageHoverCard;
