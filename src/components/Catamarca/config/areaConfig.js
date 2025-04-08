import { FaLandmark, FaTree, FaWater, FaMountain } from "react-icons/fa";

export const AREA_THEMES = {
  Centro: {
    gradient: 'from-yellow-400 to-green-400',
    badge: '#FFD600E6',
    icon: FaLandmark,
    color: 'yellow'
  },
  Noroeste: {
    gradient: 'from-green-400 to-teal-400',
    badge: '#48BB78E6',
    icon: FaTree,
    color: 'green'
  },
  Sureste: {
    gradient: 'from-blue-400 to-cyan-400',
    badge: '#4299E1E6',
    icon: FaWater,
    color: 'blue'
  },
  Norte: {
    gradient: 'from-orange-400 to-yellow-400',
    badge: '#ED8936E6',
    icon: FaMountain,
    color: 'orange'
  }
};

export const getAreaTheme = (area) => {
  return AREA_THEMES[area] || {
    gradient: 'from-gray-400 to-gray-600',
    badge: '#718096E6',
    icon: FaLandmark,
    color: 'gray'
  };
};
