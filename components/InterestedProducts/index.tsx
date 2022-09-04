import React, { useState, useEffect } from "react";
import {
	Box,
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
import Product from "../../interfaces/Product";
import Link from "next/link";

export default function InterestedProducts({
	filter,
	query,
}: {
	filter?: string | string[];
	query?: string | string[];
}) {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const getProducts = async () => {
			setLoading(true);
			const link = filter ? `api/producto?${filter}=${query}` : "api/producto";
			const prod = await axios.get(link);

			const activeProducts = prod.data.filter(
				(product: Product) => product.activo
			);
			setProducts(activeProducts);
			setLoading(false);
		};
		getProducts();
	}, [filter, query]);

	if (loading) {
		return (
			<Flex h="40rem" alignItems="center" justifyContent="center">
				<Spinner size="xl" />
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
			<SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ md: 3 }}>
				{products.map((product: Product) =>
					product.activo ? (
						<Link key={product.id} href={`/producto/${product.id}`}>
							<Box mb={4} cursor="pointer">
								{product.images.length > 0 ? (
									<Box cursor={"pointer"}>
										<Image
											src={`${
												process.env.URL + "/api/image/" + product.images[0].ruta
											}`}
											width="600"
											height="400"
											objectFit="cover"
										/>
									</Box>
								) : (
									<img
										src="https://profesional.tarkett.es/media/img/M/THH_25121917_25131917_25126917_25136917_001.jpg"
										style={{
											width: "320px",
											height: "200px",
											objectFit: "cover",
										}}
									/>
								)}
								<Text>{product.nombre}</Text>
								<Text fontSize={"xs"}>por {product.vendedor.nombreTienda}</Text>
							</Box>
						</Link>
					) : (
						""
					)
				)}
			</SimpleGrid>
		</Flex>
	);
}
