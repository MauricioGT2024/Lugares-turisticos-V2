import { useState } from "react";

const AntofagastaFilter = ({ title, items, selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="mb-6 flex justify-center lg:justify-start">
      <div className="w-full max-w-xs">
        <h2 className="text-xl font-semibold mb-2 text-center lg:text-left">{title}</h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md flex justify-between items-center"
          aria-expanded={isOpen}
          aria-controls="category-list"
        >
          {selected}
          <span className="ml-2">{isOpen ? '▲' : '▼'}</span>
        </button>

        {isOpen && (
          <ul
            id="category-list"
            className="mt-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg overflow-hidden"
          >
            {items.map((item) => (
              <li
                onClick={() => {
                  onSelect(item);
                  setIsOpen(false);
                }}
                className={`cursor-pointer px-4 py-2 hover:bg-blue-100 dark:hover:bg-blue-900 ${
                  item === selected ? 'bg-blue-200 dark:bg-blue-700 font-semibold' : ''
                }`}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onSelect(item);
                    setIsOpen(false);
                  }
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default AntofagastaFilter;