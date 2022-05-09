import React from "react";
import {
	Text,
	TypographyProps,
	Flex,
	Select as SelectCK,
	Stack,
} from "@chakra-ui/react";

interface SelectProps {
	title: string;
	placeHolder: string;
	text: string;
	fontSizeTitle?: TypographyProps["fontSize"];
	fontSizeText?: TypographyProps["fontSize"];
}

export default function Select({
	title,
	placeHolder,
	text,
	fontSizeTitle,
	fontSizeText,
}: SelectProps) {
	return (
		<Stack w={"88%"}>
			<Flex marginLeft={2} marginTop={2}>
				<Text fontSize={fontSizeTitle}>{title}</Text>
			</Flex>
			<SelectCK placeholder={placeHolder}>
				<option value="option1">Option 1</option>
				<option value="option2">Option 2</option>
				<option value="option3">Option 3</option>
			</SelectCK>
			<Flex paddingLeft={"1"}>
				<Text fontSize={fontSizeText}>{text}</Text>
			</Flex>
		</Stack>
	);
}
