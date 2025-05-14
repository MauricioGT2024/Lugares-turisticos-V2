// src/components/common/CustomModal.jsx
import PropTypes from 'prop-types';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
} from '@chakra-ui/react';

const CustomModal = ({
	isOpen,
	onClose,
	title,
	headerGradient,
	size = 'lg',
	children,
	footer,
}) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose} size={size} isCentered>
			<ModalOverlay />
			<ModalContent borderRadius='xl'>
				{/* Header with Gradient */}
				<ModalHeader
					bgGradient={headerGradient}
					color='white'
					textAlign='center'
					py={6}
					fontSize='xl'
					fontWeight='bold'
				>
					{title}
				</ModalHeader>
				<ModalCloseButton />

				{/* Body Content */}
				<ModalBody pb={6}>{children}</ModalBody>

				{/* Footer */}
				{footer && <ModalFooter>{footer}</ModalFooter>}
			</ModalContent>
		</Modal>
	);
};

CustomModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	headerGradient: PropTypes.string.isRequired,
	size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
	children: PropTypes.node.isRequired,
	footer: PropTypes.node,
};

export default CustomModal;
