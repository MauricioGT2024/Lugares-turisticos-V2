import { useState, useMemo, useCallback } from 'react';
import {
	Box,
	Container,
	SimpleGrid,
	VStack,
	Heading,
	Text,
	useColorModeValue,
	Badge,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Button,
	Link,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInfoCircle } from 'react-icons/fa';
import { locations } from '../data/fiambala';
import LocationCard from '../components/Fiambala/LocationCard';
import { CATEGORY_CONFIG } from '../components/Fiambala/CategoryConfig';
import FilterGroup from '../components/FilterSystem/FilterGroup';
import { FIAMBALA_ANIMATIONS, filterAnimations } from '../components/Fiambala/config/animations';

const Fiambala = () => {
	// Estados y hooks
	const [categoryFilter, setCategoryFilter] = useState('');
	const [selectedLocationData, setSelectedLocationData] = useState(null);
	const { isOpen, onOpen, onClose } = useDisclosure();

	// Configuración de colores por tema
	const bgColor = useColorModeValue('gray.50', 'gray.900');
	const textColor = useColorModeValue('gray.600', 'gray.300');
	const modalBgColor = useColorModeValue('white', 'gray.800');
	const modalTextColor = useColorModeValue('gray.700', 'gray.200');

	// Obtener categorías disponibles
	const categories = Object.keys(CATEGORY_CONFIG);

	// Manejadores de eventos para el modal
	const handleShowDetails = useCallback((id) => {
		const location = locations.find((loc) => loc.id === id);
		if (location) {
			setSelectedLocationData(location);
			onOpen();
		}
	}, [onOpen]);

	const handleCloseModal = () => {
		onClose();
		setTimeout(() => setSelectedLocationData(null), 300);
	};

	// Filtrado de ubicaciones por categoría
	const filteredLocations = useMemo(
		() =>
			categoryFilter
				? locations.filter((loc) => loc.category === categoryFilter)
				: locations,
		[categoryFilter]
	);

	return (
		<Box
			as={motion.div}
			variants={FIAMBALA_ANIMATIONS.pageTransition}
			initial="initial"
			animate="animate"
			exit="exit"
			bg={bgColor}
			minH="100vh"
			py={12}
		>
			<Container maxW='8xl' px={{ base: 4, md: 8 }}>
				{/* Sección del encabezado */}
				<VStack spacing={8} align='center'>
					<motion.div
						variants={FIAMBALA_ANIMATIONS.container}
						initial="initial"
						animate="animate"
					>
						<VStack spacing={4} textAlign='center' mb={8}>
							<Badge
								colorScheme='yellow'
								px={6}
								py={2}
								borderRadius='full'
								fontSize='md'
								bg='yellow.400'
								color='white'
								textTransform="uppercase"
								letterSpacing="wider"
								boxShadow="sm"
							>
								Explora Fiambalá
							</Badge>
							<Heading
								as='h1'
								size='2xl'
								bgGradient='linear(to-r, yellow.400, orange.400, red.500)'
								bgClip='text'
								fontFamily='JetBrains Mono'
								letterSpacing='tight'
								mb={2}
								position='relative'
								sx={{
									'&::after': {
										content: '""',
										position: 'absolute',
										bottom: '-2px',
										left: '0',
										width: '100%',
										height: '2px',
										bgGradient: 'linear(to-r, yellow.400, orange.400, red.500)',
										transform: 'scaleX(0)',
										opacity: 0,
										transition:
											'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
										transformOrigin: 'left',
									},
									'&:hover::after': {
										transform: 'scaleX(1)',
										opacity: 1,
									},
								}}
							>
								Fiambalá
							</Heading>
							<Text
								fontSize='xl'
								color={textColor}
								maxW='3xl'
								mx='auto'
								fontStyle='italic'
								as={motion.p}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.3 }}
							>
								Donde el desierto se encuentra con las termas, creando un oasis
								de aventura y relax en el corazón de Catamarca
							</Text>
						</VStack>
					</motion.div>

					{/* Sistema de filtrado */}
					<FilterGroup
						title='Categorías'
						items={categories}
						selected={categoryFilter}
						onSelect={setCategoryFilter}
						colorScheme="yellow"
					/>

					{/* Grid de ubicaciones */}
					<SimpleGrid
						columns={{ base: 2, md: 3, lg: 3, xl: 4 }}
						spacing={8}
						as={motion.div}
						layout
					>
						<AnimatePresence mode="popLayout" initial={false}>
							{filteredLocations.map((loc) => (
								<motion.div
									key={loc.id}
									variants={filterAnimations}
									initial="hidden"
									animate="visible"
									exit="exit"
									layout
								>
									<LocationCard
										location={loc}
										onShowDetails={handleShowDetails}
									/>
								</motion.div>
							))}
						</AnimatePresence>
					</SimpleGrid>
				</VStack>
			</Container>

			{/* Modal de detalles */}
			<Modal
				isOpen={isOpen}
				onClose={handleCloseModal}
				size='xl'
				isCentered
				motionPreset='slideInBottom'
				scrollBehavior="inside"
			>
				<ModalOverlay bg='blackAlpha.700' backdropFilter='blur(5px)' />
				<ModalContent
					bg={modalBgColor}
					borderRadius='xl'
					overflow="hidden"
					mx={4}
				>
					<ModalHeader
						borderTopRadius='xl'
						bgGradient={
							selectedLocationData
								? (CATEGORY_CONFIG[selectedLocationData.category] || {})
										.gradient
								: 'linear(to-r, gray.400, gray.600)'
						}
						color='white'
						py={4}
						fontFamily='JetBrains Mono'
					>
						{selectedLocationData?.title || 'Detalles'}
					</ModalHeader>
					<ModalCloseButton
						color='white'
						_focus={{ boxShadow: 'none' }}
						_hover={{ bg: 'whiteAlpha.300' }}
					/>
					<ModalBody py={6}>
						{selectedLocationData && (
							<VStack spacing={4} align='stretch'>
								<Box borderRadius='lg' overflow='hidden' h='300px'>
									<iframe
										title={selectedLocationData.title}
										src={selectedLocationData.mapSrc}
										width='100%'
										height='100%'
										style={{ border: 0 }}
										loading='lazy'
									/>
								</Box>
								<Text fontSize='md' color={modalTextColor}>
									{selectedLocationData.description}
								</Text>
							</VStack>
						)}
					</ModalBody>
					<ModalFooter borderBottomRadius='xl' justifyContent='space-between'>
						<Box>
							{selectedLocationData?.path && (
								<Button
									as={Link}
									href={selectedLocationData.path}
									target='_blank'
									rel='noopener noreferrer'
									leftIcon={<FaInfoCircle />}
									colorScheme='teal'
									variant='outline'
									mr={3}
									size='sm'
								>
									Más Info
								</Button>
							)}
						</Box>
						<Button colorScheme='gray' onClick={handleCloseModal} size='sm'>
							Cerrar
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
};

export default Fiambala;
