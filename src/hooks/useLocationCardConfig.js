// src/hooks/useLocationCardConfig.js
import React from 'react';
import { useColorModeValue } from '@chakra-ui/react';

export const useLocationCardConfig = (icon) => {
	const badgeBg = useColorModeValue('teal.500', 'teal.300');
	const gradient = useColorModeValue(
		'linear-gradient(135deg, rgba(32, 201, 151, 0.85) 0%, rgba(66, 153, 225, 0.85) 100%)',
		'linear-gradient(135deg, rgba(56, 189, 248, 0.85) 0%, rgba(16, 185, 129, 0.85) 100%)'
	);

	const MemoizedIcon = icon ? React.memo(icon) : null;

	return { badgeBg, gradient, MemoizedIcon };
};
