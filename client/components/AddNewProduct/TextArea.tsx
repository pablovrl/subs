import React from "react";
import { Text, TypographyProps, Flex, Textarea, Stack } from "@chakra-ui/react";

interface TextAreaProps {
	title: string;
	name: string;
	placeHolder: string;
	onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
	value: string;
	handleBlur: React.FocusEventHandler<HTMLTextAreaElement>;
	fontSizeTitle?: TypographyProps["fontSize"];
	fontSizeInput?: TypographyProps["fontSize"];
}

export default function TextArea({
	title,
	name,
	placeHolder,
	onChange,
	value,
	handleBlur,
	fontSizeTitle,
	fontSizeInput,
}: TextAreaProps) {
	return (
		<Stack w={"100%"}>
			<Flex marginLeft={{base: 1, md: 2}} marginTop={{base: 1,md: 2}}>
				<Text fontSize={fontSizeTitle}>{title}</Text>
			</Flex>
			<Textarea
				name={name}
				fontSize={fontSizeInput}
				height={{base: "3em", md: "8em"}}
				onChange={onChange}
				placeholder={placeHolder}
				value={value}
				onBlur={handleBlur}
			/>
		</Stack>
	);
}
