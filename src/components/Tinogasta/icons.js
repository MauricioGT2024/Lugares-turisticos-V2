import {
  FaChurch,
  FaLandmark,
  FaTree,
  FaUmbrellaBeach,
  FaMapMarkerAlt,
  FaWater,
  FaMountain,
  FaCampground,
  FaEye,
  FaSpa,
  FaUniversity
} from "react-icons/fa";

export const categoryIcons = {
  "Iglesias": FaChurch,
  "Plazas": FaLandmark,
  "Naturaleza": FaTree,
  "Balnearios": FaWater,
  "Miradores": FaEye,
  "Museos": FaUniversity,
  "Camping": FaCampground,
  "Termas": FaSpa,
  "Montañas": FaMountain,
  "default": FaMapMarkerAlt
};

export const getIconByCategory = (category) => {
  return categoryIcons[category] || categoryIcons.default;
};
