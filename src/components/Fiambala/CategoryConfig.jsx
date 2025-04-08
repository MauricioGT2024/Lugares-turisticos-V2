import {
  FaMountain,
  FaUmbrellaBeach,
  FaLandmark,
  FaArchway,
  FaSun,
} from "react-icons/fa";

export const CATEGORY_CONFIG = {
  Desierto: {
    bgClass: 'bg-amber-500',
    hoverClass: 'hover:text-amber-500',
    textClass: 'text-amber-500',
    icon: FaSun,
  },
  Cultura: {
    bgClass: 'bg-purple-500',
    hoverClass: 'hover:text-purple-500',
    textClass: 'text-purple-500',
    icon: FaArchway,
  },
  Termas: {
    bgClass: 'bg-sky-500',
    hoverClass: 'hover:text-sky-500',
    textClass: 'text-sky-500',
    icon: FaUmbrellaBeach,
  },
  Mirador: {
    bgClass: 'bg-emerald-500',
    hoverClass: 'hover:text-emerald-500',
    textClass: 'text-emerald-500',
    icon: FaMountain,
  },
  Montañas: {
    bgClass: 'bg-slate-600',
    hoverClass: 'hover:text-slate-600',
    textClass: 'text-slate-600',
    icon: FaMountain,
  },
  Centro: {
    bgClass: 'bg-yellow-500',
    hoverClass: 'hover:text-yellow-500',
    textClass: 'text-yellow-500',
    icon: FaLandmark,
  },
};
