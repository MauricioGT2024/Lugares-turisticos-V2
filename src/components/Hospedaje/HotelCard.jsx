import { motion } from 'framer-motion';
import { FaMapMarkedAlt, FaStar } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { FaLocationDot } from 'react-icons/fa6';

const HotelCard = ({ hotel, onOpenMap }) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
		>
			<div className='relative group w-full h-96 rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105'>
				<img
					src={hotel.image}
					alt={hotel.title}
					loading='lazy'
					aria-label={`Imagen de ${hotel.title}`}
					aria-hidden='true'
					aria-describedby={hotel.description}
					className='w-full h-full object-cover'
				/>
				<div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-center text-white p-4'>
					<div>
						<h3 className='text-xl font-bold mb-2'>{hotel.title}</h3>
						<p>{hotel.description}</p>
						<button
							onClick={() => onOpenMap(hotel)}
							className='mt-4 inline-flex items-center gap-2 px-4 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-black transition'
						>
							<FaMapMarkedAlt /> Ver en mapa
						</button>
					</div>
				</div>
				<div className='absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1'>
					<FaStar /> Premium
				</div>
				<div className='absolute top-4 right-4 bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1'>
					<FaLocationDot /> {hotel.location}
				</div>
			</div>
		</motion.div>
	);
};

HotelCard.propTypes = {
	hotel: PropTypes.shape({
		image: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		location: PropTypes.string.isRequired,
	}).isRequired,
	onOpenMap: PropTypes.func.isRequired,
};
HotelCard.defaultProps = {
	onOpenMap: () => {},
};

export default HotelCard;
