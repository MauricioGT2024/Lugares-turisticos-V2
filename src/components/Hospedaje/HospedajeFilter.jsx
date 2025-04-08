import { useColorMode } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaSearch, FaMapMarkedAlt, FaHotel } from "react-icons/fa";
import PropTypes from "prop-types";

const HospedajeFilter = ({ selectedDepartment, setSelectedDepartment, departments }) => {
  const { colorMode } = useColorMode();

  return (
    <motion.div
      className="sticky top-20 space-y-6"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className={`p-5 rounded-xl border shadow-md transition-all duration-300 ${
          colorMode === "dark"
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="space-y-5">
          <div className="flex items-center space-x-3">
            <FaHotel className="w-5 h-5 text-teal-500" />
            <span className={`font-semibold ${
              colorMode === "dark" ? "text-gray-200" : "text-gray-700"
            }`}>
              Filtrar por Ubicación
            </span>
          </div>

          <div className="relative pt-1">
            <FaSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 z-10 ${
              colorMode === "dark" ? "text-gray-400" : "text-gray-500"
            }`} />
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg appearance-none transition-all duration-200 ${
                colorMode === "dark"
                  ? "bg-gray-700 text-gray-200 border-gray-600 focus:border-teal-500"
                  : "bg-gray-100 text-gray-800 border-gray-200 focus:border-teal-500"
              } focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50`}
            >
              <option value="all">Todos los lugares</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            <FaMapMarkedAlt className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
              colorMode === "dark" ? "text-gray-400" : "text-gray-500"
            }`} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

HospedajeFilter.propTypes = {
  selectedDepartment: PropTypes.string.isRequired,
  setSelectedDepartment: PropTypes.func.isRequired,
  departments: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default HospedajeFilter;
