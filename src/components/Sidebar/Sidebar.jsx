import { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useColorMode } from '@chakra-ui/react';
import { FaHome, FaMapMarkedAlt, FaBed, FaInfoCircle } from 'react-icons/fa';
import SidebarLink from './SidebarLink';
import SidebarToggle from './SidebarToggle';

const links = [
	{ label: 'Inicio', path: '/', icon: FaHome },
	{ label: 'Departamentos', path: '/provincia', icon: FaMapMarkedAlt },
	{ label: 'Hospedaje', path: '/hospedaje', icon: FaBed },
	{ label: 'Sobre Nosotros', path: '/about', icon: FaInfoCircle },
];

const Sidebar = () => {
	const [isOpen, setIsOpen] = useState(false); // sidebar expanded or collapsed on desktop
	const [isMobileOpen, setIsMobileOpen] = useState(false); // sidebar visible on mobile
	const { pathname } = useLocation();
	const { colorMode } = useColorMode();

	const toggleSidebar = useCallback(() => setIsOpen((v) => !v), []);
	const toggleMobileSidebar = useCallback(() => setIsMobileOpen((v) => !v), []);

	// Close mobile sidebar on route change
	useEffect(() => {
		setIsMobileOpen(false);
	}, [pathname]);

	const bgColor = colorMode === 'light' ? 'bg-white' : 'bg-gray-900';
	const textColor = colorMode === 'light' ? 'text-gray-800' : 'text-white';

	return (
		<>
			{/* Desktop sidebar */}
			<aside
				className={`
          fixed top-0 left-0 h-full bg-gray-800 text-white shadow-lg
          transition-all duration-300 ease-in-out z-40
          ${bgColor} ${textColor}
          transition-all duration-300
          ${isOpen ? 'w-[240px]': "w-[70px]"}
        `}
			>
				<div className='flex items-center justify-between p-4 border-b'>
					<img
						src='/navbar.png'
						alt='Logo'
						className={`h-10 transition-all duration-300 ${
							isOpen ? 'block' : 'hidden'
						}`}
					/>
					<SidebarToggle isOpen={isOpen} toggle={toggleSidebar} />
				</div>
				<nav className='flex flex-col gap-2 p-4 flex-1'>
					{links.map((item) => (
						<SidebarLink
							key={item.path}
							item={item}
							active={pathname === item.path}
							collapsed={!isOpen}
						/>
					))}
				</nav>
			</aside>

			{/* Mobile hamburger button */}
			<div className='lg:hidden fixed top-4 left-4 z-50'>
				<SidebarToggle isOpen={isMobileOpen} toggle={toggleMobileSidebar} />
			</div>

			{/* Mobile sidebar */}
			<AnimatePresence>
				{isMobileOpen && (
					<>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 0.5 }}
							exit={{ opacity: 0 }}
							className='fixed inset-0 bg-black z-40'
							onClick={toggleMobileSidebar}
						/>
						<motion.aside
							initial={{ x: '-100%' }}
							animate={{ x: 0 }}
							exit={{ x: '-100%' }}
							transition={{ type: 'spring', damping: 20 }}
							className={`${bgColor} ${textColor} fixed top-0 left-0 w-64 h-full shadow-lg z-50`}
						>
							<div className='flex items-center justify-between p-4 border-b'>
								<img src='/navbar.png' alt='Logo' className='h-10' />
								<SidebarToggle isOpen={true} toggle={toggleMobileSidebar} />
							</div>
							<nav className='flex flex-col gap-2 p-4'>
								{links.map((item) => (
									<SidebarLink
										key={item.path}
										item={item}
										active={pathname === item.path}
										collapsed={false}
										onClick={toggleMobileSidebar}
									/>
								))}
							</nav>
						</motion.aside>
					</>
				)}
			</AnimatePresence>

			{/* Push main content when desktop sidebar open */}
			<style>
				{`
          @media (min-width: 1024px) {
            main {
              transition: margin-left 0.3s ease;
              margin-left: ${isOpen ? '5em' /* 64 */ : '5rem' /* 20 */};
            }
          }
        `}
			</style>
		</>
	);
};

export default Sidebar;
