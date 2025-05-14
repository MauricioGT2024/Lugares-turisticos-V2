import { memo } from 'react';
import { motion } from 'framer-motion';
import { useColorMode } from '@chakra-ui/react';
import DestinationCard from '@/components/Home/DestinationCard';

const destinations = [
	{
		title: 'Valle Viejo',
		subtitle: 'Historia y Tradición',
		image: '/img/Valle-Chico/Capital.webp',
		description:
			'Un rincón de Catamarca donde la historia y la cultura se funden con paisajes únicos. Ideal para quienes buscan tradición y naturaleza.',
		to: '/catamarca',
	},
	{
		title: 'Américan Catamarca Park Hotel',
		subtitle: 'Hospedaje Premium',
		image: '/img/Hospedaje/Américan Catamarca Park Hotel.webp',
		description:
			'Hotel de lujo en el corazón de Catamarca. Habitaciones elegantes, restaurante gourmet y piscina panorámica.',
		to: '/hospedaje',
	},
	{
		title: 'Quebrada Las Angosturas',
		subtitle: 'Aventura Natural',
		image: '/img/Tinogasta/Quebrada Las Angosturas.webp',
		description:
			'Un cañón impresionante con formaciones rocosas y paisajes desérticos. Perfecto para los amantes de la aventura.',
		to: '/tinogasta',
	},
];

const Home = () => {
	const { colorMode } = useColorMode();
	const isDark = colorMode === 'dark';

	return (
		<div
			className={`min-h-screen w-full transition-colors duration-300 ${
				isDark ? 'bg-gray-950' : 'bg-white'
			}`}
		>
			{/* Hero Section */}
			<section className='relative flex items-center justify-center h-[60vh] md:h-[70vh] overflow-hidden'>
				<img
					src='/hero-catamarca.webp'
					alt='Paisaje Catamarca'
					className='absolute inset-0 w-full h-full object-cover object-center scale-105 blur-sm brightness-80'
				/>
				<div className='absolute inset-0 bg-gradient-to-tr from-black/90 via-black/60 to-transparent z-10' />
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
					className='relative z-20 text-center px-6 max-w-4xl'
				>
					<h1 className='text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-xl leading-tight'>
						Catamarca, tierra de{' '}
						<span className='text-amber-400'>maravillas</span>
					</h1>
					<p className='mt-4 text-lg md:text-xl font-light text-white/90'>
						Descubre paisajes, cultura y aventura en el corazón del NOA
						argentino.
					</p>
				</motion.div>
			</section>

			{/* Destinos Destacados */}
			<section className='w-full max-w-7xl mx-auto py-20 px-4 md:px-8'>
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className='text-center mb-14'
				>
					<h2 className='text-3xl md:text-5xl font-bold bg-gradient-to-r from-amber-500 via-orange-400 to-amber-700 bg-clip-text text-transparent drop-shadow-lg'>
						Destinos Destacados
					</h2>
					<p className='mt-2 text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto'>
						Explora los lugares más fascinantes de Catamarca
					</p>
				</motion.div>

				<div className='grid gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
					{destinations.map((dest, idx) => (
						<motion.div
							key={dest.to}
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: idx * 0.1 }}
							className='flex'
						>
							<DestinationCard {...dest} />
						</motion.div>
					))}
				</div>
			</section>
		</div>
	);
};

Home.displayName = 'Home';
export default memo(Home);
