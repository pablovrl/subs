import React from "react";
import { Flex, Text } from "@chakra-ui/react";
interface ErrorsProps {
	errors: any;
	errorImg: boolean;
	errorSelectedImg: boolean;
}

export default function Errors({
	errors,
	errorImg,
	errorSelectedImg,
}: ErrorsProps) {
	return (
		<Flex flexDirection={"column"}>
			{errors.name && (
				<Flex w={"88%"} marginLeft={1} marginTop={0.5}>
					<Text color={"red"}>{errors.name}</Text>
				</Flex>
			)}
			{errors.description && (
				<Flex w={"88%"} marginLeft={1} marginTop={0.5}>
					<Text color={"red"}>{errors.description}</Text>
				</Flex>
			)}
			{errorImg && (
				<Flex w={"88%"} marginLeft={1} marginTop={0.5}>
					<Text color={"red"}>Por favor, introduzca una imagen.</Text>
				</Flex>
			)}
			{errorSelectedImg && (
				<Flex w={"88%"} marginLeft={1} marginTop={0.5}>
					<Text color={"red"}>
						Por favor, seleccione una imagen para la portada de su producto.
					</Text>
				</Flex>
			)}
			{errors.stock && (
				<Flex w={"88%"} marginLeft={1} marginTop={0.5}>
					<Text color={"red"}>{errors.stock}</Text>
				</Flex>
			)}
			{errors.oneMonth && (
				<Flex w={"88%"} marginLeft={1} marginTop={0.5}>
					<Text color={"red"}>{errors.oneMonth}</Text>
				</Flex>
			)}
			{errors.threeMonth && (
				<Flex w={"88%"} marginLeft={1} marginTop={0.5}>
					<Text color={"red"}>{errors.threeMonth}</Text>
				</Flex>
			)}
			{errors.sixMonth && (
				<Flex w={"88%"} marginLeft={1} marginTop={0.5}>
					<Text color={"red"}>{errors.sixMonth}</Text>
				</Flex>
			)}
			{errors.twelveMonth && (
				<Flex w={"88%"} marginLeft={1} marginTop={0.5}>
					<Text color={"red"}>{errors.twelveMonth}</Text>
				</Flex>
			)}
		</Flex>
	);
}
