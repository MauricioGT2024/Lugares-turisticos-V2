import { useMemo } from 'react';
import { locations } from '../../data/tinogasta';

export const useTinogastaCategories = () => {
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(locations.map(loc => loc.category))];
    return uniqueCategories.sort();
  }, []);

  return { categories };
};

export const TINOGASTA_ANIMATIONS = {
	pageVariants: {
		initial: { opacity: 0, y: 20 },
		animate: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.8,
				ease: [0.6, -0.05, 0.01, 0.99],
				staggerChildren: 0.2,
			},
		},
		exit: {
			opacity: 0,
			y: -20,
			transition: { duration: 0.3 },
		},
	},

	cardVariants: {
		initial: {
			opacity: 0,
			y: 20,
			scale: 0.95,
		},
		animate: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				type: 'spring',
				stiffness: 260,
				damping: 20,
			},
		},
		hover: {
			y: -12,
			scale: 1.03,
			transition: {
				type: 'spring',
				stiffness: 400,
				damping: 25,
			},
		},
		tap: {
			scale: 0.98,
			transition: {
				duration: 0.1,
			},
		},
	},

	filterVariants: {
		initial: {
			opacity: 0,
			x: -20,
			scale: 0.8,
		},
		animate: {
			opacity: 1,
			x: 0,
			scale: 1,
			transition: {
				type: 'spring',
				stiffness: 300,
				damping: 25,
			},
		},
		hover: {
			scale: 1.05,
			y: -2,
			transition: {
				type: 'spring',
				stiffness: 400,
				damping: 25,
			},
		},
	},

	modalVariants: {
		initial: {
			opacity: 0,
			y: 50,
			scale: 0.9,
		},
		animate: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				type: 'spring',
				stiffness: 300,
				damping: 25,
			},
		},
		exit: {
			opacity: 0,
			y: -50,
			scale: 0.9,
			transition: {
				duration: 0.2,
			},
		},
	},

	imageVariants: {
		hover: {
			scale: 1.1,
			transition: {
				duration: 0.6,
				ease: [0.6, 0.01, -0.05, 0.9],
			},
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
			stiffness: 300,
			damping: 25,
		},
	},
	exit: {
		opacity: 0,
		y: -20,
		scale: 0.95,
		transition: { duration: 0.2 },
	},
};

export const cardAnimation = {
	initial: {
		opacity: 0,
		y: 20,
		scale: 0.95,
	},
	animate: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			type: 'spring',
			stiffness: 260,
			damping: 20,
		},
	},
	exit: {
		opacity: 0,
		y: -20,
		scale: 0.95,
		transition: { duration: 0.2 },
	},
};

