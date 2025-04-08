import { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { places } from '../data/home';
import { useColorMode } from '@chakra-ui/react';
import { FaMapMarkedAlt, FaArrowRight } from 'react-icons/fa';
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

	return (
		<main
			className={`min-h-screen ${
				colorMode === 'light'
					? 'bg-gradient-to-b from-gray-50 to-white'
					: 'bg-gradient-to-b from-gray-900 to-gray-800'
			}`}
		>
			{/* Hero Section */}
			<section className='relative h-screen flex items-center justify-center overflow-hidden'>
				<div className='relative z-10 text-center px-4'>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className='space-y-6'
					>
						<h1 className='text-5xl md:text-7xl font-bold text-white'>
							Catamarca
							<span className='block text-2xl md:text-3xl mt-2 text-gray-200'>
								Tierra de Contrastes
							</span>
						</h1>
						<p className='text-xl text-gray-200 max-w-2xl mx-auto'>
							Descubre paisajes impresionantes, cultura milenaria y experiencias
							únicas en el corazón del noroeste argentino.
						</p>
						<Link
							to='/provincia'
							className='inline-flex items-center space-x-3 bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-full hover:bg-white/30 transition-all duration-300 group'
						>
							<span>Comenzar Aventura</span>
							<FaMapMarkedAlt className='w-5 h-5 transform group-hover:rotate-12 transition-transform' />
						</Link>
					</motion.div>
				</div>

				<motion.div
					animate={{ y: [0, -10, 0] }}
					transition={{ duration: 2, repeat: Infinity }}
					className='absolute bottom-8 left-1/2 -translate-x-1/2'
				>
					<div className='w-6 h-10 border-2 border-white/50 rounded-full flex justify-center'>
						<div className='w-1 h-2 bg-white/50 rounded-full mt-2 animate-bounce' />
					</div>
				</motion.div>
			</section>

			{/* Destinations Section */}
			<section className='py-20 px-4'>
				<div className='max-w-7xl mx-auto'>
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						className='text-center mb-16'
					>
						<h2
							className={`text-4xl font-bold mb-4 ${
								colorMode === 'light' ? 'text-gray-800' : 'text-white'
							}`}
						>
							Destinos Destacados
						</h2>
						<p
							className={`text-xl ${
								colorMode === 'light' ? 'text-gray-600' : 'text-gray-300'
							}`}
						>
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
		</main>
	);
};
Home.displayName = 'Home';
export default memo(Home);
