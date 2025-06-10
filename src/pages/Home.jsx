import React, { memo } from 'react';
import { useTheme } from '../context/ThemeContext';
import HomeCard from '../components/Home/HomeCard';
import { places } from '../data/home';
import { useNavigate } from 'react-router-dom';

const Home = () => {
	const { isDark } = useTheme();
	const navigate = useNavigate();

	return (
		<main className='min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300'>
			{/* Sección de héroe */}
			<section className='relative h-screen flex items-center justify-center text-center'>
				<div className='absolute inset-0'>
					<img
						src='/hero-catamarca.webp'
						alt='Paisaje de Catamarca'
						className='h-full w-full object-cover filter brightness-50'
					/>
				</div>
				<div className='relative z-10 px-4'>
					<h1 className='text-5xl md:text-6xl font-bold text-white'>
						Descubre Catamarca
					</h1>
					<p className='mt-4 text-lg md:text-xl text-gray-200'>
						Explora la magia de nuestra tierra, donde las montañas se elevan y
						la historia cobra vida.
					</p>
				</div>
			</section>

			{/* Sección de Destinos */}
			<section className='py-16 px-4'>
				<div className='max-w-7xl mx-auto text-center'>
					<h2 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2'>
						Destinos Destacados
					</h2>
					<p className='text-lg text-gray-600 dark:text-gray-300 mb-12'>
						Lugares fascinantes para explorar en nuestra provincia
					</p>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{places.map((place) => (
							<HomeCard
								key={place.name}
								image={place.image}
								title={place.name}
								description={place.description}
								onClick={() => navigate(place.path)}
							/>
						))}
					</div>
				</div>
			</section>
		</main>
	);
};

export default memo(Home);
