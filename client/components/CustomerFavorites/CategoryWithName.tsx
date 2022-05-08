import React from "react";
import { Box, Text, Image } from "@chakra-ui/react";

interface CategoryWithNameProps {
	text: string;
	image?: string;
}

export default function CategoryWithName({
	text,
	image,
}: CategoryWithNameProps) {
	return (
		<Box>
			<Image
				src={image ? image : "/creeper_steve.jpeg"}
				width={"100px"}
				height={"100px"}
				style={{ borderRadius: "50%" }}
			/>
			<Text textAlign={"center"}>{text}</Text>
		</Box>
	);
}
