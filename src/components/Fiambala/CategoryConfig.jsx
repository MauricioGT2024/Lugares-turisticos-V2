import {
  FaMountain,
  FaUmbrellaBeach,
  FaLandmark,
  FaArchway,
  FaSun,
} from "react-icons/fa";

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
