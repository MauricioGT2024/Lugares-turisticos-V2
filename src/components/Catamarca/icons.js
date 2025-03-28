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

export const areaIcons = {
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
  return areaIcons[area] || areaIcons.default;
};
