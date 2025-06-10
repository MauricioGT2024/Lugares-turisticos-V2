import PropTypes from 'prop-types';

export const Filter = ({ title, items, selected, onSelect }) => {
  const buttonStyles = selected => `
    rounded-lg px-4 py-2 text-sm font-medium transition-colors
    ${selected ? 
      'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 
      'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-slate-800 dark:text-gray-200 dark:hover:bg-slate-700'
    }
  `;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={item}
            onClick={() => onSelect(item)}
            className={buttonStyles(selected === item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

Filter.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};


export default Filter;