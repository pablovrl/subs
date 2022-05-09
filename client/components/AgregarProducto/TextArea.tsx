import React from "react";
import { Text, TypographyProps, Flex, Textarea, Stack } from "@chakra-ui/react";

interface TextAreaProps {
	title: string;
	placeHolder: string;
	text: string;
	fontSizeTitle?: TypographyProps["fontSize"];
	fontSizeInput?: TypographyProps["fontSize"];
	fontSizeText?: TypographyProps["fontSize"];
}

export default function TextArea({
	title,
	placeHolder,
	text,
	fontSizeTitle,
	fontSizeInput,
	fontSizeText,
}: TextAreaProps) {
	return (
		<Stack w={"88%"}>
			<Flex marginLeft={"2"} marginTop={"2"}>
				<Text fontSize={fontSizeTitle}>{title}</Text>
			</Flex>
			<Textarea fontSize={fontSizeInput} placeholder={placeHolder} />
			<Flex paddingLeft={"1"}>
				<Text fontSize={fontSizeText}>{text}</Text>
			</Flex>
		</Stack>
	);
}
