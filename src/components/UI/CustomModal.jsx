import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { useTheme } from '../context/ThemeContext';

const CustomModal = ({
	isOpen,
	onClose,
	title,
	children,
	headerGradient,
	footer,
	size = 'xl',
}) => {
	const { colorMode } = useTheme();

	if (!isOpen) return null;

	return (
		<AnimatePresence>
			<div className='fixed inset-0 z-50 flex items-center justify-center'>
				<motion.div
					className='fixed inset-0 bg-black/70 backdrop-blur-sm'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={onClose}
				/>

				<motion.div
					className={`relative w-full ${
						size === 'xl' ? 'max-w-4xl' : 'max-w-2xl'
					} ${
						colorMode === 'dark' ? 'bg-gray-800' : 'bg-white'
					} rounded-xl shadow-xl`}
					initial={{ scale: 0.9, opacity: 0, y: 20 }}
					animate={{ scale: 1, opacity: 1, y: 0 }}
					exit={{ scale: 0.9, opacity: 0, y: 20 }}
					transition={{ type: 'spring', duration: 0.5, bounce: 0.3 }}
				>
					<div
						className={`flex items-center justify-between p-4 rounded-t-xl ${headerGradient.replace(
							'linear',
							'bg-gradient-to-r'
						)} text-white`}
					>
						<h2 className='text-xl font-semibold'>{title}</h2>
						<button
							onClick={onClose}
							className='p-2 hover:bg-white/30 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white/50'
						>
							<svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
								<path d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' />
							</svg>
						</button>
					</div>

					<div className='p-6'>{children}</div>

					{footer && (
						<div className='p-4 border-t border-gray-200 dark:border-gray-700 rounded-b-xl'>
							{footer}
						</div>
					)}
				</motion.div>
			</div>
		</AnimatePresence>
	);
};

CustomModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	headerGradient: PropTypes.string,
	footer: PropTypes.node,
	size: PropTypes.string,
};

export default CustomModal;
