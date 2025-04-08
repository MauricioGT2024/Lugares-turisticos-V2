import { FaMountain, FaWater, FaCity, FaRegCompass } from "react-icons/fa";

export const categoryConfig = {
  Volcan: {
    icon: FaMountain,
    bgClass: 'bg-gradient-to-r from-red-400 to-orange-400',
    textClass: 'text-red-500',
    hoverClass: 'hover:text-red-500',
  },
  Laguna: {
    icon: FaWater,
    bgClass: 'bg-gradient-to-r from-blue-400 to-cyan-400',
    textClass: 'text-blue-500',
    hoverClass: 'hover:text-blue-500',
  },
  Capital: {
    icon: FaCity,
    bgClass: 'bg-gradient-to-r from-purple-400 to-pink-400',
    textClass: 'text-purple-500',
    hoverClass: 'hover:text-purple-500',
  },
  Campo: {
    icon: FaRegCompass,
    bgClass: 'bg-gradient-to-r from-green-400 to-teal-400',
    textClass: 'text-green-500',
    hoverClass: 'hover:text-green-500',
  },
  Salar: {
    icon: FaWater,
    bgClass: 'bg-gradient-to-r from-cyan-400 to-blue-400',
    textClass: 'text-cyan-500',
    hoverClass: 'hover:text-cyan-500',
  },
};
