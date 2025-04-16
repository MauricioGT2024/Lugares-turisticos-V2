import { useCallback } from "react";
import { locations } from "../data/tinogasta";
import { LocationCard, AreaFilter } from "../components/Tinogasta/components";
import { TINOGASTA_ANIMATIONS } from "../components/Tinogasta/config";
import LocationPage from "../components/UI/LocationPage";
import {
	ModalBody,
	ModalFooter,
	ModalHeader,
	useColorMode,
	IconButton,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { FaMapMarkerAlt, FaWikipediaW, FaTimes } from "react-icons/fa";
import ModalContent from "../components/UI/ModalContent";

const TinogastaModalHeader = ({ location }) => (
	<ModalHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
		<h2 className="text-xl font-bold">{location.name}</h2>
	</ModalHeader>
);

TinogastaModalHeader.propTypes = {
	location: PropTypes.shape({
		name: PropTypes.string.isRequired,
		area: PropTypes.string.isRequired,
	}).isRequired,
};

const TinogastaModalBody = ({ location }) => {
	const { colorMode } = useColorMode();
	return (
		<ModalBody className="p-6 space-y-6">
			<img
				src={location.imgSrc}
				alt={location.name}
				className="w-full h-64 object-cover rounded-lg shadow-lg"
			/>
			<p
				className={`text-lg ${
					colorMode === "dark" ? "text-gray-200" : "text-gray-700"
				}`}
			>
				{location.description}
			</p>
			<div className="rounded-lg overflow-hidden shadow-lg">
				<iframe
					src={location.iframe}
					className="w-full h-[300px] border-0"
					allowFullScreen
					title={location.name}
				/>
			</div>
		</ModalBody>
	);
};

TinogastaModalBody.propTypes = {
	location: PropTypes.shape({
		name: PropTypes.string.isRequired,
		imgSrc: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		iframe: PropTypes.string.isRequired,
	}).isRequired,
};

const TinogastaModalFooter = ({ location, onClose }) => (
	<ModalFooter className="space-x-3">
		{location.wiki && (
			<IconButton
				as="a"
				href={location.wiki}
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Ver en Wikipedia"
				icon={<FaWikipediaW />}
				colorScheme="purple"
				variant="ghost"
			/>
		)}
		{location.mapUrl && (
			<IconButton
				as="a"
				href={location.mapUrl}
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Ver en Google Maps"
				icon={<FaMapMarkerAlt />}
				colorScheme="blue"
				variant="ghost"
			/>
		)}
		<IconButton
			onClick={onClose}
			aria-label="Cerrar"
			icon={<FaTimes />}
			colorScheme="red"
			variant="ghost"
		/>
	</ModalFooter>
);

TinogastaModalFooter.propTypes = {
	location: PropTypes.shape({
		wiki: PropTypes.string,
		mapUrl: PropTypes.string,
	}).isRequired,
	onClose: PropTypes.func.isRequired,
};

const TinogastaAreaFilterComponent = ({ filters, setFilters }) => {
	const handleAreaFilterChange = useCallback(
		(filter) => {
			setFilters({ areaFilter: filter });
		},
		[setFilters]
	);

	return (
		<AreaFilter
			areaFilter={filters.areaFilter || ""}
			setAreaFilter={(filter) => handleAreaFilterChange(filter)}
		/>
	);
};

TinogastaAreaFilterComponent.propTypes = {
	filters: PropTypes.shape({
		areaFilter: PropTypes.string,
	}).isRequired,
	setFilters: PropTypes.func.isRequired,
};

const filterTinogastaLocations = (locations, filters) => {
	return locations.filter(
		(loc) => !filters.areaFilter || loc.category === filters.areaFilter
	);
};

const Tinogasta = () => (
	<LocationPage
		title="Tinogasta"
		locations={locations}
		filterComponent={TinogastaAreaFilterComponent}
		locationCardComponent={LocationCard}
		modalContent={({ location, onClose }) => (
			<ModalContent
				header={<TinogastaModalHeader location={location} />}
				body={<TinogastaModalBody location={location} />}
				footer={<TinogastaModalFooter location={location} onClose={onClose} />}
			/>
		)}
		pageVariants={TINOGASTA_ANIMATIONS.pageVariants}
		filterFunction={filterTinogastaLocations}
	/>
);

export default Tinogasta;
