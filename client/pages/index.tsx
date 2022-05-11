import React from "react";
import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import type { NextPage } from "next";
import CustomerFavorites from "../components/CustomerFavorites";
import Navbar from "../components/Navbar";
import { FaSistrix } from "react-icons/fa";

const Home: NextPage = () => {
	return (
		<Box>
			<Navbar />
			<Box mx={4}>
				<InputGroup>
					<InputLeftElement>
						<FaSistrix size={20} />
					</InputLeftElement>
					<Input placeholder="Buscar ..." variant={"filled"} zIndex={1} />
				</InputGroup>
				<CustomerFavorites />
			</Box>
		</Box>
	);
};

export default Home;
