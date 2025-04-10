import { FaLandmark, FaTree, FaWater, FaMountain } from "react-icons/fa";

export const THEME_CONFIG = {
  areas: {
    Centro: {
      gradient: 'from-amber-400 to-emerald-400',
      color: 'amber.400',
      icon: FaLandmark,
      badge: 'rgba(255, 214, 0, 0.9)'
    },
    Noroeste: {
      gradient: 'from-emerald-400 to-teal-400',
      color: 'emerald.400',
      icon: FaTree,
      badge: 'rgba(72, 187, 120, 0.9)'
    },
    Sureste: {
      gradient: 'from-sky-400 to-cyan-400',
      color: 'sky.400',
      icon: FaWater,
      badge: 'rgba(66, 153, 225, 0.9)'
    },
    Norte: {
      gradient: 'from-orange-400 to-amber-400',
      color: 'orange.400',
      icon: FaMountain,
      badge: 'rgba(237, 137, 54, 0.9)'
    }
  },
  
  default: {
    gradient: 'from-gray-400 to-slate-400',
    color: 'gray.400',
    icon: FaLandmark,
    badge: 'rgba(160, 174, 192, 0.9)'
  }
};

export const getAreaTheme = (area) => THEME_CONFIG.areas[area] || THEME_CONFIG.default;
