import { useTheme } from "../context/ThemeContext";
import { locations } from "../data/fiambala";
import FiambalaHero from "../components/Fiambala/FiambalaHero";
import FiambalaGrid from "../components/Fiambala/FiambalaGrid";
import FiambalaModal from "../components/Fiambala/FiambalaModal";
import FiambalaFilter from "../components/Fiambala/FiambalaFilter";
import { pageStyles } from "../styles/pageStyles";
import { useMemo, useState } from "react";


const Fiambala = () => {
  const [categoryFilter, setCategoryFilter] = useState("Todos");
  const [selectedLocationData, setSelectedLocationData] = useState(null);
  const { colorMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const isDark = colorMode === "dark";

  // Obtener categorías únicas
  const categories = useMemo(() => {
    return [...new Set(locations.map(loc => loc.category))].sort();
  }, []);

  // Filtrar ubicaciones según la categoría seleccionada
  const filteredLocations = useMemo(() => {
    return categoryFilter === "Todos"
      ? locations
      : locations.filter(loc => loc.category === categoryFilter);
  }, [categoryFilter]);

  // Manejadores de eventos
  const handleLocationClick = (id) => {
    const location = locations.find(loc => loc.id === id);
    if (location) {
      setSelectedLocationData(location);
      setIsOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setTimeout(() => setSelectedLocationData(null), 300);
  };

  const styles = {
    mainBg: 'bg-white dark:bg-gray-900',
    textColor: 'text-gray-900 dark:text-gray-100',
    sectionBg: 'bg-gray-50 dark:bg-gray-800'
  };

  return (
    <main className={`min-h-screen py-12 ${styles.mainBg} transition-colors duration-300`}>
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="space-y-10">
          <FiambalaHero
            badge="Explora Fiambalá"
            title="Fiambalá"
            subtitle="Donde el desierto se encuentra con las termas, creando un oasis de aventura y relax en el corazón de Catamarca."
            isDark={isDark}
          />

          <FiambalaFilter
            title="Categorías"
            items={categories}
            selected={categoryFilter}
            onSelect={setCategoryFilter}
          />

          <FiambalaGrid
            locations={filteredLocations}
            onLocationClick={handleLocationClick}
          />
        </div>
      </div>

      <FiambalaModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        location={selectedLocationData}
        isDark={isDark}
        gradient={pageStyles.fiambala.modal.gradient}
      />
    </main>
  );
};

export default Fiambala;
