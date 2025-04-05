import { useMemo } from 'react';

const CATEGORY_CONFIG = {
  "Plazas": {
    icon: "FaLandmark",
    colorScheme: "purple"
  },
  "Iglesias": {
    icon: "FaChurch",
    colorScheme: "blue" 
  },
  "Naturaleza": {
    icon: "FaTree",
    colorScheme: "green"
  },
  "Balnearios": {
    icon: "FaWater",
    colorScheme: "cyan"
  },
  "Miradores": {
    icon: "FaBinoculars",
    colorScheme: "orange"
  },
  "Museos": {
    icon: "FaCampground",
    colorScheme: "yellow"
  },
  "Montañas": {
    icon: "FaMountain",
    colorScheme: "gray"
  }
};

export const useCategoryConfig = () => {
  const categories = useMemo(() => Object.keys(CATEGORY_CONFIG), []);
  
  return {
    categories,
    getConfig: (category) => CATEGORY_CONFIG[category] || {},
  };
};
