import React from "react";
import { Button, Box, Text, TypographyProps } from "@chakra-ui/react";

interface ButtonProps {
	text?: string;
	type?: "submit";
	variant?: string;
	borderColor?: string;
	color?: string;
	icon?: React.ReactElement;
	fontSize?: TypographyProps["fontSize"];
}

export default function ButtonLinkProps({
	text,
	type,
	variant,
	icon,
	borderColor,
	fontSize,
	color,
}: ButtonProps) {
	return (
		<Button
			backgroundColor={color}
			type={type}
			variant={variant}
			borderColor={borderColor}
		>
			{icon && <Box mr={2}>{icon}</Box>}
			<Text fontSize={fontSize}>{text}</Text>
		</Button>
	);
}
