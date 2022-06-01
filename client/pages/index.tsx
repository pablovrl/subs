import React from "react";
import { Box, Container, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import Navbar from "../components/Navbar";
import InterestedProducts from "../components/InterestedProducts";

const Home: NextPage = () => {
	return (
		<Box>
			<Navbar />
			<Container maxW="container.lg">
				<Text mx={"8"} mt={4} fontSize={"2xl"} textAlign={"center"}>
					Esto podría interesarte!
				</Text>
				<InterestedProducts />
			</Container>
		</Box>
	);
};

export default Home;
