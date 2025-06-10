// Tinogasta.jsx
import React, { useState, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import { locations } from '../data/tinogasta';
import TinogastaHero from '../components/Tinogasta/TinogastaHero';
import TinogastaGrid from '../components/Tinogasta/TinogastaGrid';
import TinogastaModal from '../components/Tinogasta/TinogastaModal';
import TinogastaFilter from '../components/Tinogasta/TinogastaFilter';
import { pageStyles } from '../styles/pageStyles';

const Tinogasta = () => {
	const [categoryFilter, setCategoryFilter] = useState('Todos');
	const [selectedLocationData, setSelectedLocationData] = useState(null);
	const [isOpen, setIsOpen] = useState(false);
	const { colorMode } = useTheme();
	const isDark = colorMode === 'dark';

	// Obtener categorías únicas
	const categories = useMemo(() => {
		return [...new Set(locations.map((loc) => loc.category))].sort();
	}, []);

	// Filtrar ubicaciones según la categoría seleccionada
	const filteredLocations = useMemo(() => {
		return categoryFilter === 'Todos'
			? locations
			: locations.filter((loc) => loc.category === categoryFilter);
	}, [categoryFilter]);

	// Manejadores de eventos
	const handleLocationClick = (id) => {
		const location = locations.find((loc) => loc.id === id);
		if (location) {
			setSelectedLocationData(location);
			setIsOpen(true);
		}
	};

	const handleCloseModal = () => {
		setIsOpen(false);
		setTimeout(() => setSelectedLocationData(null), 300);
	};

	const mainBg = isDark
		? 'bg-gradient-to-b from-gray-900 to-gray-800'
		: 'bg-gradient-to-b from-gray-50 to-white';

	return (
		<main
			className={`min-h-screen py-12 ${mainBg} transition-colors duration-300`}
		>
			<div className='container mx-auto px-4 md:px-8 max-w-7xl'>
				<div className='space-y-10'>
					<TinogastaHero
						badge='Descubre Tinogasta'
						title='Tinogasta'
						subtitle='Un rincón mágico donde la historia y la naturaleza se entrelazan con la tradición vitivinícola.'
						isDark={isDark}
					/>

					<TinogastaFilter
						title='Categorías'
						items={categories}
						selected={categoryFilter}
						onSelect={setCategoryFilter}
					/>

					<TinogastaGrid
						locations={filteredLocations}
						onLocationClick={handleLocationClick}
					/>

					<TinogastaModal
						isOpen={isOpen}
						onClose={handleCloseModal}
						location={selectedLocationData}
						isDark={isDark}
						gradient={pageStyles.tinogasta.modal.gradient}
					/>
				</div>
			</div>
		</main>
	);
};

export default Tinogasta;
