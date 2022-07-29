import React from "react";
import {
	Text,
	TypographyProps,
	Flex,
	Select as SelectCK,
	Stack,
} from "@chakra-ui/react";

interface Categoria {
	id: number;
	nombre: string;
}

interface SelectProps {
	title: string;
	categories: Categoria[];
	onChange: React.ChangeEventHandler<HTMLSelectElement>;
	text: string;
	value?: any;
	fontSizeTitle?: TypographyProps["fontSize"];
	fontSizeText?: TypographyProps["fontSize"];
}

export default function Select({
	title,
	categories,
	onChange,
	value,
	text,
	fontSizeTitle,
	fontSizeText,
}: SelectProps) {
	return (
		<Stack w={{ base: "88%", md: "80%" }}>
			<Flex marginLeft={2} marginTop={2}>
				<Text fontSize={fontSizeTitle}>{title}</Text>
			</Flex>

			<SelectCK
				name="category"
				onChange={onChange}
				w={{ base: "100%", sm: "16em", md: "80%" }}
			>

				{
				categories.map((category) => (

					value !== undefined ? (
						value.id === category.id ? 
						(<option key={category.id} value={category.id} selected>
							{category.nombre}
						</option>) : (<option key={category.id} value={category.id}>
							{category.nombre}
						</option>)
					):(<option key={category.id} value={category.id}>
						{category.nombre}
					</option>)
					
				))}
			</SelectCK>

			<Flex paddingLeft={"1"}>
				<Text fontSize={fontSizeText}>{text}</Text>
			</Flex>
		</Stack>
	);
}
