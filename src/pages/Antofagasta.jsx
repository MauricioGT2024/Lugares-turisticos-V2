import React, { useState, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { location } from '../data/antofagasta';
import AntofagastaHero from '../components/Antofagasta/AntofagastaHero';
import AntofagastaGrid from '../components/Antofagasta/AntofagastaGrid';
import AntofagastaModal from '../components/Antofagasta/AntofagastaModal';
import AntofagastaFilter from '../components/Antofagasta/AntofagastaFilter';
import { pageStyles } from '../styles/pageStyles';

const Antofagasta = () => {
	const [categoryFilter, setCategoryFilter] = useState('Todos');
	const [selectedLocationData, setSelectedLocationData] = useState(null);
	const { colorMode } = useTheme();
	const [isOpen, setIsOpen] = useState(false);
	const isDark = colorMode === 'dark';

	// Obtener categorías únicas
	const categories = useMemo(() => {
		return [...new Set(location.map((loc) => loc.categoria))].sort();
	}, []);

	// Filtrar ubicaciones según la categoría seleccionada
	const filteredLocations = useMemo(() => {
		return categoryFilter === 'Todos'
			? location
			: location.filter((loc) => loc.categoria === categoryFilter);
	}, [categoryFilter]);

	// Manejadores de eventos
	const handleLocationClick = (id) => {
		const selectedLocation = location.find((loc) => loc.id === id);
		if (selectedLocation) {
			setSelectedLocationData(selectedLocation);
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
					<AntofagastaHero
						badge='Puna de Atacama'
						title='Antofagasta de la Sierra'
						subtitle='Donde el desierto de altura se encuentra con volcanes milenarios y salares brillantes, creando paisajes únicos en la Puna catamarqueña'
						isDark={isDark}
					/>

					<AntofagastaFilter
						title='Categorías'
						items={categories}
						selected={categoryFilter}
						onSelect={setCategoryFilter}
					/>

					<AntofagastaGrid
						locations={filteredLocations}
						onLocationClick={handleLocationClick}
					/>
				</div>

				<AntofagastaModal
					isOpen={isOpen}
					onClose={handleCloseModal}
					location={selectedLocationData}
					isDark={isDark}
					gradient={pageStyles.antofagasta.modal.gradient}
				/>
			</div>
		</main>
	);
};

export default Antofagasta;
