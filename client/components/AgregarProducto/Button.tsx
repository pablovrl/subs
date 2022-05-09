import React from "react";
import { Button, Box, Text, TypographyProps } from "@chakra-ui/react";

interface ButtonProps {
	text: string;
	color?: string;
	icon?: React.ReactElement;
	fontSize?: TypographyProps["fontSize"];
}

export default function ButtonLinkProps({
	text,
	icon,
	fontSize,
	color,
}: ButtonProps) {
	return (
		<Button backgroundColor={color}>
			{icon && <Box mr={2}>{icon}</Box>}
			<Text fontSize={fontSize}>{text}</Text>
		</Button>
	);
}
