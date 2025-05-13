import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
	FaHome,
	FaMapMarkedAlt,
	FaBed,
	FaInfoCircle,
	FaBars,
	FaTimes,
} from 'react-icons/fa';
import { useColorMode } from '@chakra-ui/react';
import NavLink from '@/components/common/NavLink';

const navItems = [
	{ path: '/', label: 'Inicio', icon: FaHome },
	{ path: '/provincia', label: 'Departamentos', icon: FaMapMarkedAlt },
	{ path: '/hospedaje', label: 'Hospedaje', icon: FaBed },
	{ path: '/about', label: 'Sobre Nosotros', icon: FaInfoCircle },
];

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const { colorMode } = useColorMode();
	const toggleSidebar = useCallback(() => setIsOpen((v) => !v), []);

	return (
		<>
			{/* Hamburger Button */}
			<button
				onClick={toggleSidebar}
				className={`fixed top-4 left-4 z-[100] p-2 rounded-md shadow-md bg-white/80 dark:bg-gray-800/80
          ${isOpen ? 'pointer-events-none opacity-0' : ''}
          transition-all`}
				aria-label='Abrir menú lateral'
			>
				<FaBars className='h-7 w-7 text-teal-600 dark:text-teal-300' />
			</button>

			{/* Sidebar Overlay */}
			<AnimatePresence>
				{isOpen && (
					<>
						{/* Overlay */}
						<motion.div
							key='overlay'
							initial={{ opacity: 0 }}
							animate={{ opacity: 0.5 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3 }}
							className='fixed inset-0 z-40'
							style={{
								backgroundColor:
									colorMode === 'dark' ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.4)',
							}}
							onClick={toggleSidebar}
							aria-label='Cerrar menú lateral'
						/>
						{/* Sidebar */}
						<motion.aside
							key='sidebar'
							initial={{ x: -320 }}
							animate={{ x: 0 }}
							exit={{ x: -320 }}
							transition={{ type: 'spring', stiffness: 300, damping: 30 }}
							className='fixed top-0 left-0 h-full w-72 max-w-[90vw] z-50 flex flex-col'
							aria-label='Menú lateral'
							style={{
								backgroundColor: colorMode === 'dark' ? '#1a202c' : '#f7fafc',
							}}
						>
							<div className='flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-700'>
								<Link
									to='/'
									onClick={toggleSidebar}
									className='flex items-center gap-2'
								>
									<img
										src='/navbar.webp'
										alt='Logo Lugares Turísticos Catamarca'
										className='h-10 w-auto rounded shadow'
										draggable={false}
									/>
								</Link>
								<button
									onClick={toggleSidebar}
									className='p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition'
									aria-label='Cerrar menú lateral'
								>
									<FaTimes className='h-6 w-6 text-gray-700 dark:text-gray-200' />
								</button>
							</div>
							<nav className='flex-1 flex flex-col gap-1 px-2 py-6'>
								{navItems.map((item) => (
									<NavLink
										key={item.label}
										to={item.path}
										label={item.label}
										icon={item.icon}
										onClick={toggleSidebar}
										sidebar
									/>
								))}
							</nav>
							
						</motion.aside>
					</>
				)}
			</AnimatePresence>
		</>
	);
}
