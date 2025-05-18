import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { locations } from "@/data/tinogasta"; // Assuming locations are needed here to get unique categories

const CATEGORY_ALL = "Todos";

const TinogastaFilter = ({ filters, setFilters }) => {
  // Assuming filters is an object like { category: '...' }
  // Tinogasta's filter uses empty string for 'Todos', Catamarca uses 'all'. We need to adapt.
  const selectedCategory =
    filters.category === undefined ? "" : filters.category; // Default to '' for Todos

  const categories = useMemo(() => {
    const cats = locations.map((l) => l.category).filter(Boolean);
    return [CATEGORY_ALL, ...new Set(cats)];
  }, []);

  const handleCategoryChange = (cat) => {
    // Set the filter to empty string for 'Todos', otherwise use the category name
    setFilters((prev) => ({
      ...prev,
      category: cat === CATEGORY_ALL ? "" : cat,
    }));
  };

  return (
    <section
      aria-label="Filtro de categorías"
      className="mb-8 flex flex-wrap justify-center gap-3"
    >
      {categories.map((cat) => {
        const isSelected =
          selectedCategory === cat ||
          (selectedCategory === "" && cat === CATEGORY_ALL);
        return (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            // Apply Tailwind classes for styling, ensuring clear selected/unselected states
            className={`
  px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300 border
  ${
    isSelected
      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent shadow-md"
      : "bg-white/20  dark:bg-gray-800 dark:text-gray-300 "
  }
`}
          >
            {cat}
          </button>
        );
      })}
    </section>
  );
};

TinogastaFilter.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
};

export default TinogastaFilter;
