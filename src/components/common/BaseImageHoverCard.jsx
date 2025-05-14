// src/components/common/BaseImageHoverCard.jsx
import PropTypes from 'prop-types';
import { Box, Badge, Text, Image, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const BaseImageHoverCard = ({
	imgSrc,
	title,
	description,
	badge,
	onClick,
	styleConfig,
}) => {
	const overlayGradient =
		styleConfig?.overlayGradient || 'linear(to-t, blackAlpha.700, transparent)';
	const badgeBg =
		styleConfig?.badgeBg || useColorModeValue('teal.500', 'teal.300');
	const height = styleConfig?.height || '300px';

	return (
		<MotionBox
			whileHover={{
				y: -10,
				scale: 1.02,
				boxShadow: '0 12px 28px rgba(0,0,0,0.2)',
			}}
			whileTap={{ scale: 0.97 }}
			onClick={onClick}
			cursor='pointer'
			position='relative'
			overflow='hidden'
			borderRadius='xl'
			height={height}
			role='group'
			transition='all 0.3s ease'
		>
			{/* Imagen */}
			<Image
				src={imgSrc}
				alt={title}
				objectFit='cover'
				width='100%'
				height='100%'
				filter='brightness(0.95) saturate(1.05)'
				borderRadius='xl'
			/>

			{/* Gradiente superpuesto */}
			<Box
				position='absolute'
				inset='0'
				bgGradient={overlayGradient}
				opacity={0.7}
				zIndex={1}
			/>

			{/* Badge */}
			{badge && (
				<Badge
					position='absolute'
					top={4}
					left={4}
					px={4}
					py={1}
					borderRadius='full'
					bg={badgeBg}
					color='white'
					fontSize='sm'
					display='flex'
					alignItems='center'
					gap={2}
					zIndex={2}
				>
					{badge}
				</Badge>
			)}

			{/* Texto */}
			<Box
				position='absolute'
				bottom={0}
				left={0}
				right={0}
				p={4}
				zIndex={2}
				bg='blackAlpha.600'
				color='white'
				textAlign='left'
				transition='all 0.3s'
			>
				<Text fontSize='lg' fontWeight='bold'>
					{title}
				</Text>
				<Text fontSize='sm' noOfLines={2} opacity={0.85}>
					{description}
				</Text>
			</Box>
		</MotionBox>
	);
};

BaseImageHoverCard.propTypes = {
	imgSrc: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string,
	badge: PropTypes.string,
	icon: PropTypes.elementType,
	onClick: PropTypes.func,
	variant: PropTypes.string,
	styleConfig: PropTypes.object,
};

export default BaseImageHoverCard;
