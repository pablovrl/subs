import React from "react";
import { Box, Container, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import InterestedProducts from "../../components/InterestedProducts";
import Navbar from "../../components/Navbar";
import FilterInput from "../../components/FilterInput";

const DynamicCategory = () => {
	const router = useRouter();
	const { filter, query } = router.query;
	return (
		<Box>
			<Navbar />
			<Container maxW="container.lg">
				<FilterInput />
				<Text mt={4} fontSize={"2xl"}>
					Hemos encontrado los siguientes productos para ti
				</Text>
				<InterestedProducts filter={filter} query={query} />
			</Container>
		</Box>
	);
};

export default DynamicCategory;
