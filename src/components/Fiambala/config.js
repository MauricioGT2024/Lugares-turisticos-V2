import { FaArchway, FaLandmark, FaMountain, FaSun, FaUmbrellaBeach } from 'react-icons/fa';



export const FIAMBALA_ANIMATIONS = {
	pageTransition: {
		initial: { opacity: 0, y: 20 },
		animate: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.8,
				ease: [0.6, -0.05, 0.01, 0.99],
			},
		},
		exit: { 
			opacity: 0,
			y: -20,
			transition: {
				duration: 0.6
			}
		},
	},
	container: {
		initial: { opacity: 0 },
		animate: {
			opacity: 1,
			transition: { 
				staggerChildren: 0.1,
				delayChildren: 0.2
			},
		},
	},
	item: {
		initial: { opacity: 0, y: 20 },
		animate: {
			opacity: 1,
			y: 0,
			transition: { 
				duration: 0.6,
				ease: [0.6, -0.05, 0.01, 0.99],
			},
		},
		hover: {
			y: -8,
			transition: { 
				duration: 0.3,
				ease: "easeOut"
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

// CONFIGURACIÓN DE CATEGORÍAS
export const CATEGORY_CONFIG = {
  Desierto: {
    bgClass: 'bg-gradient-to-r from-amber-500 to-orange-500',
    hoverClass: 'hover:text-amber-500',
    textClass: 'text-amber-500',
    icon: FaSun,
  },
  Cultura: {
    bgClass: 'bg-gradient-to-r from-purple-500 to-pink-500',
    hoverClass: 'hover:text-purple-500',
    textClass: 'text-purple-500',
    icon: FaArchway,
  },
  Termas: {
    bgClass: 'bg-gradient-to-r from-sky-500 to-blue-500',
    hoverClass: 'hover:text-sky-500',
    textClass: 'text-sky-500',
    icon: FaUmbrellaBeach,
  },
  Mirador: {
    bgClass: 'bg-gradient-to-r from-emerald-500 to-teal-500',
    hoverClass: 'hover:text-emerald-500',
    textClass: 'text-emerald-500',
    icon: FaMountain,
  },
  Montañas: {
    bgClass: 'bg-gradient-to-r from-slate-600 to-gray-600',
    hoverClass: 'hover:text-slate-600',
    textClass: 'text-slate-600',
    icon: FaMountain,
  },
  Centro: {
    bgClass: 'bg-gradient-to-r from-yellow-500 to-amber-500',
    hoverClass: 'hover:text-yellow-500',
    textClass: 'text-yellow-500',
    icon: FaLandmark,
  },
};