import {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalCloseButton,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

const ModalContent = ({ header, body, footer }) => (
		<>
			<ModalHeader>{header}</ModalHeader>
			<ModalCloseButton />
			<ModalBody py={6}>{body}</ModalBody>
			<ModalFooter gap={2}>{footer}</ModalFooter>
		</>
	);

ModalContent.propTypes = {
	header: PropTypes.node.isRequired,
	body: PropTypes.node.isRequired,
	footer: PropTypes.node.isRequired,
};

export default ModalContent;
