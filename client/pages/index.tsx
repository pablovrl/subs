import React from "react";
import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import Navbar from "../components/Navbar";
import InterestedProducts from "../components/InterestedProducts";

const Home: NextPage = () => {
	return (
		<Box>
			<Navbar />
			<Box mx={4}>
				<InterestedProducts />
			</Box>
		</Box>
	);
};

export default Home;
