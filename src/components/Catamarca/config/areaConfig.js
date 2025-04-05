import { FaLandmark, FaTree, FaWater, FaMountain } from "react-icons/fa";

export const AREA_THEMES = {
  Centro: {
    gradient: "linear(to-r, yellow.400, green.400)",
    badge: "rgba(255, 214, 0, 0.9)",
    icon: FaLandmark,
    hover: "yellow.400",
    colorScheme: "yellow"
  },
  Noroeste: {
    gradient: "linear(to-r, green.400, teal.400)",
    badge: "rgba(72, 187, 120, 0.9)",
    icon: FaTree,
    hover: "green.400",
    colorScheme: "green"
  },
  Sureste: {
    gradient: "linear(to-r, blue.400, cyan.400)",
    badge: "rgba(66, 153, 225, 0.9)",
    icon: FaWater,
    hover: "blue.400",
    colorScheme: "blue"
  },
  Norte: {
    gradient: "linear(to-r, orange.400, yellow.400)",
    badge: "rgba(237, 137, 54, 0.9)",
    icon: FaMountain,
    hover: "orange.400",
    colorScheme: "orange"
  }
};

export const getAreaTheme = (area) => {
  return AREA_THEMES[area] || {
    gradient: "linear(to-r, gray.400, gray.600)",
    badge: "rgba(113, 128, 150, 0.9)",
    icon: FaLandmark,
    hover: "gray.400",
    colorScheme: "gray"
  };
};
