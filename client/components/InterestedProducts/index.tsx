import React, { useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import axios from "axios";

export default function InterestedProducts() {
	const [products, setProducts] = React.useState([]);

	useEffect(() => {
		const getProducts = async () => {
			const prod = await axios.get("http://localhost:3001/api/products");
			setProducts(prod.data);
			console.log(prod);
		};
		getProducts();
	}, []);

	return (
		<Box>
			<Text>Productos que podrían interesarte</Text>
		</Box>
	);
}
