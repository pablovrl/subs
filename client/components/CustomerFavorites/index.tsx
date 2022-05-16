import React from "react";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import CategoryWithName from "./CategoryWithName";

export default function CustomerFavorites() {
	return (
		<Box>
			<Text fontSize={"xl"} textAlign={"center"} mb={5}>
				Favoritos de los Compradores
			</Text>
			<SimpleGrid columns={3} mx={2} spacing={2} zIndex={1}>
				<CategoryWithName text="Juegos" />
				<CategoryWithName text="Ropa" />
				<CategoryWithName text="Libros" />
				<CategoryWithName text="Comida" />
				<CategoryWithName text="Bebidas" />
				<CategoryWithName text="PC" />
			</SimpleGrid>
		</Box>
	);
}
