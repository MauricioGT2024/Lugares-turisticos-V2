import { useState, useMemo, useCallback } from "react";
import { useTheme } from "../context/ThemeContext";
import { LayoutGroup, motion } from "framer-motion";
import { locations } from "../data/fiambala";
import FiambalaHero from "../components/Fiambala/FiambalaHero";
import FiambalaGrid from "../components/Fiambala/FiambalaGrid";
import FiambalaModal from "../components/Fiambala/FiambalaModal";
import FiambalaFilter from "../components/Fiambala/FiambalaFilter";
import React from "react";

const Fiambala = () => {
  const { colorMode } = useTheme();
  const isDark = colorMode === "dark";

  const [category, setCategory] = useState("Todos");
  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const categories = useMemo(
    () => ["Todos", ...new Set(locations.map(({ category }) => category))].sort(),
    []
  );

  const filtered = useMemo(() => {
    return category === "Todos"
      ? locations
      : locations.filter(({ category: c }) => c === category);
  }, [category, locations]);

  const openModal = useCallback((id) => {
    const loc = locations.find(({ id: locId }) => locId === id);
    if (loc) {
      setSelected(loc);
      setIsOpen(true);
    }
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => setSelected(null), 300);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.5,
      },
    },
  };

  return (
    <LayoutGroup>
      <main className="min-h-screen py-12 transition-colors duration-300 dark:bg-linear-to-b dark:from-gray-900 dark:to-gray-800 bg-linear-to-b from-gray-50 to-white">
        <motion.div
          className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="space-y-12 md:space-y-16">
            <FiambalaHero
              badge="Explora Fiambalá"
              title="Fiambalá"
              subtitle="Donde el desierto se encuentra con las termas y la aventura te espera en cada rincón."
              isDark={isDark}
            />
            <div aria-live="polite" className="sr-only">
              {category === "Todos"
                ? "Mostrando todas las categorías"
                : `Categoría seleccionada: ${category}`}
            </div>
            <FiambalaFilter
              title="Explora por Categoría"
              items={categories}
              selected={category}
              onSelect={setCategory}
              isDark={isDark}
            />
            <FiambalaGrid locations={filtered} onLocationClick={openModal} />
          </div>
        </motion.div>

        {selected && (
          <FiambalaModal
            isOpen={isOpen}
            onClose={closeModal}
            location={selected}
            isDark={isDark}
          />
        )}
      </main>
    </LayoutGroup>
  );
};

export default React.memo(Fiambala);
