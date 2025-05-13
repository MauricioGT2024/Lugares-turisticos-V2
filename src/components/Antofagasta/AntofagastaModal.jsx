// components/Antofagasta/AntofagastaModal.jsx
// 1. React & Third-party
import PropTypes from 'prop-types';
// 2. Chakra UI
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalCloseButton,
	Box,
	IconButton,
	useColorMode,
} from '@chakra-ui/react';
// 3. Internal
import { motion } from 'framer-motion';
import { FaMapMarkedAlt, FaInfoCircle, FaTimes } from 'react-icons/fa';

const AntofagastaModal = ({ isOpen, onClose, location }) => {
	const { colorMode } = useColorMode();
	const isDark = colorMode === 'dark';

	if (!location) return null;

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			motionPreset='slideInBottom'
			size='2xl'
			isCentered
		>
			<ModalOverlay backdropFilter='blur(12px)' bg='blackAlpha.700' />
			<ModalContent
				as={motion.div}
				initial={{ scale: 0.95, opacity: 0, y: 40 }}
				animate={{ scale: 1, opacity: 1, y: 0 }}
				exit={{ scale: 0.95, opacity: 0, y: 40 }}
				transition={{ duration: 0.4, type: 'spring', bounce: 0.2 }}
				bg={isDark ? 'gray.900' : 'white'}
				borderRadius='2xl'
				boxShadow='2xl'
				mx={2}
				overflow='hidden'
				p={0}
			>
				{/* Imagen de cabecera */}
				<Box position='relative' w='100%' h='220px' overflow='hidden'>
					<motion.img
						src={location.imgSrc}
						alt={location.title}
						style={{ width: '100%', height: '100%', objectFit: 'cover' }}
						initial={{ scale: 1.08, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ duration: 0.6 }}
					/>
					<Box
						position='absolute'
						inset={0}
						bgGradient='linear(to-t, blackAlpha.800 60%, transparent)'
					/>
					<ModalHeader
						position='absolute'
						bottom={0}
						left={0}
						right={0}
						color='white'
						fontWeight='extrabold'
						fontSize='2xl'
						bgGradient='linear(to-r, orange.400, yellow.400, red.400)'
						bgClip='text'
						zIndex={2}
						py={4}
						px={6}
						textShadow='0 2px 8px rgba(0,0,0,0.28)'
					>
						{location.title}
					</ModalHeader>
					<ModalCloseButton
						color='white'
						top={3}
						right={3}
						bg='blackAlpha.400'
						_hover={{ bg: 'blackAlpha.600' }}
					/>
				</Box>

				{/* Contenido */}
				<Box
					display='grid'
					gridTemplateColumns={{ base: '1fr', md: '1fr 1fr' }}
				>
					<Box p={8} bg={isDark ? 'gray.900' : 'white'}>
						<Box
							as='h3'
							fontSize='xl'
							fontWeight='bold'
							mb={3}
							color={isDark ? 'orange.200' : 'orange.600'}
						>
							Descripción
						</Box>
						<Box
							as='p'
							color={isDark ? 'gray.200' : 'gray.700'}
							fontSize='md'
							lineHeight={1.7}
						>
							{location.description}
						</Box>
					</Box>

					<Box p={8} bg={isDark ? 'gray.950' : 'gray.50'}>
						{location.mapSrc && (
							<Box
								borderRadius='xl'
								overflow='hidden'
								w='100%'
								minH='220px'
								boxShadow='md'
							>
								<iframe
									src={location.mapSrc}
									title={location.title}
									style={{ width: '100%', height: 220, border: 0 }}
									loading='lazy'
									allowFullScreen
								/>
							</Box>
						)}
					</Box>
				</Box>

				{/* Footer */}
				<ModalFooter
					display='flex'
					gap={3}
					justifyContent='flex-end'
					bg={isDark ? 'gray.900' : 'white'}
					borderBottomRadius='2xl'
					borderTop='1px solid'
					borderColor={isDark ? 'gray.800' : 'gray.200'}
				>
					{location.mapUrl && (
						<IconButton
							as='a'
							href={location.mapUrl}
							target='_blank'
							rel='noopener noreferrer'
							aria-label='Ver en mapa'
							icon={<FaMapMarkedAlt />}
							colorScheme='orange'
							variant='solid'
							size='lg'
						/>
					)}
					{location.path && (
						<IconButton
							as='a'
							href={location.path}
							target='_blank'
							rel='noopener noreferrer'
							aria-label='Más información'
							icon={<FaInfoCircle />}
							colorScheme='yellow'
							variant='solid'
							size='lg'
						/>
					)}
					<IconButton
						onClick={onClose}
						aria-label='Cerrar'
						icon={<FaTimes />}
						colorScheme='red'
						variant='outline'
						size='lg'
					/>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
AntofagastaModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  location: PropTypes.shape({
    title: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    mapSrc: PropTypes.string,
    mapUrl: PropTypes.string,
    path: PropTypes.string,
  }).isRequired,
};

export default AntofagastaModal;
