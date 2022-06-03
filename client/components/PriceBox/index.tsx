import React from "react";
import { Box, Text } from "@chakra-ui/react";

interface PriceBoxProps {
	id: number;
	currentSelected: number;
	handleChangePrice: (id: number) => void;
	months: string;
	price: number;
}

const PriceBox = ({
	id,
	currentSelected,
	handleChangePrice,
	months,
	price,
}: PriceBoxProps) => {
	const selected = id === currentSelected;
	return (
		<button
			onClick={() => {
				handleChangePrice(id);
			}}
		>
			<Box
				border="2px"
				p={3}
				borderRadius="lg"
				borderColor={selected ? "blue.500" : "gray.300"}
				textAlign="left"
			>
				<Text>
					{months} {months === "1" ? "Mes" : "Meses"}
				</Text>
				<Text>${price}</Text>
			</Box>
		</button>
	);
};

export default PriceBox;
