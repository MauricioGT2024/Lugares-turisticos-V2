// Constants for reusable values
const TRANSITION_DEFAULT = { duration: 0.5, ease: 'easeOut' };
const EASE_IN_OUT = { duration: 0.2, ease: 'easeInOut' };

export const ANTOFAGASTA_ANIMATIONS = {
	pageVariants: {
		initial: { opacity: 0 },
		animate: {
			opacity: 1,
			transition: { staggerChildren: 0.1, delayChildren: 0.2 },
		},
		exit: { opacity: 0 },
	},

	cardVariants: {
		initial: { opacity: 0, y: 20 },
		animate: {
			opacity: 1,
			y: 0,
			transition: TRANSITION_DEFAULT,
		},
		hover: {
			y: -8,
			transition: EASE_IN_OUT,
		},
	},

	headerVariants: {
		initial: { opacity: 0, y: -20 },
		animate: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
				ease: [0.6, -0.05, 0.01, 0.99], // Custom ease curve for a more natural transition
			},
		},
	},
};

export const filterAnimations = {
	hidden: {
		opacity: 0,
		y: 20,
		scale: 0.9,
	},
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			type: 'spring',
			stiffness: 280,
			damping: 20,
		},
	},
	exit: {
		opacity: 0,
		y: -20,
		scale: 0.9,
		transition: { duration: 0.2 },
	},
};
export const modalVariants = {
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
    transition: { duration: 0.2 },
  },
};