import React from "react";
import {
	useDisclosure,
	Button,
	Text,
	Modal,
	ModalOverlay,
	ModalBody,
	ModalHeader,
	ModalContent,
	ModalCloseButton,
} from "@chakra-ui/react";

const ReviewModal = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			<Button onClick={onOpen}>Open modal</Button>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalCloseButton />
				<ModalContent>
					<ModalHeader>Deja tu reseña!</ModalHeader>
					<ModalBody>
						<Text>hola</Text>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default ReviewModal;
