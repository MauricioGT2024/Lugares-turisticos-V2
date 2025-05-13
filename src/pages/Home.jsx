import { memo } from 'react';
import { motion } from 'framer-motion';
import { useColorMode } from '@chakra-ui/react';
import DestinationCard from '@/components/Home/DestinationCard';
/// Chakra UI
// Nuevo array de destinos con subtítulo y más info
const destinations = [
  {
	title: 'Valle Viejo',
	subtitle: 'Historia y Tradición',
	image: '/img/Valle-Chico/Capital.webp',
	description: 'Un rincón de Catamarca donde la historia y la cultura se funden con paisajes únicos. Ideal para quienes buscan tradición y naturaleza.',
	to: '/catamarca',
  },
  {
	title: 'Américan Catamarca Park Hotel',
	subtitle: 'Hospedaje Premium',
	image: '/img/Hospedaje/Américan Catamarca Park Hotel.webp',
	description: 'Hotel de lujo en el corazón de Catamarca. Habitaciones elegantes, restaurante gourmet y piscina panorámica.',
	to: '/hospedaje',
  },
  {
	title: 'Quebrada Las Angosturas',
	subtitle: 'Aventura Natural',
	image: '/img/Tinogasta/Quebrada Las Angosturas.webp',
	description: 'Un cañón impresionante con formaciones rocosas y paisajes desérticos. Perfecto para los amantes de la aventura.',
	to: '/tinogasta',
  },
];

const Home = () => {
	const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  return (
	<div className={`min-h-screen w-full flex flex-col transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
	  {/* Switch modo oscuro */}
	  {/* Botón flotante de modo oscuro en la esquina inferior derecha */}
	  

	  {/* Hero Section */}
	  <section className="relative flex items-center justify-center h-[50vh] md:h-[65vh] overflow-hidden">
		<img
		  src="/hero-catamarca.webp"
		  alt="Paisaje Catamarca"
		  className="absolute inset-0 w-full h-full object-cover object-center scale-105 blur-[2px] brightness-90"
		  style={{ zIndex: 1 }}
		/>
		<div
		  className="absolute inset-0 bg-gradient-to-br from-black/80 via-amber-900/30 to-amber-200/10 animate-pulse-slow"
		  style={{ zIndex: 2 }}
		/>
		<motion.div
		  initial={{ opacity: 0, y: 40 }}
		  animate={{ opacity: 1, y: 0 }}
		  transition={{ duration: 1 }}
		  className="relative z-10 flex flex-col items-center text-center px-4"
		  style={{ zIndex: 3 }}
		>
		  <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight bg-gradient-to-r from-amber-400 via-orange-500 to-amber-700 bg-clip-text text-transparent drop-shadow-xl">
			Catamarca, tierra de maravillas
		  </h1>
		  <p className="text-lg md:text-2xl max-w-2xl font-light text-white/90 drop-shadow">
			Descubre paisajes, cultura y aventura en el corazón del NOA argentino.
		  </p>
		</motion.div>
	  </section>

	  {/* Destinos Destacados */}
	  <section className="flex-1 w-full max-w-7xl mx-auto py-16 px-4 md:px-8">
		<motion.div
		  initial={{ opacity: 0, y: 30 }}
		  whileInView={{ opacity: 1, y: 0 }}
		  viewport={{ once: true }}
		  transition={{ duration: 0.7 }}
		  className="text-center mb-16"
		>
		  <h2 className="text-3xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-amber-500 via-orange-400 to-amber-700 bg-clip-text text-transparent drop-shadow-lg">
			Destinos Destacados
		  </h2>
		  <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
			Explora los lugares más fascinantes de Catamarca
		  </p>
		</motion.div>
		<div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
		  {destinations.map((dest, idx) => (
			<motion.div
			  key={dest.to}
			  initial={{ opacity: 0, y: 30 }}
			  whileInView={{ opacity: 1, y: 0 }}
			  viewport={{ once: true }}
			  transition={{ duration: 0.5, delay: idx * 0.1 }}
			  className="flex"
			>
			  <DestinationCard
				image={dest.image}
				title={dest.title}
				subtitle={dest.subtitle}
				description={dest.description}
				to={dest.to}
			  />
			</motion.div>
		  ))}
		</div>
	  </section>
	</div>
  );
};

Home.displayName = 'Home';
export default memo(Home);
