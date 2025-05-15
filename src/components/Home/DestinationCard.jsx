import { memo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaArrowRight } from 'react-icons/fa';
import * as Tooltip from '@radix-ui/react-tooltip';

const cardVariants = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
	exit: { opacity: 0, y: 20, transition: { duration: 0.3, ease: 'easeIn' } },
	hover: {
		scale: 1.05,
		rotate: 2,
		transition: { type: 'spring', stiffness: 300, damping: 20 },
	},
};

const DestinationCard = memo(({ image, title, subtitle, description, to }) => {
	// Colores dinámicos usando Tailwind para tema claro/oscuro
	const textColor = 'text-gray-800 dark:text-gray-100';
	const subTextColor = 'text-gray-600 dark:text-gray-300';
	const borderColor = 'border-white/20 dark:border-gray-800/40';
	const tagColor = 'text-amber-600 dark:text-amber-300';

	return (
		<motion.article
			variants={cardVariants}
			initial='initial'
			animate='animate'
			exit='exit'
			whileHover='hover'
			className={`group relative flex flex-col rounded-2xl overflow-hidden bg-white/50 dark:bg-gray-900/50 backdrop-blur-md border ${borderColor} shadow-xl transition-all min-h-[420px]`}
			role='article'
			aria-label={`Destino: ${title}`}
		>
			{/* Imagen */}
			<div className='relative h-60 w-full overflow-hidden rounded-t-2xl'>
				<img
					src={image}
					alt={`Imagen del destino ${title}`}
					className='w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110'
					loading='lazy'
				/>
				<div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-95' />
			</div>

			{/* Contenido */}
			<div className={`flex flex-col flex-1 p-6 gap-3 ${textColor}`}>
				{/* Titulo y Tooltip */}
				<Tooltip.Root>
					<Tooltip.Trigger>
						<h3 className='text-2xl font-bold tracking-tight mb-1'>{title}</h3>
					</Tooltip.Trigger>
					<Tooltip.Content
						side='top'
						align='center'
						className='bg-black text-white text-xs rounded-lg p-2 shadow-lg max-w-xs'
					>
						{description}
						<Tooltip.Arrow className='fill-black' />
					</Tooltip.Content>
				</Tooltip.Root>

				{/* Subtítulo */}
				{subtitle && (
					<span
						className={`text-xs uppercase tracking-wider font-medium ${tagColor}`}
					>
						{subtitle}
					</span>
				)}

				{/* Descripción */}
				<p
					className={`text-sm leading-relaxed line-clamp-3 flex-1 ${subTextColor}`}
				>
					{description}
				</p>

				{/* Botón */}
				<div className='flex justify-end mt-auto pt-4'>
					<Link
						to={to}
						className={`inline-flex items-center gap-2 font-semibold text-sm hover:underline transition-all ${tagColor}`}
						aria-label={`Explorar ${title}`}
					>
						<span>Explorar</span>
						<motion.span
							whileHover={{ x: 5 }}
							transition={{ type: 'tween', duration: 0.3 }}
							className='inline-block'
						>
							<FaArrowRight className='w-4 h-4' />
						</motion.span>
					</Link>
				</div>
			</div>
		</motion.article>
	);
});

DestinationCard.propTypes = {
	image: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string,
	description: PropTypes.string.isRequired,
	to: PropTypes.string.isRequired,
};

DestinationCard.defaultProps = {
	subtitle: '',
};

DestinationCard.displayName = 'DestinationCard';

export default DestinationCard;
