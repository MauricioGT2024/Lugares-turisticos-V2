// components/Antofagasta/CategoryFilterButton.jsx
// Removed Chakra UI Button import
// import { Button } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const CategoryFilterButton = ({ item, selected, onClick }) => {
	return (
		<button
			onClick={onClick}
			aria-pressed={selected}
			// Using Tailwind CSS classes for styling
			className={`px-5 py-2 rounded-full font-medium text-sm shadow transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2
            ${selected
					? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md border border-transparent focus:ring-orange-500'
					: 'bg-gray-200 text-gray-700 border border-gray-300 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600 focus:ring-gray-500'
			}`}
		>
			{item}
		</button>
	);
};

CategoryFilterButton.propTypes = {
	item: PropTypes.string.isRequired,
	selected: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default CategoryFilterButton;
