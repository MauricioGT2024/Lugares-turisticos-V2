// components/Tinogasta/tinogastaThemes.js

export const getTinogastaTheme = (category) => {
	switch (category) {
		case 'Termas':
			return {
				overlayGradient: 'linear(to top, #6b46c1AA, transparent)',
				badgeBg: 'purple.600',
			};
		case 'Montañas':
			return {
				overlayGradient: 'linear(to top, #2D3748AA, transparent)',
				badgeBg: 'gray.700',
			};
		case 'Vinos':
			return {
				overlayGradient: 'linear(to top, #B83280AA, transparent)',
				badgeBg: 'pink.600',
			};
		case 'Naturaleza':
			return {
				overlayGradient: 'linear(to top, #38A169AA, transparent)',
				badgeBg: 'green.500',
			};
		case 'Histórico':
			return {
				overlayGradient: 'linear(to top, #DD6B20AA, transparent)',
				badgeBg: 'orange.500',
			};
		default:
			return {
				overlayGradient: 'linear(to top, #4A5568AA, transparent)',
				badgeBg: 'gray.500',
			};
	}
};
