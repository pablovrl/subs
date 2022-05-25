import React, { useEffect } from "react";
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

export default function InterestedProducts() {
	const [products, setProducts] = React.useState<Product[]>([]);

	useEffect(() => {
		const getProducts = async () => {
			const prod = await axios.get("/api/producto");
			setProducts(prod.data);
		};
		getProducts();
	}, []);

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
		<Flex justifyContent={"center"} direction={"column"} alignItems="center">
			<Text mx={"8"} my={4} fontSize={"2xl"} textAlign={"center"}>
				Esto podría interesarte!
			</Text>
			<SimpleGrid columns={{ base: 1, md: 3 }} spacing={{md: 14}}>
				{products.map((product: Product) => (
					<Box key={product.id} mb={4}>
						{product.images.length > 0 ? (
							<Image
								loader={() => `http://localhost:3001/${product.images[0].ruta}`}
								src={`http://localhost:3001/${product.images[0].ruta}`}
								width="320px"
								height="200"
								objectFit="cover"
							/>
						) : (
							<Box mb={1} w="xs" h="200px" bg={"gray.100"} rounded={"2xl"} />
						)}
						<Text>{product.nombre}</Text>
						<Text fontSize={"xs"}>por {product.vendedor.nombreTienda}</Text>
						<Button my={2} variant={"outline"} colorScheme={"green"}>
							Suscribirse
						</Button>
					</Box>
				))}
			</SimpleGrid>
		</Flex>
	);
}
