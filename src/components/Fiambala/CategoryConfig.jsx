import { FaMountain, FaMapMarkedAlt, FaUmbrellaBeach, FaLandmark, FaArchway, FaSun } from "react-icons/fa";

export const CATEGORY_CONFIG = {
  "Desierto": {
    gradient: "linear(to-r, yellow.400, orange.400)",
    color: "yellow.600",
    darkColor: "yellow.300",
    icon: FaSun
  },
  "Cultura": {
    gradient: "linear(to-r, purple.400, pink.400)",
    color: "purple.600",
    darkColor: "purple.300",
    icon: FaArchway
  },
  "Termas": {
    gradient: "linear(to-r, blue.400, cyan.400)", 
    color: "blue.600",
    darkColor: "blue.300",
    icon: FaUmbrellaBeach
  },
  "Mirador": {
    gradient: "linear(to-r, green.400, teal.400)",
    color: "green.600",
    darkColor: "green.300", 
    icon: FaMountain
  },
  "Montañas": {
    gradient: "linear(to-r, gray.600, blue.400)",
    color: "gray.600",
    darkColor: "gray.300",
    icon: FaMountain
  },
  "Centro": {
    gradient: "linear(to-r, yellow.400, red.400)",
    color: "yellow.600",
    darkColor: "yellow.300",
    icon: FaLandmark
  }
};
