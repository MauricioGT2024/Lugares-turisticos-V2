export const easings = {
	smooth: [0.43, 0.13, 0.23, 0.96],
	bounce: [0.68, -0.55, 0.265, 1.55],
};

export const ANIMATION_PRESETS = {
	fadeIn: {
		initial: { opacity: 0, y: 20 },
		animate: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
				ease: easings.smooth,
			},
		},
		exit: {
			opacity: 0,
			y: -20,
			transition: {
				duration: 0.3,
				ease: easings.smooth,
			},
		},
	},
	fadeInDown: {
		initial: { opacity: 0, y: -20 },
		animate: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
				ease: [0.6, -0.05, 0.01, 0.99],
			},
		},
	},
	container: {
		initial: { opacity: 0 },
		animate: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.3,
			},
		},
	},
	item: {
		initial: { opacity: 0, y: 20 },
		animate: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
				ease: 'easeOut',
			},
		},
		hover: {
			scale: 1.03,
			transition: {
				duration: 0.2,
				ease: 'easeInOut',
			},
		},
	},
	card: {
		hover: {
			y: -4,
			transition: {
				duration: 0.2,
			},
		},
		tap: {
			scale: 0.98,
		},
	},
	button: {
		initial: { opacity: 0, scale: 0.9 },
		animate: {
			opacity: 1,
			scale: 1,
			transition: {
				duration: 0.3,
				ease: 'easeOut',
			},
		},
		hover: {
			scale: 1.05,
			transition: {
				duration: 0.2,
			},
		},
		tap: {
			scale: 0.95,
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
				stiffness: 300,
				damping: 25,
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
	filterAnimations: {
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
			transition: { duration: 0.2 },
		},
	},
	containerVariants: {
		initial: { opacity: 0 },
		animate: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.2,
			},
		},
	},
	exit: {
		opacity: 0,
		y: -20,
		transition: { duration: 0.3 },
	},
};
    


export const ANIMATIONS = {
	page: {
		initial: { opacity: 0, y: 20 },
		animate: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.4, ease: 'easeOut' },
		},
		exit: { opacity: 0, y: -20 },
	},

	card: {
		initial: { opacity: 0, y: 20, scale: 0.95 },
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
		tap: { scale: 0.98 },
	},

	filter: {
		initial: { opacity: 0, y: 20, scale: 0.95 },
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
		hover: {
			y: -2,
			scale: 1.05,
			transition: { duration: 0.2 },
		},
		tap: { scale: 0.95 },
	},
};