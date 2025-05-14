// src/config/areaThemes.js
import {
	FaLandmark,
	FaTree,
	FaWater,
	FaMountain,
	FaMapMarkerAlt,
} from 'react-icons/fa';
import { useColorMode } from '@chakra-ui/react';
import clsx from 'clsx';
export const AREA_THEMES = {
	Centro: {
		gradient: 'from-amber-400 to-emerald-400',
		color: 'amber.400',
		badge: 'rgba(255, 214, 0, 0.9)',
		hover: 'yellow.400',
		icon: FaLandmark,
		title: 'Centro',
		description: 'El centro de la provincia de Catamarca',
	},
	Noroeste: {
		gradient: 'from-emerald-400 to-teal-400',
		color: 'emerald.400',
		badge: 'rgba(72, 187, 120, 0.9)',
		hover: 'green.400',
		icon: FaTree,
		title: 'Noroeste',
		description: 'Zona noroeste de la provincia',
	},
	Sureste: {
		gradient: 'from-sky-400 to-cyan-400',
		color: 'sky.400',
		badge: 'rgba(66, 153, 225, 0.9)',
		hover: 'blue.400',
		icon: FaWater,
		title: 'Sureste',
		description: 'Zona sureste con paisajes acuáticos',
	},
	Norte: {
		gradient: 'from-orange-400 to-amber-400',
		color: 'orange.400',
		badge: 'rgba(237, 137, 54, 0.9)',
		hover: 'orange.400',
		icon: FaMountain,
		title: 'Norte',
		description: 'Zona norte montañosa',
	},
};

export const DEFAULT_THEME = {
	gradient: 'from-gray-400 to-slate-400',
	color: 'gray.400',
	badge: 'rgba(160, 174, 192, 0.9)',
	hover: 'gray.400',
	icon: FaMapMarkerAlt,
};

export const getAreaTheme = (area) => AREA_THEMES[area] || DEFAULT_THEME;
export const getIconByArea = (area) =>
	(AREA_THEMES[area] || DEFAULT_THEME).icon;




export function useAreaFilterStyle(area, isSelected) {
	const { colorMode } = useColorMode();
	const { icon: Icon, gradient } = getAreaTheme(area);

	const buttonClasses = clsx(
		'inline-flex items-center gap-2 px-5 py-2 rounded-full font-semibold shadow-sm transition-colors duration-300',
		{
			[gradient]: isSelected,
			'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white':
				!isSelected && colorMode === 'dark',
			'bg-white text-gray-700 hover:bg-gray-100':
				!isSelected && colorMode === 'light',
		},
		'border border-transparent hover:border-yellow-500/50'
	);

	return { Icon, buttonClasses };
}
