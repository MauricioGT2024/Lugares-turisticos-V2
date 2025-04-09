import { useState, useEffect } from 'react';
import { useColorMode } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { hospedajes } from '../data/hospedajes';
import HospedajeHeader from '../components/Hospedaje/HospedajeHeader';
import { FaFilter, FaMapMarkedAlt, FaStar, FaHotel } from 'react-icons/fa';
import Proptypes from 'prop-types';

const Hospedaje = () => {
	const [selectedLocation, setSelectedLocation] = useState('all');
	const [showFilters, setShowFilters] = useState(false);
	const { colorMode } = useColorMode();

	const locations = ['all', ...new Set(hospedajes.map((h) => h.location))];
	const filteredHospedajes =
		selectedLocation === 'all'
			? hospedajes
			: hospedajes.filter((h) => h.location === selectedLocation);

	useEffect(() => {
		setShowFilters(window.innerWidth >= 768);
		const handleResize = () => setShowFilters(window.innerWidth >= 768);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	// Definimos colores del tema
	const theme = {
		bg: colorMode === 'dark' ? 'bg-gray-900' : 'bg-gray-50',
		card: colorMode === 'dark' ? 'bg-gray-800' : 'bg-white',
		text: {
			primary: colorMode === 'dark' ? 'text-white' : 'text-gray-900',
			secondary: colorMode === 'dark' ? 'text-gray-400' : 'text-gray-600',
			accent: colorMode === 'dark' ? 'text-teal-400' : 'text-teal-600',
		},
		button: {
			primary:
				colorMode === 'dark'
					? 'bg-teal-600 hover:bg-teal-500'
					: 'bg-teal-500 hover:bg-teal-400',
			secondary:
				colorMode === 'dark'
					? 'bg-gray-800 hover:bg-gray-700'
					: 'bg-white hover:bg-gray-50',
		},
	};

	// Componente de tarjeta de hospedaje

	const HospedajeCard = ({ hospedaje }) => (
		<motion.div
			layout
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			className={`group relative rounded-2xl overflow-hidden flex flex-col ${theme.card} shadow-lg hover:shadow-2xl transition-all duration-300`}
		>
			{/* Contenedor de imagen */}
			<div className='relative w-full h-72 overflow-hidden'>
				<img
					src={hospedaje.image}
					alt={hospedaje.title}
					className='object-cover w-full h-full transition-transform duration-300 group-hover:scale-110'
				/>
				<div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent' />

				{/* Badge Premium */}
				<div className='absolute top-4 right-4'>
					<span
						className={`inline-flex items-center rounded-full px-3 py-1 text-sm ${theme.card} backdrop-blur-sm`}
					>
						<FaStar className='w-4 h-4 text-yellow-400 mr-1' />
						<span className={theme.text.primary}>Premium</span>
					</span>
				</div>
			</div>

			{/* Contenido en el pie */}
			<div className='p-6 mt-auto'>
				<div className='space-y-4'>
					{/* Ubicación */}
					<span
						className={`inline-flex items-center gap-1 text-sm font-medium ${theme.text.accent}`}
					>
						<FaHotel className='w-4 h-4' />
						{hospedaje.location}
					</span>

					{/* Título */}
					<h3 className={`text-xl font-semibold ${theme.text.primary}`}>
						{hospedaje.title}
					</h3>

					{/* Descripción */}
					<p className={`text-sm ${theme.text.secondary}`}>
						{hospedaje.description}
					</p>

					{/* Botón */}
					<motion.a
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						href={hospedaje.mapUrl}
						target='_blank'
						rel='noopener noreferrer'
						className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl ${theme.button.primary} px-4 py-2.5 text-white transition-colors`}
					>
						<FaMapMarkedAlt className='w-4 h-4' />
						Ver Ubicación
					</motion.a>
				</div>
			</div>
		</motion.div>
	);

	HospedajeCard.propTypes = {
		hospedaje: Proptypes.shape({
			id: Proptypes.number.isRequired,
			title: Proptypes.string.isRequired,
			description: Proptypes.string.isRequired,
			location: Proptypes.string.isRequired,
			image: Proptypes.string.isRequired,
			mapUrl: Proptypes.string.isRequired,
		}).isRequired,
	};

	return (
		<div className={`min-h-screen ${theme.bg}`}>
			<HospedajeHeader />

			<main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				<div className='flex flex-col gap-8'>
					<div className='flex justify-between items-center'>
						<h2 className={`text-2xl font-bold ${theme.text.primary}`}>
							Hospedajes Disponibles
						</h2>
						<button
							onClick={() => setShowFilters(!showFilters)}
							className={`md:hidden inline-flex items-center gap-2 px-4 py-2 rounded-lg ${theme.button.secondary} shadow-sm`}
						>
							<FaFilter className='w-4 h-4' />
							Filtros
						</button>
					</div>

					<div className='flex flex-col md:flex-row gap-8'>
						<AnimatePresence>
							{showFilters && (
								<motion.aside
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: -20 }}
									className='md:w-64 flex-shrink-0'
								>
									<nav
										className={`sticky top-20 rounded-2xl p-6 ${theme.card} shadow-lg`}
									>
										<div className='space-y-4'>
											{locations.map((loc) => (
												<button
													key={loc}
													onClick={() => setSelectedLocation(loc)}
													className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
														selectedLocation === loc
															? theme.button.primary + ' text-white'
															: `${theme.text.secondary} hover:${theme.card}`
													}`}
												>
													{loc === 'all' ? 'Todas las ubicaciones' : loc}
												</button>
											))}
										</div>
									</nav>
								</motion.aside>
							)}
						</AnimatePresence>

						<div className='flex-1'>
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
								<AnimatePresence mode='popLayout'>
									{filteredHospedajes.map((hospedaje) => (
										<HospedajeCard key={hospedaje.id} hospedaje={hospedaje} />
									))}
								</AnimatePresence>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Hospedaje;
