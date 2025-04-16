import { useState, useMemo, useCallback } from "react";
import {
	useColorMode,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	ModalCloseButton,
	useDisclosure,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { FaInfoCircle } from "react-icons/fa";
import { locations } from "../data/fiambala";
import { CATEGORY_CONFIG } from "../components/Fiambala/components";
import { ImageHoverCard } from "../components/Fiambala/components";

const Fiambala = () => {
	const [categoryFilter, setCategoryFilter] = useState("");
	const [selectedLocationData, setSelectedLocationData] = useState(null);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { colorMode } = useColorMode()

	const categories = Object.keys(CATEGORY_CONFIG);

	const handleShowDetails = useCallback(
		(location) => {
			setSelectedLocationData(location);
			onOpen();
		},
		[onOpen]
	);

	const handleCloseModal = () => {
		onClose();
		setTimeout(() => setSelectedLocationData(null), 300);
	};

	const filteredLocations = useMemo(
		() =>
			categoryFilter
				? locations.filter((loc) => loc.category === categoryFilter)
				: locations,
		[categoryFilter]
	);

	return (
		<div
			className={`min-h-screen py-12 ${
				colorMode === "dark" ? "bg-gray-900" : "bg-gray-50"
			}`}
		>
			<div className="container mx-auto px-4 md:px-8 max-w-7xl">
				{/* Header Section */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="text-center space-y-8 mb-16"
				>
					<span className="inline-block px-4 py-1 rounded-full text-sm font-medium bg-yellow-400 text-white">
						Explora Fiambalá
					</span>

					<h1 className="text-4xl md:text-6xl font-bold font-['JetBrains_Mono'] bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 bg-clip-text text-transparent">
						Fiambalá
					</h1>

					<p
						className={`text-xl max-w-3xl mx-auto italic ${
							colorMode === "dark" ? "text-gray-300" : "text-gray-600"
						}`}
					>
						Donde el desierto se encuentra con las termas, creando un oasis de
						aventura y relax en el corazón de Catamarca
					</p>
				</motion.div>

				{/* Seccion De Filtros */}

				{/* Nueva Seccion De Filtros */}
				<div className="mb-12">
					<h2 className="text-2xl font-semibold mb-4">Filter by Category</h2>
					<div className="flex flex-wrap gap-2">
						<button
								key="all"
								className={`px-4 py-2 rounded-full text-sm font-medium shadow-sm ${
									categoryFilter === ""
										? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white hover:from-yellow-600 hover:to-yellow-700"
										: colorMode === "dark"
											? "bg-gray-800 text-gray-300 hover:bg-gray-700"
											: "bg-gray-100 text-gray-700 hover:bg-gray-300"
								} transition-all duration-200 hover:scale-105`}
								onClick={() => setCategoryFilter("")}
							>
								Todos
							</button>
						{categories.map((category) => (
							<button
								key={category}
								className={`px-4 py-2 rounded-full text-sm font-medium shadow-sm ${
									categoryFilter === category
										? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white hover:from-yellow-600 hover:to-yellow-700"
										: colorMode === "dark"
											? "bg-gray-800 text-gray-300 hover:bg-gray-700"
											: "bg-gray-100 text-gray-700 hover:bg-gray-300"
								} transition-all duration-200 hover:scale-105`}
								onClick={() => setCategoryFilter(category)}
							>
								{CATEGORY_CONFIG[category]?.label || category}
							</button>
						))}
					</div>
				</div>

				{/* Grid de Locations */}
				<motion.div
					layout
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
				>
					<AnimatePresence mode="popLayout">
						{filteredLocations.map((loc) => (
							<motion.div
								key={loc.id}
								layout
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.8 }}
								transition={{ duration: 0.3 }}
							>
								<ImageHoverCard
									location={loc}
									onShowDetails={handleShowDetails}
								/>
							</motion.div>
						))}
					</AnimatePresence>
				</motion.div>
			</div>

			{/* Modal de Detalles */}
			<Modal
				isOpen={isOpen}
				onClose={handleCloseModal}
				size="xl"
				isCentered
				motionPreset="slideInBottom"
			>
				<ModalOverlay bg="blackAlpha.700" backdropFilter="blur(5px)" />
				<ModalContent
					bg={colorMode === "dark" ? "gray.800" : "white"}
					className="rounded-xl overflow-hidden shadow-2xl"
				>
					{selectedLocationData && (
						<>
							<ModalHeader
								className={`p-4 ${
									CATEGORY_CONFIG[selectedLocationData.category]?.bgClass ||
									"bg-gray-600"
								} text-white`}
							>
								<h2 className="text-xl font-bold font-['JetBrains_Mono']">
									{selectedLocationData.title}
								</h2>
							</ModalHeader>
							<ModalCloseButton className="text-white hover:bg-white/20" />

							<ModalBody className="p-6 space-y-6">
								<div className="h-[300px] rounded-lg overflow-hidden shadow-lg">
									<iframe
										title={selectedLocationData.title}
										src={selectedLocationData.mapSrc}
										className="w-full h-full border-0"
										loading="lazy"
									/>
								</div>

								<p
									className={`text-lg ${
										colorMode === "dark" ? "text-gray-200" : "text-gray-700"
									}`}
								>
									{selectedLocationData.description}
								</p>
							</ModalBody>

							<ModalFooter className="space-x-3">
								{selectedLocationData.path && (
									<a
										href={selectedLocationData.path}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border border-teal-500 text-teal-500 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors"
									>
										<FaInfoCircle className="mr-2" />
										Más Info
									</a>
								)}

								<button
									onClick={handleCloseModal}
									className={`px-4 py-2 text-sm font-medium rounded-lg ${
										colorMode === "dark"
											? "bg-gray-700 hover:bg-gray-600"
											: "bg-gray-200 hover:bg-gray-300"
									} transition-colors`}
								>
									Cerrar
								</button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</div>
	);
};

export default Fiambala;
