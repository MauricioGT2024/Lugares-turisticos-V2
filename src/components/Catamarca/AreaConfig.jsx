import { FaLandmark, FaTree, FaWater, FaMountain } from "react-icons/fa";

export const AREA_CONFIG = {
  Centro: {
    gradient: "linear(to-r, yellow.400, green.400)",
    badge: "rgba(255, 214, 0, 0.9)",
    icon: FaLandmark,
    hover: "yellow.400",
  },
  Noroeste: {
    gradient: "linear(to-r, green.400, teal.400)",
    badge: "rgba(72, 187, 120, 0.9)",
    icon: FaTree,
    hover: "green.400",
  },
  Sureste: {
    gradient: "linear(to-r, blue.400, cyan.400)",
    badge: "rgba(66, 153, 225, 0.9)",
    icon: FaWater,
    hover: "blue.400",
  },
  Norte: {
    gradient: "linear(to-r, orange.400, yellow.400)",
    badge: "rgba(237, 137, 54, 0.9)",
    icon: FaMountain,
    hover: "orange.400",
  },
};
