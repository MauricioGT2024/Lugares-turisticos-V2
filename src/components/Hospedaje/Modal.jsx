import PropTypes from 'prop-types';
import { IoClose } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ isOpen, onClose, location }) => {
	if (!isOpen || !location) return null;

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'
				onClick={onClose}
			>
				<motion.div
					initial={{ scale: 0.8, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					exit={{ scale: 0.8, opacity: 0 }}
					onClick={(e) => e.stopPropagation()}
					className='relative w-11/12 max-w-4xl p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl'
				>
					<button
						onClick={onClose}
						className='absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
					>
						<IoClose size={24} />
					</button>

					<div className='space-y-4'>
						<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
							{location.title}
						</h2>

						<p className='text-gray-600 dark:text-gray-300'>
							{location.description}
						</p>

						{location.iframe && (
							<div className='aspect-video w-full rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700'>
								<iframe
									src={location.iframe}
									width='100%'
									height='100%'
									style={{ border: 0 }}
									allowFullScreen=''
									loading='lazy'
									referrerPolicy='no-referrer-when-downgrade'
									title={`Mapa de ${location.title}`}
									className='w-full h-full'
								/>
							</div>
						)}

						<div className='flex justify-between items-center mt-4'>
							<span className='text-gray-600 dark:text-gray-300'>
								Ubicación: {location.location}
							</span>
							<a
								href={location.mapUrl}
								target='_blank'
								rel='noopener noreferrer'
								className='text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300'
							>
								Ver en Google Maps
							</a>
						</div>
					</div>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
};

Modal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	location: PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		location: PropTypes.string.isRequired,
		mapUrl: PropTypes.string.isRequired,
		iframe: PropTypes.string.isRequired,
	}).isRequired,
};

export default Modal;
