import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { locations } from "@/data/fiambala"; // Assuming locations are needed here to get unique categories

const CATEGORY_ALL = "Todos";

const FiambalaFilter = ({ filters, setFilters }) => {
  // LocationPage passes filters as an object, e.g., { category: 'Termas' }
  // Fiambala's current filter logic uses empty string '' for 'Todos'.
  // We need to get the category from the filters object and default to '' if not set.
  const selectedCategory =
    filters.category === undefined ? "" : filters.category; // Default to '' for Todos

  const categories = useMemo(() => {
    // Get unique categories from locations data
    const cats = locations.map((l) => l.category).filter(Boolean);
    // Add 'Todos' as the first option
    return [CATEGORY_ALL, ...new Set(cats)];
  }, []);

  const handleCategoryChange = (cat) => {
    // Update the filters object. Set category to empty string for 'Todos', otherwise use the category name.
    setFilters((prev) => ({
      ...prev,
      category: cat === CATEGORY_ALL ? "" : cat,
    }));
  };

  return (
    <section
      aria-label="Filtro de categorías"
      className="mb-8 flex flex-wrap justify-center gap-3  "
    >
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => handleCategoryChange(cat)}
          // Apply Tailwind classes for styling, including selected state
          className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
            // Check if this button's category matches the selected category OR
            // if the selected category is '' (Todos) and this is the 'Todos' button.
            selectedCategory === cat ||
            (selectedCategory === "" && cat === CATEGORY_ALL)
              ? "bg-gradient-to-r from-purple-500 to-pink-500 bg-gray-600 dark:bg-gray-900 "
              : " bg-white/20 dark:text-gray-300 bg-gradient-to-  to-red-400"
          }`}
        >
          {cat}
        </button>
      ))}
    </section>
  );
};

FiambalaFilter.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
};

export default FiambalaFilter;
