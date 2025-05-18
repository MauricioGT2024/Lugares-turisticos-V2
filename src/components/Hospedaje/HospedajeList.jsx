import { useState, useMemo } from "react";
import HospedajeCard from "./HospedajeCard";
import HospedajeModal from "./HospedajeModal"; // Import the new modal component
import { motion, AnimatePresence } from "framer-motion"; // Ensure AnimatePresence is imported
import PropTypes from "prop-types";

const getUniqueLocations = (hospedajes) => [
  ...new Set(hospedajes.map((h) => h.location)),
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const HospedajeList = ({ hospedajes }) => {
  const [filtro, setFiltro] = useState("Todos");
  // Using location for filtering as per data structure
  const locations = useMemo(() => getUniqueLocations(hospedajes), [hospedajes]);

  const [selectedHospedaje, setSelectedHospedaje] = useState(null); // State for selected hospedaje for modal
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const hospedajesFiltrados = useMemo(
    () =>
      filtro === "Todos"
        ? hospedajes
        : hospedajes.filter((h) => h.location === filtro),
    [filtro, hospedajes]
  );

  const handleCardClick = (hospedaje) => {
    setSelectedHospedaje(hospedaje);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedHospedaje(null);
    setIsModalOpen(false);
  };

  return (
    <section>
      {/* Filter UI */}
      <div className="mb-8 flex flex-wrap gap-4 items-center justify-center md:justify-start">
        <label className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Filtrar por localidad:
        </label>
        <div className="relative">
          <select
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            aria-label="Seleccionar localidad"
            className={`rounded-xl border border-gray-300 bg-white dark:bg-gray-900 dark:text-white px-4 py-2 text-sm shadow-sm transition focus:outline-none`}
          >
            <option value="Todos">Todos</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Hospedaje List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <AnimatePresence>
          {" "}
          {/* Use AnimatePresence for exit animations if needed for filtering */}
          {hospedajesFiltrados.map((hospedaje) => (
            <motion.div
              key={hospedaje.id}
              variants={itemVariants}
              layout // Added layout for layout animations during filtering
              className="flex"
            >
              {/* Pass onClick handler to HospedajeCard */}
              <HospedajeCard
                hospedaje={hospedaje}
                onClick={() => handleCardClick(hospedaje)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Hospedaje Modal */}
      <HospedajeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        hospedaje={selectedHospedaje}
      />
    </section>
  );
};

HospedajeList.displayName = "HospedajeList";
HospedajeList.propTypes = {
  hospedajes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      // Use 'image' based on hospedaje data structure
      image: PropTypes.string.isRequired,
      // Use 'title' based on hospedaje data structure
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      // Use 'location' based on hospedaje data structure
      location: PropTypes.string.isRequired,
      // Ensure other props used by HospedajeCard are included
      alt: PropTypes.string.isRequired,
      mapUrl: PropTypes.string.isRequired,
      precioARS: PropTypes.string.isRequired,
    })
  ).isRequired,
};
export default HospedajeList;
