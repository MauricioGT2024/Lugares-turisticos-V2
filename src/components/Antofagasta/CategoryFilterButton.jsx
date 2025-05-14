import { Button } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const CategoryFilterButton = ({ item, selected, onClick }) => {
	return (
		<Button
			onClick={onClick}
			aria-pressed={selected}
			variant={selected ? 'solid' : 'outline'}
			colorScheme={selected ? 'orange' : 'gray'}
			px={5}
			py={2}
			borderRadius='full'
			fontWeight='medium'
			fontSize='sm'
			boxShadow={selected ? 'md' : 'sm'}
			transition='transform 0.2s ease'
			_hover={{
				transform: 'scale(1.05)',
			}}
			_focus={{
				boxShadow: 'outline',
			}}
		>
			{item}
		</Button>
	);
};

CategoryFilterButton.propTypes = {
	item: PropTypes.string.isRequired,
	selected: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default CategoryFilterButton;
