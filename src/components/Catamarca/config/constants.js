import { FaLandmark, FaTree, FaWater, FaMountain } from "react-icons/fa";

export const AREAS = {
  Centro: {
    gradient: 'from-amber-400 to-emerald-400',
    icon: FaLandmark,
    hover: 'yellow.400'
  },
  Noroeste: {
    gradient: 'from-emerald-400 to-teal-400',
    icon: FaTree,
    hover: 'green.400'
  },
  Sureste: {
    gradient: 'from-sky-400 to-cyan-400',
    icon: FaWater,
    hover: 'blue.400'
  },
  Norte: {
    gradient: 'from-orange-400 to-amber-400',
    icon: FaMountain,
    hover: 'orange.400'
  }
};

export const ANIMATIONS = {
  card: {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 260, damping: 20 }
    },
    hover: {
      y: -12,
      scale: 1.03,
      transition: { type: "spring", stiffness: 400, damping: 25 }
    },
    tap: { scale: 0.98 }
  },
  filter: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    hover: { y: -2, scale: 1.05 },
    tap: { scale: 0.95 }
  }
};

export const getAreaConfig = (area) => AREAS[area] || AREAS.Centro;
