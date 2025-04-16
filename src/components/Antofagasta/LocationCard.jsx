import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

// ImageHoverCard Component
const ImageHoverCard = ({ image, title, description, category, onClick }) => {
	return (
		<motion.article
			onClick={onClick}
			whileHover={{ y: -8 }}
			className="relative h-[400px] rounded-xl overflow-hidden cursor-pointer group"
		>
			{/* Imagen */}
			<div className="absolute inset-0">
				<motion.img
					src={image}
					alt={title}
					className="w-full h-full object-cover transform transition-all duration-500"
					whileHover={{ scale: 1.05 }}
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
			</div>

			{/* Badge */}
			<div className="absolute top-4 right-4">
				<span className="px-4 py-1.5 rounded-full text-sm font-medium text-white bg-white/20 backdrop-blur-sm">
					{category}
				</span>
			</div>

			{/* Contenido */}
			<motion.div
				className="absolute inset-x-0 bottom-0 p-6 transform transition-transform duration-300"
				initial={{ y: 20, opacity: 0 }}
				whileHover={{ y: 0, opacity: 1 }}
			>
				<h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
				<p className="text-gray-200 line-clamp-2">{description}</p>
			</motion.div>
		</motion.article>
	);
};

ImageHoverCard.propTypes = {
	image: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	category: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
};

// LocationCard Component
const LocationCard = ({ location, onShowDetails }) => {
	return (
		<ImageHoverCard
			image={location.imgSrc}
			title={location.title}
			description={location.description}
			category={location.categoria}
			onClick={() => onShowDetails(location.id)}
		/>
	);
};

LocationCard.propTypes = {
	location: PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		imgSrc: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		categoria: PropTypes.string.isRequired,
	}).isRequired,
	onShowDetails: PropTypes.func.isRequired,
};

export default React.memo(LocationCard);
