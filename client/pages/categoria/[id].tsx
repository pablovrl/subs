import React from "react";
import { Box, Container, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import InterestedProducts from "../../components/InterestedProducts";
import Navbar from "../../components/Navbar";

const DynamicCategory = () => {
	const router = useRouter();
	const { id } = router.query;
	const numberId = parseInt(id as string);
	return (
		<Box>
			<Navbar />
			<Container maxW="container.lg">
				<Text mt={4} fontSize={"2xl"}>
					Hemos encontrado los siguientes productos para ti
				</Text>
				<InterestedProducts categoryId={numberId} />
			</Container>
		</Box>
	);
};

export default DynamicCategory;
