import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useColorMode } from '@chakra-ui/react';
import { FaChevronDown } from 'react-icons/fa';
import DestinationCard from '../components/Home/DestinationCard';
import { places } from '../data/home';

// Hook para definir el tema y los colores según el modo (oscuro/claro)
const useTheme = (mode) => ({
	bg: mode === 'dark' ? 'bg-gray-900' : 'bg-gray-50',
	overlay: mode === 'dark' ? 'bg-gray-900/60' : 'bg-gray-50/60',
	text: {
		primary: mode === 'dark' ? 'text-white' : 'text-gray-900',
		secondary: mode === 'dark' ? 'text-gray-300' : 'text-gray-600',
	},
});

const Home = () => {
	const { colorMode } = useColorMode();
	const theme = useTheme(colorMode);

	return (
		<main className={`min-h-screen ${theme.bg} transition-colors duration-300`}>
			{/* Sección de héroe */}
			<section className='relative h-screen'>
				{/* Imagen fija que cubre todo el viewport */}
				<img
					src='/hero-catamarca.webp'
					alt='Paisaje de Catamarca'
					className='fixed top-0 left-0 z-0 h-screen w-screen object-cover brightness-50'
				/>
				{/* Overlay con degradado para mejorar el contraste */}
				
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					className='relative z-20 flex flex-col items-center justify-center px-4 text-center h-screen'
				>
					<h1
						className={`mb-6 text-4xl font-extrabold drop-shadow-2xl md:text-6xl ${theme.text.primary}`}
					>
						Descubre Catamarca
					</h1>
					<p
						className={`max-w-2xl text-lg drop-shadow-md md:text-xl ${theme.text.secondary}`}
					>
						Explora la magia de nuestra tierra, donde las montañas se elevan y
						la historia cobra vida.
					</p>
					<motion.div
						className='absolute bottom-10 flex flex-col items-center'
						animate={{ y: [0, 15, 0] }}
						transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
					>
						<span className={`mb-2 text-sm ${theme.text.secondary}`}>
							Desplázate para descubrir más
						</span>
						<FaChevronDown className={`w-6 h-6 ${theme.text.secondary}`} />
					</motion.div>
				</motion.div>
			</section>

			{/* Sección de Destinos */}
			<section className='py-20 px-4'>
				<div className='max-w-7xl mx-auto'>
					<motion.div
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						className='mb-16 text-center'
					>
						<h2
							className={`mb-4 text-4xl font-bold drop-shadow-md ${theme.text.primary}`}
						>
							Destinos Destacados
						</h2>
						<p className={`text-xl drop-shadow-sm ${theme.text.secondary}`}>
							Los lugares más fascinantes para explorar en Catamarca
						</p>
					</motion.div>

					<motion.div
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true }}
						className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'
					>
						{places.map((place) => (
							<DestinationCard key={place.path} place={place} />
						))}
					</motion.div>
				</div>
			</section>
		</main>
	);
};

Home.displayName = 'Home';

export default memo(Home);
