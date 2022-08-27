import React, { useState } from "react";
import {
	Flex,
	Text,
	Heading,
	Divider,
	SimpleGrid,
	GridItem,
	Button,
} from "@chakra-ui/react";
import Product from "../../interfaces/Product";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import PriceBox from "../PriceBox";

interface Props {
	product: Product;
	suscribed: boolean;
}

const SelectPlan = ({ product, suscribed }: Props) => {
	const [selectedPrice, setSelectedPrice] = useState<number>();
	const handleChangePrice = (id: number) => {
		setSelectedPrice(id);
	};
	const router = useRouter();

	const onSuscribeClick = async () => {
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
				router.push(`/producto/${product.id}`);
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
				{!suscribed ? (
					<Button
						my="4"
						colorScheme={"green"}
						disabled={selectedPrice ? false : true}
						onClick={onSuscribeClick}
					>
						Suscribirse
					</Button>
				) : (
					<Button my="4" colorScheme={"red"} disabled>
						Ya estás suscrito a este producto
					</Button>
				)}
			</Flex>
		</GridItem>
	);
};

export default SelectPlan;
