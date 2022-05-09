import React from "react";
import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import CustomerFavorites from "../components/CustomerFavorites";

const Home: NextPage = () => {
	return (
		<Box>
			<CustomerFavorites />
		</Box>
	);
};

export default Home;
