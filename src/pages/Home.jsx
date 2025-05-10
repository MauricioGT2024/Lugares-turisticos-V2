import { memo } from 'react';
import { motion } from 'framer-motion';
import { useColorMode } from '@chakra-ui/react';
import { places } from '../data/home';
import DestinationCard from '../components/Home/DestinationCard';

const useTheme = (colorMode) => ({
	bg: colorMode === 'dark' ? 'bg-gray-900' : 'bg-white',
	text: {
		primary: colorMode === 'dark' ? 'text-white' : 'text-gray-900',
		secondary: colorMode === 'dark' ? 'text-gray-400' : 'text-gray-600',
	},
	overlay: colorMode === 'dark'
		? 'bg-gradient-to-b from-black/80 to-black/30'
		: 'bg-gradient-to-b from-white/90 to-white/30',
	card: colorMode === 'dark' ? 'bg-gray-800' : 'bg-white',
});

const Home = () => {
	const { colorMode } = useColorMode();
	const theme = useTheme(colorMode);

	return (
		<div className={`min-h-screen w-full flex flex-col ${theme.bg} transition-colors duration-300`}>
			{/* Hero Section */}
			<section className="relative flex items-center justify-center h-[45vh] md:h-[60vh] overflow-hidden">
				<img
					src="/hero-catamarca.webp"
					alt="Paisaje Catamarca"
					className="absolute inset-0 w-full h-full object-cover object-center"
					style={{ zIndex: 1 }}
				/>
				<div
					className={`absolute inset-0 ${theme.overlay}`}
					style={{ zIndex: 2 }}
				/>
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.9 }}
					className="relative z-10 flex flex-col items-center text-center px-4"
					style={{ zIndex: 3 }}
				>
					<h1 className={`text-4xl md:text-6xl font-extrabold mb-4 tracking-tight drop-shadow-lg ${theme.text.primary}`}>
						Descubre Catamarca
					</h1>
					<p className={`text-lg md:text-2xl max-w-2xl font-light ${theme.text.secondary}`}>
						Explora la magia de nuestra tierra, donde las montañas tocan el cielo y la historia cobra vida.
					</p>
				</motion.div>
			</section>

			{/* Destinos Destacados */}
			<section className="flex-1 w-full max-w-7xl mx-auto py-12 px-4 md:px-8">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.7 }}
					className="text-center mb-14"
				>
					<h2 className={`text-2xl md:text-4xl font-semibold mb-3 ${theme.text.primary}`}>
						Destinos Destacados
					</h2>
					<p className={`text-base md:text-lg ${theme.text.secondary}`}>
						Explora los lugares más fascinantes de Catamarca
					</p>
				</motion.div>
				<div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
					{places.map((place, idx) => (
						<motion.div
							key={place.path}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: idx * 0.1 }}
							className="flex"
						>
							<DestinationCard place={place} className={theme.card} />
						</motion.div>
					))}
				</div>
			</section>
		</div>
	);
};

Home.displayName = 'Home';
export default memo(Home);
