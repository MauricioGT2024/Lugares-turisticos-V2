import { useState } from "react";
import { useColorMode } from "@chakra-ui/react";
import HospedajeCard from "./HospedajeCard";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const getUniqueLocations = (hospedajes) => [
  ...new Set(hospedajes.map((h) => h.location)),
];

const HospedajeList = ({ hospedajes }) => {
  const [filtro, setFiltro] = useState("Todos");
  const { colorMode } = useColorMode();
  const locations = getUniqueLocations(hospedajes);

  const hospedajesFiltrados =
    filtro === "Todos"
      ? hospedajes
      : hospedajes.filter((h) => h.location === filtro);

  const selectBg = colorMode === "dark" ? "bg-gray-800" : "bg-white";
  const selectText = colorMode === "dark" ? "text-gray-200" : "text-gray-700";
  const selectBorder = colorMode === "dark" ? "border-teal-600" : "border-teal-400";
  const selectRing = colorMode === "dark" ? "focus:ring-teal-600" : "focus:ring-teal-400";
  const labelText = colorMode === "dark" ? "text-gray-300" : "text-gray-700";

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-3 items-center">
        <label className={`font-medium ${labelText}`}>
          Filtrar por localidad:
        </label>
        <div className="relative">
          <select
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className={`rounded-xl border ${selectBorder} px-4 py-2 ${selectBg} ${selectText} ${selectRing} shadow-sm transition focus:outline-none`}
          >
            <option value="Todos">Todos</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          <span className={`pointer-events-none absolute right-8 top-1/2 -translate-y-1/2 ${colorMode === "dark" ? "text-teal-300" : "text-teal-400"}`}>
            ▼
          </span>
        </div>
      </div>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {hospedajesFiltrados.map((hospedaje, idx) => (
          <motion.div
            key={hospedaje.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="flex"
          >
            <HospedajeCard hospedaje={hospedaje} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

HospedajeList.displayName = "HospedajeList";
HospedajeList.propTypes = {
  hospedajes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      imgSrc: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      area: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default HospedajeList;
