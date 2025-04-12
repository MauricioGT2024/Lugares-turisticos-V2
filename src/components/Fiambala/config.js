import { useMemo } from 'react';

export const useLocationFilter = (locations, categoryFilter) => {
	return useMemo(
		() =>
			categoryFilter
				? locations.filter((loc) => loc.category === categoryFilter)
				: locations,
		[locations, categoryFilter]
	);
};

export const FIAMBALA_ANIMATIONS = {
	pageTransition: {
		initial: { opacity: 0, y: 20 },
		animate: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
				ease: [0.6, -0.05, 0.01, 0.99],
			},
		},
		exit: { opacity: 0, y: -20 },
	},
	container: {
		initial: { opacity: 0 },
		animate: {
			opacity: 1,
			transition: { staggerChildren: 0.1 },
		},
	},
	item: {
		initial: { opacity: 0, y: 20 },
		animate: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.4 },
		},
		hover: {
			y: -5,
			transition: { duration: 0.2 },
		},
	},
};

export const filterAnimations = {
	hidden: {
		opacity: 0,
		y: 20,
		scale: 0.95,
	},
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			type: 'spring',
			stiffness: 320,
			damping: 22,
		},
	},
	exit: {
		opacity: 0,
		y: -20,
		scale: 0.95,
		transition: { duration: 0.2 },
	},
};
