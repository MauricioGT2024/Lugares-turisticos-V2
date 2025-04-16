import { useColorMode } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { memo } from 'react';
import {
	FaArchway,
	FaLandmark,
	FaMountain,
	FaSun,
	FaUmbrellaBeach,
} from 'react-icons/fa';

// CATEGORY_CONFIG
export const CATEGORY_CONFIG = {
	Desierto: {
		bgClass: 'bg-gradient-to-r from-amber-500 to-orange-500',
		hoverClass: 'hover:text-amber-500',
		textClass: 'text-amber-500',
		icon: FaSun,
	},
	Cultura: {
		bgClass: 'bg-gradient-to-r from-purple-500 to-pink-500',
		hoverClass: 'hover:text-purple-500',
		textClass: 'text-purple-500',
		icon: FaArchway,
	},
	Termas: {
		bgClass: 'bg-gradient-to-r from-sky-500 to-blue-500',
		hoverClass: 'hover:text-sky-500',
		textClass: 'text-sky-500',
		icon: FaUmbrellaBeach,
	},
	Mirador: {
		bgClass: 'bg-gradient-to-r from-emerald-500 to-teal-500',
		hoverClass: 'hover:text-emerald-500',
		textClass: 'text-emerald-500',
		icon: FaMountain,
	},
	Montañas: {
		bgClass: 'bg-gradient-to-r from-slate-600 to-gray-600',
		hoverClass: 'hover:text-slate-600',
		textClass: 'text-slate-600',
		icon: FaMountain,
	},
	Centro: {
		bgClass: 'bg-gradient-to-r from-yellow-500 to-amber-500',
		hoverClass: 'hover:text-yellow-500',
		textClass: 'text-yellow-500',
		icon: FaLandmark,
	},
};

// ImageHoverCard
export const ImageHoverCard = ({ location, onShowDetails }) => {
	const config = CATEGORY_CONFIG[location.category] || {};

	return (
		<div
			className='relative h-[400px] rounded-xl overflow-hidden cursor-pointer group'
			onClick={() => onShowDetails(location)}
		>
			{/* Imagen */}
			<motion.div
				className='absolute inset-0'
				whileHover={{ scale: 1.02 }}
				transition={{ duration: 0.3 }}
			>
				<img
					src={location.imgSrc}
					alt={location.title}
					className='w-full h-full object-cover transition-transform duration-700'
				/>
			</motion.div>

			{/* Overlay gradiente */}
			<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500' />

			{/* Badge de categoría */}
			<div className='absolute top-4 right-4'>
				<span
					className={`
          inline-block px-4 py-1.5 rounded-full
          text-white text-sm font-medium
          shadow-lg backdrop-blur-md
          ${config.bgClass}
          transition-transform duration-300 group-hover:scale-105
        `}
				>
					{location.category}
				</span>
			</div>

			{/* Contenido */}
			<div className='absolute inset-x-0 bottom-0 p-6 translate-y-10 group-hover:translate-y-0 transition-transform duration-500'>
				<div className='space-y-4'>
					<h2 className='text-2xl font-bold text-white'>{location.title}</h2>
					<motion.p
						className='text-gray-200 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100'
						initial={{ opacity: 0 }}
						whileHover={{ opacity: 1 }}
					>
						{location.description}
					</motion.p>
				</div>
			</div>
		</div>
	);
};

// LocationCard

const LocationCard = ({ location, onShowDetails }) => {
	const config = CATEGORY_CONFIG[location.category] || {};

	return (
		<motion.div
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.98 }}
			className='relative h-[400px] rounded-xl overflow-hidden cursor-pointer group'
			onClick={() => onShowDetails(location)}
		>
			{/* Imagen de fondo */}
			<div className='absolute inset-0'>
				<img
					src={location.imgSrc}
					alt={location.title}
					className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
				/>
			</div>

			{/* Overlay gradiente */}
			<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500' />

			{/* Badge de categoría */}
			<div className='absolute top-4 right-4'>
				<span
					className={`
          inline-block px-4 py-1.5 rounded-full
          text-white text-sm font-medium
          shadow-lg backdrop-blur-md
          ${config.bgClass}
          transition-transform duration-300 group-hover:scale-105
        `}
				>
					{location.category}
				</span>
			</div>

			{/* Contenido */}
			<motion.div className='absolute inset-x-0 bottom-0 p-6 translate-y-10 group-hover:translate-y-0 transition-transform duration-500'>
				<div className='space-y-4'>
					<h2 className='text-2xl font-bold text-white'>{location.title}</h2>

					<p className='text-gray-200 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100'>
						{location.description}
					</p>
				</div>
			</motion.div>
		</motion.div>
	);
};

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

// CategoryButton

const CategoryButton = memo(({ category, isSelected, onClick }) => {
	const { colorMode } = useColorMode();
	const config = CATEGORY_CONFIG[category] || {};
	const Icon = config.icon;

	{
		/* boton de categorias  */
	}

	return (
		<motion.button
			whileHover={{ y: -2, scale: 1.02 }}
			whileTap={{ scale: 0.98 }}
			onClick={onClick}
			className={`
        inline-flex items-center gap-3 px-5 py-2.5 rounded-xl
        text-sm font-medium transition-all duration-300
        ${
					isSelected
						? `${config.bgClass} text-white shadow-lg ring-2 ring-current/20`
						: colorMode === 'dark'
						? 'bg-gray-800/50 text-gray-200 hover:bg-gray-700/50'
						: 'bg-white/50 text-gray-700 hover:bg-gray-50/80'
				}
        backdrop-blur-md border border-current/10
        hover:shadow-xl
      `}
		>
			{Icon && (
				<Icon
					className={`
          w-4 h-4 transition-transform duration-300
          ${isSelected ? 'scale-110' : 'scale-100'}
        `}
				/>
			)}
			{category}
		</motion.button>
	);
});

CategoryButton.displayName = 'CategoryButton';

CategoryButton.propTypes = {
	category: PropTypes.string.isRequired,
	isSelected: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired,
};

// CategoryFilter

const CategoryFilter = memo(
	({ categories, categoryFilter, setCategoryFilter }) => {
		const { colorMode } = useColorMode();

		{
			/* filtro de categorias */
		}
		return (
			<motion.div
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				className={`
        w-full max-w-4xl mx-auto p-6 rounded-2xl
        ${
					colorMode === 'dark'
						? 'bg-gray-800/30 border-gray-700/50'
						: 'bg-white/30 border-gray-200/50'
				}
        border backdrop-blur-lg shadow-xl
      `}
			>
				<div className='flex flex-wrap justify-center gap-3'>
					<CategoryButton
						category='Todas'
						isSelected={!categoryFilter}
						onClick={() => setCategoryFilter('')}
					/>
					{categories.map((category) => (
						<CategoryButton
							key={category}
							category={category}
							isSelected={categoryFilter === category}
							onClick={() => setCategoryFilter(category)}
						/>
					))}
				</div>
			</motion.div>
		);
	}
);

CategoryFilter.displayName = 'CategoryFilter';

CategoryFilter.propTypes = {
	categories: PropTypes.arrayOf(PropTypes.string).isRequired,
	categoryFilter: PropTypes.string.isRequired,
	setCategoryFilter: PropTypes.func.isRequired,
};

export default CategoryFilter;

LocationCard.propTypes = {
	location: PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		imgSrc: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		category: PropTypes.string.isRequired,
	}).isRequired,
	onShowDetails: PropTypes.func.isRequired,
};
LocationCard.displayName = 'LocationCard';
