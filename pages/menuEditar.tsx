import React, { useState } from "react";
import { Box, Container } from "@chakra-ui/react";
import type { NextPage } from "next";
import Navbar from "../components/Navbar";
import NavbarEdit from "../components/AddNewProduct/NavBarAddProduct";
import Products from "../components/EditProduct/Products";

const editarProducto: NextPage = () => {
	const [edit, setEdit] = useState(false);
	
	return (
		<Box>
			{edit === false ? (
				<Navbar />
			) : (
				<NavbarEdit edit={true} setEdit={setEdit} />
			)}
			<Container maxW="container.lg">
				<Products edit={edit} setEdit={setEdit} />
			</Container>
		</Box>
	);
};

export default editarProducto;
