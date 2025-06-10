import { useState, useMemo, useCallback } from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion, LayoutGroup } from 'framer-motion';
import { locations } from '../data/catamarca';
import CatamarcaHero from '../components/Catamarca/CatamarcaHero';
import CatamarcaGrid from '../components/Catamarca/CatamarcaGrid';
import CatamarcaModal from '../components/Catamarca/CatamarcaModal';
import CatamarcaFilter from '../components/Catamarca/CatamarcaFilter';
import React from 'react';

// Componente principal

const Catamarca = () => {
	const [selectedArea, setSelectedArea] = useState('all');
	const [selectedLocationData, setSelectedLocationData] = useState(null);
	const [isOpen, setIsOpen] = useState(false);
	const { colorMode } = useTheme();
	const isDark = colorMode === 'dark';

	// Extraer las áreas únicas una sola vez
	const areas = useMemo(() => {
		return [...new Set(locations.map((loc) => loc.area))].sort();
	}, []);

	// Calcular las ubicaciones filtradas según el área seleccionada
	const filteredLocations = useMemo(() => {
		return selectedArea === 'all'
			? locations
			: locations.filter((loc) => loc.area === selectedArea);
	}, [selectedArea]);

	// Manejo de la apertura del modal
	const openModal = useCallback(
		(id) => {
			const foundLocation = locations.find((loc) => loc.id === id);
			if (foundLocation) {
				setSelectedLocationData(foundLocation);
				setIsOpen(true);
			}
		},
		[setIsOpen]
	);

	// Manejo del cierre del modal, con un setTimeout para limpiar la data
	const closeModal = useCallback(() => {
		setIsOpen(false);
		// Se podría reemplazar setTimeout por un callback basado en el fin de la animación
		setTimeout(() => setSelectedLocationData(null), 300);
	}, [setIsOpen]);

	// Consolidar la clase de fondo principal
	const mainBg = isDark
		? 'bg-gradient-to-b from-gray-900 to-gray-800'
		: 'bg-gradient-to-b from-gray-50 to-white';

	return (
		<LayoutGroup>
			<main
				className={`min-h-screen py-12 ${mainBg} transition-colors duration-300`}
			>
				<div className='container mx-auto max-w-7xl px-4'>
					<div className='space-y-10'>
						<CatamarcaHero
							badge='Capital Histórica'
							title='San Fernando del Valle'
							subtitle='Descubre los tesoros escondidos de la capital catamarqueña'
							isDark={isDark}
						/>

						<CatamarcaFilter
							title="Áreas"
							items={areas}
							selected={selectedArea === 'all' ? 'Todos' : selectedArea}
							onSelect={(area) =>
								setSelectedArea(area === 'Todos' ? 'all' : area)
							}
						/>

						<CatamarcaGrid
							locations={filteredLocations}
							onLocationClick={openModal}
						/>
					</div>
				</div>

				<CatamarcaModal
					isOpen={isOpen}
					onClose={closeModal}
					location={selectedLocationData}
					isDark={isDark}
				/>
			</main>
		</LayoutGroup>
	);
};

export default React.memo(Catamarca);
