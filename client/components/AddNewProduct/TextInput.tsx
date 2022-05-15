import React from "react";
import { Text, TypographyProps, Flex, Input, Stack } from "@chakra-ui/react";

interface InputTextProps {
	title: string;
	name: string;
	placeHolder: string;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
	value: string;
	handleBlur: React.FocusEventHandler<HTMLInputElement>;
	fontSizeTitle?: TypographyProps["fontSize"];
	fontSizeInput?: TypographyProps["fontSize"];
}

export default function InputText({
	title,
	name,
	placeHolder,
	onChange,
	value,
	handleBlur,
	fontSizeTitle,
	fontSizeInput,
}: InputTextProps) {
	return (
		<Stack width={"100%"}>
			<Flex marginLeft={2} marginTop={2}>
				<Text fontSize={fontSizeTitle}>{title}</Text>
			</Flex>
			<Input
				name={name}
				fontSize={fontSizeInput}
				onChange={onChange}
				value={value}
				placeholder={placeHolder}
				onBlur={handleBlur}
			/>
		</Stack>
	);
}
