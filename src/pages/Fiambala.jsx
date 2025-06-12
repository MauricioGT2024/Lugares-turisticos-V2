import { useMemo, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { locations } from "../data/fiambala";
import FiambalaHero from "../components/Fiambala/FiambalaHero";
import FiambalaGrid from "../components/Fiambala/FiambalaGrid";
import FiambalaModal from "../components/Fiambala/FiambalaModal";
import FiambalaFilter from "../components/Fiambala/FiambalaFilter";

const Fiambala = () => {
  const [category, setCategory] = useState("Todos");
  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, data: null });

  const { colorMode } = useTheme();
  const isDark = colorMode === "dark";

  const categories = useMemo(
    () => [...new Set(locations.map(loc => loc.category))].sort(),
    []
  );

  const filtered = useMemo(
    () => (category === "Todos" ? locations : locations.filter(loc => loc.category === category)),
    [category]
  );

  const openModal = (id) => {
    const loc = locations.find(l => l.id === id);
    if (loc) {
      setSelected(loc);
      setIsOpen(true);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => setSelected(null), 300);
  };

  return (
    <main className={`min-h-screen py-12 ${isDark ? "bg-white" : " dark:bg-gray-900"} transition-colors`}>
      <div className="container mx-auto max-w-7xl px-4 md:px-8 space-y-10">
        <FiambalaHero
          badge="Explora Fiambalá"
          title="Fiambalá"
          subtitle="Donde el desierto se encuentra con las termas..."
          isDark={isDark}
        />
        <FiambalaFilter
          title="Categorías"
          items={categories}
          selected={category}
          onSelect={setCategory}
        />
        <FiambalaGrid
          locations={filtered}
          onLocationClick={openModal}
        />
      </div>
      {selected && (
  <FiambalaModal
    isOpen={isOpen}
    onClose={closeModal}
    location={selected}
    isDark={isDark}

  />
)}
    </main>
  );
};

export default Fiambala;
