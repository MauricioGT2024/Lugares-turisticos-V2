import { memo } from 'react';
import { motion } from 'framer-motion';
import { useColorMode } from '@chakra-ui/react';
import { places } from '../data/home';
import DestinationCard from '../components/Home/DestinationCard';

const useTheme = (colorMode) => ({
	bg: colorMode === 'dark' ? 'bg-gray-900' : 'bg-gray-50',
	text: {
		primary: colorMode === 'dark' ? 'text-white' : 'text-gray-900',
		secondary: colorMode === 'dark' ? 'text-gray-400' : 'text-gray-600',
	},
	card: colorMode === 'dark' ? 'bg-gray-800' : 'bg-white',
	border: colorMode === 'dark' ? 'border-gray-700' : 'border-gray-200',
	shadow:
		colorMode === 'dark' ? 'shadow-[0_0_15px_rgba(0,0,0,0.3)]' : 'shadow-lg',
});

const Home = () => {
	const { colorMode } = useColorMode();
	const theme = useTheme(colorMode);

	return (
		<div className={`min-h-screen ${theme.bg} transition-colors duration-300`}>
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
