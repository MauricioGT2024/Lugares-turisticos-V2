import { Box, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const Path = (props) => (
	<motion.path
		fill='transparent'
		strokeWidth='3'
		strokeLinecap='round'
		strokeLinejoin='round'
		{...props}
	/>
);

const SidebarToggle = ({ isOpen, toggle }) => {
	const stroke = useColorModeValue('#1A202C', '#E2E8F0');

	return (
		<Box
			as='button'
			onClick={toggle}
			aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
			className='p-2 rounded-md bg-gray-800 hover:bg-gray-500 dark:bg-gray-800 shadow-md'
		>
			<motion.svg
				width='24'
				height='24'
				viewBox='0 0 24 24'
				initial={false}
				animate={isOpen ? 'open' : 'closed'}
			>
				<Path
					stroke={stroke}
					variants={{
						closed: { d: 'M 3 6 L 21 6' },
						open: { d: 'M 4 4 L 20 20' },
					}}
				/>
				<Path
					stroke={stroke}
					variants={{
						closed: { d: 'M 3 12 L 21 12', opacity: 1 },
						open: { d: 'M 12 12 L 12 12', opacity: 0 },
					}}
					transition={{ duration: 0.1 }}
				/>
				<Path
					stroke={stroke}
					variants={{
						closed: { d: 'M 3 18 L 21 18' },
						open: { d: 'M 4 20 L 20 4' },
					}}
				/>
			</motion.svg>
		</Box>
	);
};

export default SidebarToggle;
