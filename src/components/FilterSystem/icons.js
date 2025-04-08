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
  "Montañas": {
    icon: FaMountain,
    class: 'text-blue-500'
  },
  "Centro": {
    icon: FaLandmark,
    class: 'text-purple-500'
  },
  "Naturaleza": {
    icon: FaTree,
    class: 'text-green-500'
  },
  "Balnearios": {
    icon: FaWater,
    class: 'text-cyan-500'
  },
  "Iglesias": {
    icon: FaChurch,
    class: 'text-yellow-500'
  },
  "Museos": {
    icon: FaBuilding,
    class: 'text-orange-500'
  },
  "Miradores": {
    icon: FaBinoculars,
    class: 'text-indigo-500'
  },
  "Todos": {
    icon: FaHome,
    class: 'text-gray-500'
  }
};

export const getIconByCategory = (category) => {
  return (categoryIcons[category] || categoryIcons.Todos).icon;
};

export const getIconClassByCategory = (category) => {
  return (categoryIcons[category] || categoryIcons.Todos).class;
};
