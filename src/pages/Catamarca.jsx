import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaInfoCircle } from "react-icons/fa";
import { locations } from "../data/catamarca";
import {
	ANIMATIONS,
	AreaFilter as CatamarcaAreaFilter,
	LocationCard,
	getAreaTheme,
} from "../components/Catamarca";
import LocationPage from "../components/UI/LocationPage";
import {
	IconButton,
	ModalHeader,
	ModalBody,
	ModalFooter,
	useColorMode,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import ModalContent from "../components/UI/ModalContent";

const CatamarcaModalHeader = ({ location }) => {
	return (
		<ModalHeader
			className={`bg-gradient-to-r ${
				getAreaTheme(location.area).gradient
			} text-white`}
		>
			{location.title}
		</ModalHeader>
	);
};

CatamarcaModalHeader.propTypes = {
	location: PropTypes.shape({
		title: PropTypes.string.isRequired,
		area: PropTypes.string.isRequired,
	}).isRequired,
};

const CatamarcaModalBody = ({ location }) => {
	const { isDark } = useColorMode();
	return (
		<ModalBody py={6}>
			<div className="rounded-lg overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 mb-4">
				<iframe
					title={location.title}
					src={location.mapSrc}
					className="w-full h-[300px]"
					loading="lazy"
					allowFullScreen
				/>
			</div>
			<p className={isDark === "dark"}>{location.description}</p>
		</ModalBody>
	);
};

CatamarcaModalBody.propTypes = {
	location: PropTypes.shape({
		title: PropTypes.string.isRequired,
		mapSrc: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
	}).isRequired,
};

const CatamarcaModalFooter = ({ location }) => (
	<ModalFooter gap={2}>
		{location.path && (
			<IconButton
				as="a"
				href={location.path}
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Ver en mapa"
				icon={<FaMapMarkerAlt />}
				colorScheme="blue"
				variant="ghost"
			/>
		)}
		{location.wiki && (
			<IconButton
				as="a"
				href={location.wiki}
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Más información"
				icon={<FaInfoCircle />}
				colorScheme="teal"
				variant="ghost"
			/>
		)}
	</ModalFooter>
);

CatamarcaModalFooter.propTypes = {
	location: PropTypes.shape({
		path: PropTypes.string,
		wiki: PropTypes.string,
	}).isRequired,
};

const CatamarcaAreaFilterComponent = ({ filters, setFilters }) => {
	const areas = React.useMemo(() => {
		return [...new Set(locations.map((loc) => loc.area))].sort();
	}, []);

	const selectedArea = filters.area || "all";

	const setSelectedArea = (area) => {
		setFilters({ ...filters, area });
	};

	return (
		<motion.div
			variants={ANIMATIONS.container}
			className="flex flex-wrap justify-center gap-4 py-4"
		>
			<CatamarcaAreaFilter
				area="Todos"
				isSelected={selectedArea === "all"}
				onClick={() => setSelectedArea("all")}
			/>
			{areas.map((area) => (
				<CatamarcaAreaFilter
					key={area}
					area={area}
					isSelected={selectedArea === area}
					onClick={() => setSelectedArea(area)}
				/>
			))}
		</motion.div>
	);
};

CatamarcaAreaFilterComponent.propTypes = {
	filters: PropTypes.shape({
		area: PropTypes.string,
	}).isRequired,
	setFilters: PropTypes.func.isRequired,
};

const filterCatamarcaLocations = (locations, filters) => {
	const selectedArea = filters.area || "all";
	return selectedArea === "all"
		? locations
		: locations.filter((loc) => loc.area === selectedArea);
};

const Catamarca = () => {
	return (
		<LocationPage
			title="San Fernando del Valle"
			locations={locations}
			filterComponent={CatamarcaAreaFilterComponent}
			locationCardComponent={LocationCard}
			modalContent={({ location, onClose }) => (
				<ModalContent
					header={<CatamarcaModalHeader location={location} />}
					body={<CatamarcaModalBody location={location} />}
					footer={
						<CatamarcaModalFooter location={location} onClose={onClose} />
					}
				/>
			)}
			pageVariants={ANIMATIONS.fadeInDown}
			filterFunction={filterCatamarcaLocations}
		/>
	);
};

export default React.memo(Catamarca);
