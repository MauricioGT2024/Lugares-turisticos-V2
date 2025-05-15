import { memo } from 'react';
import { motion } from 'framer-motion';
import {
	useColorMode,
	Box,
	Text,
	Heading,
	Flex,
} from '@chakra-ui/react'; // Chakra solo para UI base

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


	// Estado para controlar el modal

	// Función para abrir el modal

	// Función para cerrar el modal

	return (
		<Box
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
					<Heading
						as='h1'
						size='2xl'
						fontWeight='extrabold'
						textColor='white'
						textShadow='2px 2px 5px black'
					>
						Catamarca, tierra de{' '}
						<span className='text-amber-400'>maravillas</span>
					</Heading>
					<Text mt={4} fontSize='xl' color='whiteAlpha.900'>
						Descubre paisajes, cultura y aventura en el corazón del NOA
						argentino.
					</Text>
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
					<Heading
						as='h2'
						size='xl'
						fontWeight='bold'
						bgGradient='linear(to-r, amber.500, orange.400, amber.700)'
						bgClip='text'
						textShadow='2px 2px 5px rgba(0, 0, 0, 0.3)'
						color={isDark}
					>
						Destinos Destacados
					</Heading>
					<Text mt={2} fontSize='lg' color='gray.600'>
						Explora los lugares más fascinantes de Catamarca
					</Text>
				</motion.div>

				<Flex wrap='wrap' justify='center' gap={12}>
					{destinations.map((dest, idx) => (
						<motion.div
							key={dest.to}
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: idx * 0.1 }}
						>
							<DestinationCard {...dest} />
						</motion.div>
					))}
				</Flex>
			</section>
		</Box>
	);
};

Home.displayName = 'Home';
export default memo(Home);
