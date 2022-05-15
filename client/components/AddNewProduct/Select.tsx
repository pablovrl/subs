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
	value: string;
	onChange: React.ChangeEventHandler<HTMLSelectElement>;
	text: string;
	fontSizeTitle?: TypographyProps["fontSize"];
	fontSizeText?: TypographyProps["fontSize"];
}

export default function Select({
	title,
	value,
	onChange,
	text,
	fontSizeTitle,
	fontSizeText,
}: SelectProps) {
	return (
		<Stack w={"88%"}>
			<Flex marginLeft={2} marginTop={2}>
				<Text fontSize={fontSizeTitle}>{title}</Text>
			</Flex>
			<SelectCK value={value} name="category" onChange={onChange}>
				<option value="Animales">Animales</option>
				<option value="Entretenimiento">Entretenimiento</option>
				<option value="Videojuegos">Viedojuegos</option>
				<option value="Juegos de mesa">Juegos de mesa</option>
				<option value="Comida">Comida</option>
				<option value="Libros">Libros</option>
				<option value="Regalo">Regalo</option>
				<option value="Maquillaje">Maquillaje</option>
				<option value="Juegos de mesa">Juegos de mesa</option>
				<option value="Deporte">Deporte</option>
				<option value="Sexual">Sexual</option>
			</SelectCK>
			<Flex paddingLeft={"1"}>
				<Text fontSize={fontSizeText}>{text}</Text>
			</Flex>
		</Stack>
	);
}
