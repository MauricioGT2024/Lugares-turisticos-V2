import { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { places } from '../data/home';
import { useColorMode } from '@chakra-ui/react';
import { FaArrowRight } from 'react-icons/fa';
import PropTypes from 'prop-types';

const DestinationCard = memo(({ place }) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			whileHover={{ y: -10 }}
			transition={{ duration: 0.5 }}
			className='group relative overflow-hidden rounded-2xl'
			onHoverStart={() => setIsHovered(true)}
			onHoverEnd={() => setIsHovered(false)}
		>
			<div className='aspect-[4/5] overflow-hidden'>
				<motion.img
					src={place.image}
					alt={place.name}
					animate={{ scale: isHovered ? 1.1 : 1 }}
					transition={{ duration: 0.4 }}
					className='h-full w-full object-cover'
					loading='lazy'
				/>
				<div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent' />
			</div>

			<div className='absolute bottom-0 p-6 w-full'>
				<h3 className='text-2xl font-bold text-white mb-2'>{place.name}</h3>
				<p className='text-gray-200 line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300'>
					{place.description}
				</p>
				<Link
					to={place.path}
					className='inline-flex items-center space-x-2 text-white bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-white/30'
				>
					<span>Explorar</span>
					<FaArrowRight className='w-4 h-4' />
				</Link>
			</div>
		</motion.div>
	);
});
DestinationCard.propTypes = {
	place: PropTypes.shape({
		image: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		path: PropTypes.string.isRequired,
	}).isRequired,
};

DestinationCard.displayName = 'DestinationCard';

const Home = () => {
	const { colorMode } = useColorMode();

	// Definir tema dinámico
	const theme = {
		bg: colorMode === 'dark' ? 'bg-gray-900' : 'bg-gray-50',
		text: {
			primary: colorMode === 'dark' ? 'text-white' : 'text-gray-900',
			secondary: colorMode === 'dark' ? 'text-gray-400' : 'text-gray-600',
			accent: colorMode === 'dark' ? 'text-teal-400' : 'text-teal-600',
		},
		card: colorMode === 'dark' ? 'bg-gray-800' : 'bg-white',
		border: colorMode === 'dark' ? 'border-gray-700' : 'border-gray-200',
		shadow:
			colorMode === 'dark' ? 'shadow-[0_0_15px_rgba(0,0,0,0.3)]' : 'shadow-lg',
	};

	return (
		<div className={`min-h-screen ${theme.bg} transition-colors duration-300`}>
			{/* Hero Section */}
			<section className='relative h-screen'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className='relative z-10 h-full flex flex-col justify-center items-center text-center px-4'
				>
					<h1 className='text-4xl md:text-6xl font-bold text-white mb-6'>
						Descubre Catamarca
					</h1>
					<p className='text-lg md:text-xl text-gray-200 max-w-2xl'>
						Explora la magia de nuestra tierra, donde las montañas tocan el
						cielo y la historia cobra vida.
					</p>
				</motion.div>
			</section>

			{/* Destinations Section */}
			<section className={`py-20 px-4 ${theme.bg}`}>
				<div className='max-w-7xl mx-auto'>
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						className='text-center mb-16'
					>
						<h2 className={`text-4xl font-bold mb-4 ${theme.text.primary}`}>
							Destinos Destacados
						</h2>
						<p className={`text-xl ${theme.text.secondary}`}>
							Explora los lugares más fascinantes de Catamarca
						</p>
					</motion.div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{places.map((place) => (
							<DestinationCard key={place.path} place={place} />
						))}
					</div>
				</div>
			</section>
		</div>
	);
};
Home.displayName = 'Home';
export default memo(Home);
