import { motion } from 'framer-motion';
import { FaFilter } from 'react-icons/fa';
import PropTypes from 'prop-types';

const FloatingButton = ({ onClick }) => {
	return (
		<motion.button
			onClick={onClick}
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.9 }}
			className='p-4 rounded-full shadow-lg bg-teal-500 hover:bg-teal-600 text-white transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-400'
			aria-label='Abrir filtros'
		>
			<FaFilter className='text-xl' />
		</motion.button>
	);
};

FloatingButton.propTypes = {
	onClick: PropTypes.func.isRequired,
};

export default FloatingButton;
