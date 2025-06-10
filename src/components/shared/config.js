import { FaLandmark, FaTree, FaWater, FaMountain, FaMapMarkerAlt } from 'react-icons/fa';

export const AREA_THEMES = {
  Centro: {
    gradient: 'from-amber-400 to-emerald-400',
    color: 'amber.400',
    badge: 'rgba(255, 214, 0, 0.9)',
    hover: 'yellow.400',
    icon: FaLandmark,
  },
  Noroeste: {
    gradient: 'from-emerald-400 to-teal-400',
    color: 'emerald.400',
    badge: 'rgba(72, 187, 120, 0.9)',
    hover: 'green.400',
    icon: FaTree,
  },
  Sureste: {
    gradient: 'from-sky-400 to-cyan-400',
    color: 'sky.400',
    badge: 'rgba(66, 153, 225, 0.9)',
    hover: 'blue.400',
    icon: FaWater,
  },
  Norte: {
    gradient: 'from-orange-400 to-amber-400',
    color: 'orange.400',
    badge: 'rgba(237, 137, 54, 0.9)',
    hover: 'orange.400',
    icon: FaMountain,
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
export const getIconByArea = (area) => (AREA_THEMES[area] || DEFAULT_THEME).icon;

export const ANIMATIONS = {
  fadeInDown: {
    initial: { opacity: 0, y: -20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
  },
  
  fadeIn: {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.5 },
    },
  },

  container: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
};
