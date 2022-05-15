import React from "react";
import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import Navbar from "../components/Navbar";

const Home: NextPage = () => {
	return (
		<Box>
			<Navbar />
			<Box mx={4}></Box>
		</Box>
	);
};

export default Home;
