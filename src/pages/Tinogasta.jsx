import { useState, useMemo } from 'react';
import {
	Box,
	Container,
	Heading,
	Text,
	useColorModeValue,
	SimpleGrid,
	VStack,
	Badge,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { locations } from '../data/tinogasta';
import LocationCard from '../components/Tinogasta/LocationCard';
import { TINOGASTA_ANIMATIONS, filterAnimations } from '../components/Tinogasta/config/animations';
import AreaFilter from '../components/Tinogasta/AreaFilter';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	ModalFooter,
	useDisclosure,
	Image,
	HStack,
	IconButton,
	Tooltip,
	Button,
} from '@chakra-ui/react';
import { FaMapMarkerAlt, FaWikipediaW } from 'react-icons/fa';

const Tinogasta = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [selectedLocation, setSelectedLocation] = useState(null);
	const [areaFilter, setAreaFilter] = useState('');
	const bgColor = useColorModeValue('gray.50', 'gray.900');
	const textColor = useColorModeValue('gray.800', 'gray.100');
	const modalBgColor = useColorModeValue('gray.50', 'gray.800');

	const handleShowDetails = (locationId) => {
		const location = locations.find((loc) => loc.id === locationId);
		if (location) {
			setSelectedLocation(location);
			onOpen();
		}
	};

	const handleCloseModal = () => {
		onClose();
		setTimeout(() => setSelectedLocation(null), 200);
	};

	const filteredLocations = useMemo(
		() =>
			areaFilter
				? locations.filter((loc) => loc.category === areaFilter)
				: locations,
		[areaFilter]
	);

	return (
		<Box
			as={motion.div}
			variants={TINOGASTA_ANIMATIONS.pageVariants}
			initial="initial"
			animate="animate"
			exit="exit"
			bg={bgColor}
			minH="100vh"
			py={12}
		>
			<Container maxW="8xl" px={{ base: 4, md: 8 }}>
				<VStack spacing={8} align="center">
					<motion.div
						initial={{ opacity: 0, y: -50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.8,
							type: 'spring',
							bounce: 0.4,
						}}
					>
						<VStack spacing={6} textAlign="center" mb={8}>
							<Badge
								colorScheme="purple"
								px={6}
								py={2}
								borderRadius="full"
								fontSize="md"
								textTransform="uppercase"
								letterSpacing="wider"
								boxShadow="lg"
							>
								Explora Tinogasta
							</Badge>
							<Heading
								as="h1"
								size="2xl"
								bgGradient="linear(to-r, purple.400, red.400, orange.400)"
								bgClip="text"
								fontFamily="JetBrains Mono"
								letterSpacing="tight"
								mb={2}
								_hover={{
									bgGradient: 'linear(to-r, red.400, orange.400, purple.400)',
								}}
								transition="all 0.3s ease"
							>
								Tinogasta
							</Heading>
							<Text fontSize="xl" color={textColor} maxW="3xl" mx="auto">
								Descubre Tinogasta, una joya en el oeste de Catamarca, donde la
								tradición vitivinícola se une con paisajes impresionantes y una
								rica historia cultural.
							</Text>
						</VStack>
					</motion.div>

					<AreaFilter
						areaFilter={areaFilter}
						setAreaFilter={setAreaFilter}
						variants={TINOGASTA_ANIMATIONS.filterVariants}
					/>

					<SimpleGrid
						columns={{ base: 1, md: 2, lg: 3 }}
						spacing={8}
						w="full"
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
										onShowDetails={() => handleShowDetails(loc.id)}
									/>
								</motion.div>
							))}
						</AnimatePresence>
					</SimpleGrid>
				</VStack>
			</Container>

			<Modal
				isOpen={isOpen}
				onClose={handleCloseModal}
				size="xl"
				isCentered
				isExternal
				motionPreset="slideInBottom"
			>
				<ModalOverlay bg="blackAlpha.700" backdropFilter="blur(8px)" />
				<ModalContent bg={modalBgColor} color={textColor}>
					{selectedLocation && (
						<>
							<ModalHeader>{selectedLocation.name}</ModalHeader>
							<ModalCloseButton />
							<ModalBody>
								<Image
									src={selectedLocation.imgSrc}
									alt={selectedLocation.name}
									borderRadius="md"
									mb={2}
									aria-label={selectedLocation.name}
									transition="0.3s ease-in-out"
								/>
								<Text mb={4}>{selectedLocation.description}</Text>
								<Box borderRadius="md" overflow="hidden">
									<iframe
										src={selectedLocation.iframe}
										width="100%"
										height="300px"
										style={{ border: 0 }}
										allowFullScreen
										title={selectedLocation.name}
									/>
								</Box>
							</ModalBody>
							<ModalFooter>
								<HStack spacing={4}>
									<Tooltip label="Ver en Wikipedia">
										<IconButton
											as="a"
											href={selectedLocation.wiki}
											isExternal
											icon={<FaWikipediaW />}
											aria-label="Wikipedia"
											colorScheme="gray"
										/>
									</Tooltip>
									<Tooltip label="Ver en Google Maps">
										<IconButton
											as="a"
											href={selectedLocation.mapUrl}
											isExternal
											icon={<FaMapMarkerAlt />}
											aria-label="Google Maps"
											colorScheme="blue"
										/>
									</Tooltip>
									<Button colorScheme="red" onClick={handleCloseModal}>
										Cerrar
									</Button>
								</HStack>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</Box>
	);
};

export default Tinogasta;
