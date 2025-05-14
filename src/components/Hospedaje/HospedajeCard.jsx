import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { FaMapMarkerAlt, FaMap, FaHeart, FaRegHeart } from 'react-icons/fa';

const HospedajeCard = ({ hospedaje }) => {
	const [hovered, setHovered] = useState(false);
	const [liked, setLiked] = useState(false);

	return (
		<motion.div
			className='relative rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden group bg-white dark:bg-gray-900 w-full transition'
			initial={{ opacity: 0, y: 40 }}
			animate={{ opacity: 1, y: 0 }}
			whileHover={{ scale: 1.04 }}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			<div className='relative w-full h-56'>
				<img
					src={hospedaje.image}
					alt={hospedaje.alt}
					className='w-full h-full object-cover transition-transform group-hover:scale-98'
				/>
				<button
					className='absolute top-3 right-3 text-white z-20 text-xl'
					onClick={() => setLiked((prev) => !prev)}
				>
					{liked ? <FaHeart className='text-red-500' /> : <FaRegHeart />}
				</button>
				<AnimatePresence>
					{hovered && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className='absolute inset-0 flex flex-col justify-center items-center bg-black/80 text-center px-6 z-10'
						>
							<p className='text-white text-base mb-3'>
								{hospedaje.description}
							</p>
							<span className='text-teal-300 font-bold text-lg mb-2'>
								{hospedaje.precioARS}
							</span>
							<a
								href={hospedaje.mapUrl}
								target='_blank'
								rel='noopener noreferrer'
								className='inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-500 hover:bg-teal-600 text-white font-semibold shadow'
							>
								<FaMap /> Ver en Google Maps
							</a>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
			<div className='p-5'>
				<h3 className='text-xl font-bold mb-1 truncate text-gray-900 dark:text-white'>
					{hospedaje.title}
				</h3>
				<div className='flex items-center text-sm gap-2 text-gray-600 dark:text-gray-400'>
					<FaMapMarkerAlt className='text-teal-500' />
					<span className='truncate'>{hospedaje.location}</span>
				</div>
			</div>
		</motion.div>
	);
};

HospedajeCard.propTypes = {
  hospedaje: PropTypes.shape({
    image: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    precioARS: PropTypes.string.isRequired,
    mapUrl: PropTypes.string.isRequired,
  }).isRequired,
};


export default HospedajeCard;
