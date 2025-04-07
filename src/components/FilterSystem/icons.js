import { 
  FaMountain, 
  FaLandmark, 
  FaTree, 
  FaWater, 
  FaChurch,
  FaBuilding,
  FaBinoculars,
  FaHome
} from "react-icons/fa";

export const categoryIcons = {
  "Montañas": FaMountain,
  "Centro": FaLandmark,
  "Naturaleza": FaTree,
  "Balnearios": FaWater,
  "Iglesias": FaChurch,
  "Museos": FaBuilding,
  "Miradores": FaBinoculars,
  "Todos": FaHome,
};

export const getIconByCategory = (category) => {
  return categoryIcons[category] || FaLandmark;
};
