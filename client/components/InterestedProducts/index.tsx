import React, { useState, useEffect } from "react";
import {
	Box,
	Button,
	Flex,
	Text,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
	SimpleGrid,
	Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import Image from "next/image";

interface Product {
	id: number;
	nombre: string;
	stock: number;
	vendedor: {
		id: number;
		nombreTienda: string;
	};
	images: {
		id: number;
		ruta: string;
		posicion: number;
	}[];
}

export default function InterestedProducts({
	categoryId,
}: {
	categoryId?: number;
}) {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const getProducts = async () => {
			setLoading(true);
			const link = categoryId
				? `api/producto?categoria=${categoryId}`
				: "api/producto";
			const prod = await axios.get(link);
			setProducts(prod.data);
			setLoading(false);
		};
		getProducts();
	}, [categoryId]);

	if (loading) {
		return (
			<Flex h="40rem" alignItems="center" justifyContent="center">
				<Spinner size="xl" />;
			</Flex>
		);
	}

	if (products.length === 0)
		return (
			<Alert
				mt={4}
				status="info"
				variant="subtle"
				flexDirection="column"
				alignItems="center"
				justifyContent="center"
				textAlign="center"
				height="200px"
			>
				<AlertIcon boxSize="40px" mr={0} />
				<AlertTitle mt={4} mb={1} fontSize="lg">
					No hay productos :(
				</AlertTitle>
				<AlertDescription maxWidth="sm">
					Lamentablemente no tenemos productos disponibles en estos momentos,
					puedes intentar recargando la página!.
				</AlertDescription>
			</Alert>
		);

	return (
		<Flex
			pt={4}
			justifyContent={"center"}
			direction={"column"}
			alignItems="center"
		>
			<SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ md: 14 }}>
				{products.map((product: Product) => (
					<Box key={product.id} mb={4}>
						{product.images.length > 0 ? (
							<Image
								loader={() => `http://localhost:3001/${product.images[0].ruta}`}
								src={`http://localhost:3001/${product.images[0].ruta}`}
								width="320px"
								height="200px"
								objectFit="cover"
							/>
						) : (
							<img
								src="https://profesional.tarkett.es/media/img/M/THH_25121917_25131917_25126917_25136917_001.jpg"
								style={{ width: "320px", height: "200px", objectFit: "cover" }}
							/>
						)}
						<Text>{product.nombre}</Text>
						<Text fontSize={"xs"}>por {product.vendedor.nombreTienda}</Text>
						<Button my={2} variant={"outline"} colorScheme={"green"}>
							Ver Detalles
						</Button>
					</Box>
				))}
			</SimpleGrid>
		</Flex>
	);
}
