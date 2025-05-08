// ModalContent.jsx
import {
	Modal,
	ModalOverlay,
	ModalContent as ChakraContent,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

const ModalContent = ({
	header,
	body,
	footer,
	isOpen = true,
	onClose = () => {
		
	},
}) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose} size='xl' isCentered>
			<ModalOverlay backdropFilter='blur(8px)' />
			<ChakraContent className='rounded-xl overflow-hidden shadow-xl'>
				{header}
				{body}
				{footer}
			</ChakraContent>
		</Modal>
	);
};

export default ModalContent;
ModalContent.propTypes = {
	header: PropTypes.node.isRequired,
	body: PropTypes.node.isRequired,
	footer: PropTypes.node.isRequired,
	isOpen: PropTypes.bool,
	onClose: PropTypes.func,
};