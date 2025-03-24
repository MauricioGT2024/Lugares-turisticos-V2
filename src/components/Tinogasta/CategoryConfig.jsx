import { FaMountain, FaWater, FaChurch, FaTree, FaBook, FaCampground, FaBinoculars } from "react-icons/fa";

export const CATEGORY_CONFIG = {
  "Plazas": {
    gradient: "linear(to-br, green.400, teal.400)",
    color: "green.600",
    darkColor: "green.300",
    icon: FaTree,
    shadow: "0 4px 20px -8px rgba(72, 187, 120, 0.5)"
  },
  "Iglesias": {
    gradient: "linear(to-br, purple.400, blue.400)",
    color: "purple.600",
    darkColor: "purple.300",
    icon: FaChurch,
    shadow: "0 4px 20px -8px rgba(159, 122, 234, 0.5)"
  },
  "Museos": {
    gradient: "linear(to-r, yellow.400, orange.400)",
    color: "yellow.600", 
    darkColor: "yellow.300",
    icon: FaBook,
    shadow: "0 4px 20px -8px rgba(236, 201, 75, 0.5)"
  },
  "Balnearios": {
    gradient: "linear(to-r, cyan.400, blue.400)",
    color: "cyan.600",
    darkColor: "cyan.300", 
    icon: FaWater,
    shadow: "0 4px 20px -8px rgba(103, 178, 216, 0.5)"
  },
  "Naturaleza": {
    gradient: "linear(to-r, green.400, yellow.400)",
    color: "green.600",
    darkColor: "green.300",
    icon: FaMountain,
    shadow: "0 4px 20px -8px rgba(104, 211, 145, 0.5)"
  },
  "Camping": {
    gradient: "linear(to-r, green.400, brown.400)",
    color: "green.600",
    darkColor: "green.300",
    icon: FaCampground,
    shadow: "0 4px 20px -8px rgba(72, 187, 120, 0.5)"
  },
  "Miradores": {
    gradient: "linear(to-r, blue.400, purple.400)",
    color: "blue.600",
    darkColor: "blue.300",
    icon: FaBinoculars,
    shadow: "0 4px 20px -8px rgba(66, 153, 225, 0.5)"
  }
};
