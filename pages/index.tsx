import React from "react";
import { Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import InterestedProducts from "../components/InterestedProducts";
import Layout from "../components/Layout";

const Home: NextPage = () => {
	return (
		<Layout>
			<Text mx={"8"} mt={4} fontSize={"2xl"} textAlign={"center"}>
				Esto podría interesarte!
			</Text>
			<InterestedProducts />
		</Layout>
	);
};

export default Home;
