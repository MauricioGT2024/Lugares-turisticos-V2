import { memo, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useColorModeValue } from '@chakra-ui/react';
import { departamentos } from '@/data/departamentos';
import PropTypes from 'prop-types'


const gradientConfigs = {
	'Antofagasta de la Sierra': {
		gradient: 'from-amber-400 via-orange-400 to-rose-500',
	},
	Fiambalá: {
		gradient: 'from-rose-400 via-pink-400 to-red-500',
	},
	Tinogasta: {
		gradient: 'from-violet-400 via-purple-400 to-fuchsia-500',
	},
	default: {
		gradient: 'from-sky-400 via-blue-400 to-indigo-500',
	},
};

// Componente Card (tipo Image Hover Card)
const DepartamentoCard = memo(({ loc }) => {
	const { name, description, image, path } = loc;
	const [isHovered, setIsHovered] = useState(false);
	const bgCard = useColorModeValue('bg-white', 'bg-gray-800');
	const config = useMemo(
		() => gradientConfigs[name] || gradientConfigs.default,
		[name]
	);

	return (
		<motion.div
			className={`rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all ${bgCard}`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			whileHover={{ scale: 1.02 }}
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.5, ease: 'easeOut' }}
		>
			<Link to={path} aria-label={`Explorar ${name}`}>
				<div className='relative h-60 w-full overflow-hidden'>
					<motion.img
						src={image}
						alt={`Imagen de ${name}`}
						className='w-full h-full object-cover object-center transition-transform duration-500'
						animate={{ scale: isHovered ? 1.1 : 1 }}
					/>
					<div
						className={`absolute inset-0 bg-gradient-to-t ${config.gradient} opacity-60`}
					/>
					<motion.div
						className='absolute inset-0 flex flex-col justify-end p-6 text-white'
						animate={{ opacity: isHovered ? 1 : 0.9 }}
					>
						<h3 className='text-xl font-bold mb-1'>{name}</h3>
						<p className='text-sm text-white/90'>{description}</p>
					</motion.div>
				</div>
			</Link>
		</motion.div>
	);
});

DepartamentoCard.propTypes = {
	loc: PropTypes.shape({
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		image: PropTypes.string.isRequired,
		path: PropTypes.string.isRequired,
	}).isRequired,
};

DepartamentoCard.displayName = 'DepartamentoCard';

const Provincia = memo(() => {
	const bgColor = useColorModeValue('bg-gray-50', 'bg-gray-900');
	const textColor = useColorModeValue('text-gray-700', 'text-gray-300');

	return (
		<div className={`min-h-screen py-12 px-4 ${bgColor}`}>
			<div className='max-w-7xl mx-auto'>
				<motion.div
					initial={{ opacity: 0, y: -40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className='text-center mb-16'
				>
					<span className='inline-block px-4 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r from-purple-400 to-pink-500'>
						Descubre Catamarca
					</span>
					<h1 className='mt-4 text-4xl md:text-5xl font-bold font-mono bg-gradient-to-r from-green-400 via-yellow-500 to-purple-500 bg-clip-text text-transparent'>
						Explora los Departamentos
					</h1>
					<p className={`mt-4 text-lg max-w-2xl mx-auto ${textColor}`}>
						Sumérgete en la diversidad geográfica, cultural y natural de cada
						rincón de la provincia.
					</p>
				</motion.div>

				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8'>
					<AnimatePresence mode='wait'>
						{departamentos.map((loc) => (
							<DepartamentoCard key={loc.id} loc={loc} />
						))}
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
});

Provincia.displayName = 'Provincia';

export default Provincia;
