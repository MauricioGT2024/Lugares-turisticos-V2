import { FaLandmark, FaTree, FaWater, FaMountain } from "react-icons/fa";

export const AREA_THEMES = {
  Centro: {
    gradient: 'from-amber-400 to-emerald-400',
    color: 'amber',
    icon: FaLandmark,
  },
  Noroeste: {
    gradient: 'from-emerald-400 to-teal-400',
    color: 'emerald',
    icon: FaTree,
  },
  Sureste: {
    gradient: 'from-sky-400 to-cyan-400',
    color: 'sky',
    icon: FaWater,
  },
  Norte: {
    gradient: 'from-orange-400 to-amber-400',
    color: 'orange',
    icon: FaMountain,
  }
};

export const getAreaTheme = (area) => {
  return AREA_THEMES[area] || {
    gradient: 'from-slate-400 to-gray-500',
    color: 'slate',
    icon: FaLandmark,
  };
};
