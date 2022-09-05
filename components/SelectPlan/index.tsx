import React, { useState } from "react";
import {
	Flex,
	Text,
	Heading,
	Divider,
	SimpleGrid,
	GridItem,
	Button,
	Box,
	Alert,
	AlertTitle,
	AlertDescription,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import Product from "../../interfaces/Product";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import PriceBox from "../PriceBox";
import ReviewModal from "../ReviewModal";
import { useSelector } from "react-redux";

interface Props {
	product: Product;
	suscribed: boolean | number;
	isReviewed: boolean;
}

const SelectPlan = ({ product, suscribed, isReviewed }: Props) => {
	const [selectedPrice, setSelectedPrice] = useState<number>();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const handleChangePrice = (id: number) => {
		setSelectedPrice(id);
	};
	const user = useSelector((state: any) => state.user);
	const toast = useToast();
	const router = useRouter();
	const reloadPage = () => {
		router.push(`/producto/${product.id}`);
	};

	const onSuscribeClick = async () => {
		if (user.typeUser === "cliente") {
			try {
				await axios.post("/api/suscribe", {
					suscriptorId: 1,
					productoId: product.id,
					periodoId: selectedPrice,
				});
				Swal.fire({
					position: "center",
					icon: "success",
					title: "Te has suscrito al producto!",
					showConfirmButton: false,
					timer: 2000,
				}).then(() => {
					reloadPage();
				});
			} catch {
				Swal.fire({
					position: "center",
					icon: "error",
					title: "Ha ocurrido un error, por favor inténtelo nuevamente.",
					showConfirmButton: false,
					timer: 2000,
				});
			}
		} else {
			toast({
				title: "Inicia sesión como cliente para suscribirte a este producto.",
				status: "error",
				duration: 9000,
				isClosable: true,
			});
		}
	};

	return (
		<GridItem colSpan={{ base: 5, md: 2 }}>
			<Flex
				border={"2px"}
				p={4}
				borderRadius="lg"
				borderColor={"gray.200"}
				flexDir={"column"}
			>
				<Text color="gray.500">{product.categorias[0].categoria.nombre}</Text>
				<Heading>{product.nombre}</Heading>
				<Text>{product.detalles}</Text>
				<Divider my={4} />
				<SimpleGrid columns={2} gap={2}>
					{product.periodo.map((periodo) => (
						<PriceBox
							key={periodo.id}
							id={periodo.id}
							currentSelected={selectedPrice}
							handleChangePrice={handleChangePrice}
							months={periodo.duracion}
							price={periodo.precio}
						/>
					))}
				</SimpleGrid>
				{suscribed && user.typeUser === "cliente" ? (
					<>
						<Alert mt={4} status="success">
							<Box>
								<AlertTitle>Ya estás suscrito a este producto!</AlertTitle>
								<AlertDescription>
									Deja una reseña para ayudar a otros compradores.
								</AlertDescription>
							</Box>
						</Alert>
						<Button
							mt="4"
							colorScheme={"green"}
							onClick={onOpen}
							isDisabled={isReviewed}
						>
							Dejar una reseña
						</Button>
					</>
				) : (
					<Button
						my="4"
						colorScheme={"green"}
						disabled={selectedPrice ? false : true}
						onClick={onSuscribeClick}
					>
						Suscribirse
					</Button>
				)}
			</Flex>
			<ReviewModal
				reloadPage={reloadPage}
				isOpen={isOpen}
				onClose={onClose}
				suscribeId={suscribed}
				userType={user.typeUser}
			/>
		</GridItem>
	);
};

export default SelectPlan;
