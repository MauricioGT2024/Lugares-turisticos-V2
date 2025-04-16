export const pageTransition = {
	initial: {
		opacity: 0,
		y: 15,
		filter: 'blur(5px)',
	},
	animate: {
		opacity: 1,
		y: 0,
		filter: 'blur(0px)',
		transition: {
			type: 'spring',
			mass: 0.8,
			damping: 15,
			stiffness: 80,
			when: 'beforeChildren',
			staggerChildren: 0.2,
		},
	},
	exit: {
		opacity: 0,
		y: -15,
		filter: 'blur(5px)',
		transition: {
			duration: 0.15,
			ease: 'easeOut',
		},
	},
};
