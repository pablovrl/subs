import React, { useState } from "react";
import {
	Modal,
	ModalOverlay,
	ModalBody,
	ModalHeader,
	ModalContent,
	ModalCloseButton,
	FormControl,
	FormLabel,
	Input,
	Text,
	Box,
	Textarea,
	useToast,
	Button,
} from "@chakra-ui/react";
import StarsRating from "react-star-rate";
import axios from "axios";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	suscribeId: number | boolean;
	reloadPage: () => void;
}

interface FormData {
	stars: number;
	title: string;
	description: string;
}

const ReviewModal = ({ isOpen, onClose, suscribeId, reloadPage }: Props) => {
	const [formData, setFormData] = useState<FormData>({
		stars: 1,
		title: "",
		description: "",
	});
	const toast = useToast();

	const handleFormDataChange = (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleStarsChange = (newRating: number | undefined) => {
		if (newRating)
			setFormData({
				...formData,
				stars: newRating,
			});
	};

	const submitReview = async () => {
		if (
			formData.title.trim().length === 0 ||
			formData.description.trim().length === 0 ||
			formData.stars === 0
		)
			toast({
				title: "Por favor, complete todos los campos solicitados.",
				status: "error",
				position: "top",
				duration: 3000,
			});

		try {
			await axios.post("/api/valoracion", {
				titulo: formData.title,
				comentario: formData.description,
				estrellas: formData.stars,
				suscribeId,
			});
			onClose();
			toast({
				title: "Su reseña ha sido enviada satisfactoriamente :).",
				status: "success",
				position: "top",
				duration: 3000,
			});
			reloadPage();
		} catch (error) {
			toast({
				title: "Su reseña no ha sido enviada :(.",
				status: "error",
				position: "top",
				duration: 3000,
			});
		}
	};

	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay />
				<ModalCloseButton />
				<ModalContent>
					<ModalHeader>Deja tu reseña</ModalHeader>
					<ModalBody pb={6}>
						<FormControl>
							<FormLabel>Título</FormLabel>
							<Input
								name="title"
								value={formData.title}
								onChange={handleFormDataChange}
								maxLength={30}
							/>
						</FormControl>
						<FormControl mt={4}>
							<FormLabel>Comentario</FormLabel>
							<Textarea
								name="description"
								value={formData.description}
								onChange={handleFormDataChange}
								resize={"none"}
								maxLength={180}
							/>
						</FormControl>
						<Box mt={4}>
							<Text>Calificación</Text>
							<StarsRating
								value={formData.stars}
								onChange={handleStarsChange}
								allowHalf={false}
							/>
						</Box>
						<Button
							minWidth={"100%"}
							mt={4}
							colorScheme={"green"}
							onClick={submitReview}
						>
							Enviar
						</Button>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default ReviewModal;
