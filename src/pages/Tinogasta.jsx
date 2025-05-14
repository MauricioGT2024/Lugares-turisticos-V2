import { useState, useMemo } from 'react';
import { locations } from '../data/tinogasta';
import TinogastaLocationCard from '../components/Tinogasta/LocationCard';
import TinogastaModal from '../components/Tinogasta/TinogastaModal';

const Tinogasta = () => {
	const [selectedLocation, setSelectedLocation] = useState(null);
	const [filter, setFilter] = useState('');

	const categories = useMemo(() => {
		const cats = locations.map((l) => l.category).filter(Boolean);
		return ['Todos', ...new Set(cats)];
	}, []);

	const filteredLocations =
		filter && filter !== 'Todos'
			? locations.filter((loc) => loc.category === filter)
			: locations;

	return (
		<main className='min-h-screen bg-gradient-to-br  text-white px-4 py-12'>
			<section className='max-w-6xl mx-auto'>
				<header className='mb-12 text-center'>
					<h1 className='text-4xl font-extrabold mb-2'>Tinogasta</h1>
					<p className='text-lg text-white/80'>
						Tierra de historia, termas y paisajes entre volcanes y valles.
					</p>
				</header>

				<section
					aria-label='Filtro de categorías'
					className='mb-8 flex flex-wrap justify-center gap-3'
				>
					{categories.map((cat) => (
						<button
							key={cat}
							onClick={() => setFilter(cat)}
							className={`px-5 py-2 rounded-full font-semibold transition-all border ${
								filter === cat
									? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent'
									: 'bg-white/10 text-white border-white/20 hover:bg-white/20'
							}`}
						>
							{cat}
						</button>
					))}
				</section>

				<section
					aria-label='Lista de lugares'
					className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
				>
					{filteredLocations.map((loc) => (
						<TinogastaLocationCard
							key={loc.id}
							location={loc}
							onShowDetails={setSelectedLocation}
						/>
					))}
				</section>
			</section>

			{selectedLocation && (
				<TinogastaModal
					location={selectedLocation}
					onClose={() => setSelectedLocation(null)}
				/>
			)}
		</main>
	);
};

export default Tinogasta;
