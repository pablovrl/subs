import React from "react";
import { Box, Container, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import Navbar from "../components/Navbar";
import Products from "../components/EditProduct/Products";

const editarProducto: NextPage = () => {
	return (
		<Box>
      <Navbar />
			<Container maxW="container.lg">
				<Text mx={"8"} mt={4} fontSize={"2xl"} textAlign={"center"}>
           Mis productos
				</Text>
				<Products />
			</Container>
		</Box>
	);
};

export default editarProducto;
