import React, { useState, useEffect } from "react";
import { Box, Container, Spinner, Flex, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import NavbarEdit from "../components/AddNewProduct/NavBarAddProduct";
import { useSelector } from "react-redux";
import Products from "../components/EditProduct/Products";

const editarProducto: NextPage = () => {
	const [edit, setEdit] = useState(false);
	const [loading, setLoading] = useState(true);
	const user = useSelector((store:any) => store.user);
	const router = useRouter();
	
	useEffect(() => {
		if(user.email === "" || user.typeUser === "cliente"){
			router.push("/");
		}else{
			setLoading(false);
		}
	}, []);
	

	if (loading) {
		return (
			<Flex h="100vh" alignItems="center" justifyContent="center">
				<Spinner size="xl" />
			</Flex>
		);
	}
	
	
	return (
		<Box>
			{edit === false ? (
				<Navbar />
			) : (
				<NavbarEdit edit={true} setEdit={setEdit} />
			)}
			<Text mx={"8"} mt={8} fontSize={"2xl"} textAlign={"center"}>
				Mis Productos
			</Text>
			<Container maxW="container.lg">
				<Products edit={edit} setEdit={setEdit} />
			</Container>
		</Box>
	);
};

export default editarProducto;
