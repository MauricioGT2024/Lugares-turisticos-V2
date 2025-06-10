import { motion } from 'framer-motion';

const Path = (props) => (
	<motion.path
		fill='transparent'
		strokeWidth='2'
		strokeLinecap='round'
		{...props}
	/>
);

const SidebarToggle = ({ isOpen, toggle }) => {
	const bgColor = isOpen ? 'bg-purple-600' : 'bg-gray-200';
	const stroke = isOpen ? 'white' : 'black';

	return (
		<motion.button
			onClick={toggle}
			aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
			className={`
        p-2 rounded-full ${bgColor}
        transition-all duration-200 ease-in-out
        focus:outline-none focus:ring-1 focus:ring-purple-400
        hover:bg-gray-100/10
      `}
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
		>
			<motion.svg
				width='22'
				height='22'
				viewBox='0 0 22 22'
				initial={false}
				animate={isOpen ? 'open' : 'closed'}
			>
				<Path
					stroke={stroke}
					variants={{
						closed: { d: 'M 2 6 L 20 6' },
						open: { d: 'M 3 3 L 19 19' },
					}}
				/>
				<Path
					stroke={stroke}
					variants={{
						closed: { d: 'M 2 11 L 20 11', opacity: 1 },
						open: { opacity: 0 },
					}}
					transition={{ duration: 0.1 }}
				/>
				<Path
					stroke={stroke}
					variants={{
						closed: { d: 'M 2 16 L 20 16' },
						open: { d: 'M 3 19 L 19 3' },
					}}
				/>
			</motion.svg>
		</motion.button>
	);
};

export default SidebarToggle;
