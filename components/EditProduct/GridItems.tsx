import { SimpleGrid, Box, Text, Flex, Button } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";
import Product from "../../interfaces/Product";
import {useDispatch} from "react-redux";
import {addArrayImg} from "../../redux/addNewProduct/action";



interface propsProduct {
  products: Product[],
  handleDelete: any,
  handleEdit:any
}

export default function GridItem({products, handleEdit, handleDelete}: propsProduct) {

	const dispatch = useDispatch();

	return (
		<SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ md: 3 }}>
			{products.map((product: Product) => (
				<Box key={product.id} mb={4} cursor="pointer">
					{product.images.length > 0 ? (
						<Box cursor={"pointer"}>
							<Image
								loader={() =>
									`${process.env.URL + "/" + product.images[0].ruta}`
								}
								src={`${process.env.URL + "/" + product.images[0].ruta}`}
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

					<Flex w={"100%"} justifyContent={"space-evenly"} mt={4}>
						<Button
							onClick={() => {
								dispatch(addArrayImg([]));
								handleEdit(product);
							}}
						>
							Editar
						</Button>
						<Button
							onClick={() => {
								//handleClickDelete(product);
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
