import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { CATEGORY_CONFIG } from './Fiambala/CategoryConfig';


const LocationCard = ({ location, onClick, config }) => {
	const Icon = config.icon;
  const { title, description, category, imgSrc } = location;
	const categoryConfig = CATEGORY_CONFIG[category] || {};
	return (
		<motion.div
			whileHover={{ y: -8 }}
			whileTap={{ scale: 0.98 }}
			className='relative h-[400px] rounded-xl overflow-hidden cursor-pointer group'
			onClick={onClick}
		>
			<div className='absolute inset-0'>
				<img
					src={imgSrc}
					alt={title}
					className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
				/>
			</div>

			<div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity' />

			<div
				className={`
           absolute top-4 right-4 px-4 py-1.5 rounded-full
           ${categoryConfig.bgClass} text-white text-sm font-medium
           shadow-lg backdrop-blur-md flex items-center gap-2
           transform transition-all duration-300
           group-hover:scale-105
         `}
			>
				{Icon && <Icon className='w-4 h-4' />}
				{category}
			</div>

			<motion.div className='absolute inset-x-0 bottom-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300'>
				<h2 className='text-2xl font-bold text-white mb-2'>{title}</h2>
				<p className='text-gray-200 line-clamp-2'>{description}</p>
			</motion.div>
		</motion.div>
	);
};

LocationCard.propTypes = {
	location: PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		imgSrc: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		mapSrc: PropTypes.string.isRequired,
		path: PropTypes.string,
		wiki: PropTypes.string,
		category: PropTypes.string,
		area: PropTypes.string,
	}).isRequired,
	onClick: PropTypes.func.isRequired,
	config: PropTypes.shape({
		spinnerColor: PropTypes.string,
		badgeClass: PropTypes.string,
		iconClass: PropTypes.string,
		icon: PropTypes.elementType,
		category: PropTypes.string,
	}).isRequired,
};

export default React.memo(LocationCard);
