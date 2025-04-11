import {
  FaMountain,
  FaUmbrellaBeach,
  FaLandmark,
  FaArchway,
  FaSun,
} from "react-icons/fa";


import { memo } from 'react';
import { motion } from 'framer-motion';
import { useColorMode } from '@chakra-ui/react';
import PropTypes from 'prop-types';

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



const CategoryButton = memo(({ category, isSelected, onClick }) => {
	const { colorMode } = useColorMode();
	const config = CATEGORY_CONFIG[category] || {};
	const Icon = config.icon;

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

const CategoryFilter = memo(
	({ categories, categoryFilter, setCategoryFilter }) => {
		const { colorMode } = useColorMode();

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