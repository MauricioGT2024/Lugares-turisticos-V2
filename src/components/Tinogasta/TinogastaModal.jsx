// components/Tinogasta/TinogastaModal.jsx
import PropTypes from 'prop-types';
import { Box, Flex, Text, Image } from '@chakra-ui/react';
import CustomModal from '@/components/common/CustomModal';
import { getTinogastaTheme } from './tinogastaThemes';

const TinogastaModal = ({ location, onClose }) => {
	const config = getTinogastaTheme(location.category);

	return (
		<CustomModal
			isOpen={!!location}
			onClose={onClose}
			title={location.name}
			headerGradient={config.overlayGradient}
			footer={
				<Flex gap={3} flexWrap='wrap' justify='flex-end' w='100%' mt={2}>
					{location.path && (
						<Box
							as='a'
							href={location.path}
							target='_blank'
							rel='noopener noreferrer'
							px={6}
							py={2}
							borderRadius='full'
							bgGradient='linear(to-r, teal.500, amber.500)'
							color='white'
							fontWeight='semibold'
							shadow='md'
							_hover={{ transform: 'scale(1.05)', shadow: 'lg' }}
						>
							Ver en mapa
						</Box>
					)}
					{location.wiki && (
						<Box
							as='a'
							href={location.wiki}
							target='_blank'
							rel='noopener noreferrer'
							px={6}
							py={2}
							borderRadius='full'
							bgGradient='linear(to-r, emerald.500, cyan.500)'
							color='white'
							fontWeight='semibold'
							shadow='md'
							_hover={{ transform: 'scale(1.05)', shadow: 'lg' }}
						>
							Más información
						</Box>
					)}
				</Flex>
			}
			modalProps={{
				maxW: { base: '95vw', md: '600px', lg: '800px' },
				w: '100%',
			}}
		>
			<Box
				display='grid'
				gridTemplateColumns={{ base: '1fr', md: '1.2fr 1fr' }}
				gap={{ base: 0, md: 6 }}
				alignItems='flex-start'
				minH={{ base: 'auto', md: '400px' }}
			>
				{/* Imagen + descripción */}
				<Box>
					<Image
						src={location.imgSrc}
						alt={location.name}
						objectFit='cover'
						width='100%'
						height={{ base: '180px', md: '320px' }}
						maxH={{ base: '180px', md: '320px' }}
						borderRadius='lg'
					/>
					<Box px={{ base: 2, md: 0 }} py={3}>
						<Text fontSize='md' color='gray.600'>
							{location.description}
						</Text>
					</Box>
				</Box>

				{/* Mapa */}
				<Box
					p={{ base: 0, md: 4 }}
					display='flex'
					alignItems='center'
					justifyContent='center'
				>
					<Box
						as='iframe'
						src={location.iframe}
						title={location.name}
						loading='lazy'
						allowFullScreen
						width='100%'
						height={{ base: '180px', md: '240px' }}
						border='0'
						borderRadius='lg'
						style={{ background: '#fff' }}
					/>
				</Box>
			</Box>
		</CustomModal>
	);
};

TinogastaModal.propTypes = {
	location: PropTypes.object.isRequired,
	onClose: PropTypes.func.isRequired,
};

export default TinogastaModal;
