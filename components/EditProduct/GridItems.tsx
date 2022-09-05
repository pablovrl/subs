import { SimpleGrid, Box, Text, Flex, Button, Image } from "@chakra-ui/react";
import React from "react";
import Product from "../../interfaces/Product";
import { useDispatch } from "react-redux";
import { addArrayImg } from "../../redux/addNewProduct/action";

interface propsProduct {
	products: Product[];
	handleDelete: any;
	handleEdit: any;
	handleActivate: any;
}

export default function GridItem({
	products,
	handleEdit,
	handleActivate,
	handleDelete,
}: propsProduct) {
	const dispatch = useDispatch();

	return (
		<SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ md: 3 }}>
			{products.map((product: Product) => (
				<Box key={product.id} mb={4} cursor="pointer">
					{product.images.length > 0 ? (
						<Box cursor={"pointer"}>
							<Image
								src={`${
									process.env.URL + "/api/image/" + product.images[0].ruta
								}`}
								height="250"
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

					<Flex w={"100%"} justifyContent={"space-evenly"} mt={4}>
						<Button
							colorScheme={"blue"}
							onClick={() => {
								dispatch(addArrayImg([]));
								handleEdit(product);
							}}
						>
							Editar
						</Button>
						{product.activo === true ? (
							<Button
								onClick={() => {
									handleActivate(false, product.id);
								}}
							>
								Desactivar
							</Button>
						) : (
							<Button
								onClick={() => {
									handleActivate(true, product.id);
								}}
							>
								Activar
							</Button>
						)}

						<Button
							colorScheme={"red"}
							onClick={() => {
								handleDelete(product);
							}}
						>
							Eliminar
						</Button>
					</Flex>
				</Box>
			))}
		</SimpleGrid>
	);
}
