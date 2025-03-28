import { FaMountain, FaWater, FaCity, FaRegCompass } from "react-icons/fa";

export const categoryConfig = {
  Volcan: {
    icon: FaMountain,
    gradient: "linear(to-r, red.400, orange.400)",
    color: "red.500",
  },
  Laguna: {
    icon: FaWater,
    gradient: "linear(to-r, blue.400, cyan.400)",
    color: "blue.500",
  },
  Capital: {
    icon: FaCity,
    gradient: "linear(to-r, purple.400, pink.400)",
    color: "purple.500",
  },
  Campo: {
    icon: FaRegCompass,
    gradient: "linear(to-r, green.400, teal.400)",
    color: "green.500",
  },
  Salar: {
    icon: FaWater,
    gradient: "linear(to-r, cyan.400, blue.400)",
    color: "cyan.500",
  },
};
