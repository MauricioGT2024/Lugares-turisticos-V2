import { 
  FaMountain, 
  FaLandmark, 
  FaTree, 
  FaWater,
  FaMapMarkerAlt
} from "react-icons/fa";

export const AREA_ICONS = {
  Centro: FaLandmark,
  Noroeste: FaTree,
  Sureste: FaWater,
  Norte: FaMountain,
  default: FaMapMarkerAlt
};

export const getIconByArea = (area) => {
  return AREA_ICONS[area] || AREA_ICONS.default;
};

export const getAllAreaIcons = () => {
  return Object.keys(AREA_ICONS)
    .filter(key => key !== 'default')
    .map(key => ({
      area: key,
      icon: AREA_ICONS[key]
    }));
};
