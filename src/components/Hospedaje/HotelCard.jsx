import { motion } from 'framer-motion';
import { useColorMode } from '@chakra-ui/react';
import { FaLocationDot, FaStar } from 'react-icons/fa6';
import PropTypes from 'prop-types';
import { FaMapMarkedAlt } from 'react-icons/fa';

const HotelCard = ({ hotel, onOpenMap }) => {
	const { colorMode } = useColorMode();

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			className='group cursor-pointer'
		>
			<div
				className={`
        relative rounded-2xl overflow-hidden
        ${colorMode === 'dark' ? 'bg-gray-800' : 'bg-white'}
        shadow-lg hover:shadow-2xl transition-all duration-500
      `}
			>
				{/* Contenedor de imagen */}
				<div className='relative h-80 overflow-hidden'>
					<motion.img
						src={hotel.image}
						alt={hotel.title}
						className='w-full h-full object-cover'
						whileHover={{ scale: 1.05, rotate: -1 }}
						transition={{ duration: 0.6 }}
					/>

					{/* Overlay en hover */}
					<div
						className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent 
                        opacity-0 group-hover:opacity-100 transition-all duration-300'
					>
						<div
							className='absolute inset-0 flex flex-col justify-center items-center p-6 
                          translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 
                          transition-all duration-300'
						>
							<p className='text-white/90 text-center mb-4'>
								{hotel.description}
							</p>
							<motion.button
								onClick={() => onOpenMap(hotel)}
								className='inline-flex items-center gap-2 px-6 py-2 rounded-full
                         bg-white/20 backdrop-blur-sm hover:bg-white/30
                         text-white font-medium transition-all'
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								<FaMapMarkedAlt className='w-4 h-4' />
								Ver en mapa
							</motion.button>
						</div>
					</div>

					{/* Badge de ubicación */}
					<div className='absolute top-4 left-4'>
						<span
							className='inline-flex items-center gap-2 px-3 py-1.5 
                         rounded-full text-white text-sm font-medium
                         bg-black/30 backdrop-blur-sm'
						>
							<FaLocationDot className='w-4 h-4' />
							{hotel.location}
						</span>
					</div>

					{/* Badge premium */}
					<div className='absolute top-4 right-4'>
						<motion.span
							whileHover={{ scale: 1.05 }}
							className='inline-flex items-center gap-2 px-3 py-1.5 
                       rounded-full text-white text-sm font-medium
                       bg-gradient-to-r from-amber-500 to-orange-500'
						>
							<FaStar className='w-4 h-4' />
							Premium
						</motion.span>
					</div>
				</div>

				{/* Contenido inferior */}
				<div className='p-6'>
					<h3
						className={`text-xl font-bold mb-2 
            ${colorMode === 'dark' ? 'text-white' : 'text-gray-900'}`}
					>
						{hotel.title}
					</h3>
				</div>
			</div>
		</motion.div>
	);
};

HotelCard.propTypes = {
	hotel: PropTypes.shape({
		id: PropTypes.number.isRequired,
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		location: PropTypes.string.isRequired,
		image: PropTypes.string.isRequired,
		mapUrl: PropTypes.string.isRequired,
		iframe: PropTypes.string.isRequired,
	}).isRequired,
	onOpenMap: PropTypes.func.isRequired,
};

export default HotelCard;
