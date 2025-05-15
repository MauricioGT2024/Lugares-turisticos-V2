import { motion } from 'framer-motion';
import { useColorModeValue } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const Path = motion.path;

const Hamburger = ({ isOpen, toggle }) => {
	const strokeColor = useColorModeValue('#2D3748', '#EDF2F7'); // gray.700 / gray.100

	return (
		<motion.button
			onClick={toggle}
			aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
			initial={false}
			animate={isOpen ? 'open' : 'closed'}
			className='p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400'
		>
			<svg width='24' height='24' viewBox='0 0 24 24'>
				<Path
					stroke={strokeColor}
					strokeWidth='2.5'
					strokeLinecap='round'
					variants={{
						closed: { d: 'M 3 6 L 21 6' },
						open: { d: 'M 4 4 L 20 20' },
					}}
				/>
				<Path
					stroke={strokeColor}
					strokeWidth='2.5'
					strokeLinecap='round'
					variants={{
						closed: { opacity: 1, d: 'M 3 12 L 21 12' },
						open: { opacity: 0, d: 'M 12 12 L 12 12' },
					}}
					transition={{ duration: 0.1 }}
				/>
				<Path
					stroke={strokeColor}
					strokeWidth='2.5'
					strokeLinecap='round'
					variants={{
						closed: { d: 'M 3 18 L 21 18' },
						open: { d: 'M 4 20 L 20 4' },
					}}
				/>
			</svg>
		</motion.button>
	);
};

Hamburger.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	toggle: PropTypes.func.isRequired,
};

export default Hamburger;
