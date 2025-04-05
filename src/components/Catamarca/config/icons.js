import { 
  FaMountain, 
  FaUmbrellaBeach, 
  FaChurch, 
  FaWater,
  FaTree, 
  FaMapMarkerAlt,
  FaHiking,
  FaLandmark,
  FaHotel,
  FaUtensils
} from "react-icons/fa";

const AREA_ICONS = {
  "Montaña": FaMountain,
  "Playa": FaUmbrellaBeach,
  "Religioso": FaChurch,
  "Lago": FaWater,
  "Naturaleza": FaTree,
  "Senderismo": FaHiking,
  "Histórico": FaLandmark,
  "Hospedaje": FaHotel,
  "Gastronomía": FaUtensils,
  "default": FaMapMarkerAlt
};

export const getIconByArea = (area) => {
  return AREA_ICONS[area] || AREA_ICONS.default;
};

export const ICON_OPTIONS = Object.keys(AREA_ICONS)
  .filter(key => key !== "default")
  .map(key => ({
    value: key,
    label: key,
    icon: AREA_ICONS[key]
  }));
