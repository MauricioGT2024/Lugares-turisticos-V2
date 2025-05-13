import { motion } from 'framer-motion';
import { useColorMode } from '@chakra-ui/react';
import { FaFilter } from 'react-icons/fa';
import PropTypes from 'prop-types';
const FloatingButton = ({ onClick }) => {
	const { colorMode } = useColorMode();

	return (
		<motion.button
			className={`p-4 rounded-full shadow-lg
        ${
					colorMode === 'dark'
						? 'bg-teal-600 hover:bg-teal-500'
						: 'bg-teal-500 hover:bg-teal-400'
				}
        text-white transition-colors duration-200`}
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.9 }}
			onClick={onClick}
		>
			<FaFilter className='text-xl' />
		</motion.button>
	);
};

FloatingButton.propTypes = {
	onClick: PropTypes.func.isRequired,
};

export default FloatingButton;
