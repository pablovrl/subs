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
		<Flex flexDirection={"column"} w={"100%"} alignItems={"center"} >
			{errors.name && (
				<Flex marginLeft={1} marginTop={0.5}>
					<Text color={"red"}>{errors.name}</Text>
				</Flex>
			)}
			{errors.description && (
				<Flex  marginLeft={1} marginTop={0.5}>
					<Text color={"red"}>{errors.description}</Text>
				</Flex>
			)}
			{errorImg && (
				<Flex  marginLeft={1} marginTop={0.5}>
					<Text color={"red"}>Por favor, introduzca una imagen.</Text>
				</Flex>
			)}
			{errorSelectedImg && (
				<Flex marginLeft={1} marginTop={0.5}>
					<Text color={"red"}>
						Por favor, seleccione una imagen para la portada de su producto.
					</Text>
				</Flex>
			)}
			{errors.stock && (
				<Flex marginLeft={1} marginTop={0.5}>
					<Text color={"red"}>{errors.stock}</Text>
				</Flex>
			)}
			{errors.oneMonth && (
				<Flex marginLeft={1} marginTop={0.5}>
					<Text color={"red"}>{errors.oneMonth}</Text>
				</Flex>
			)}
			{errors.threeMonth && (
				<Flex marginLeft={1} marginTop={0.5}>
					<Text color={"red"}>{errors.threeMonth}</Text>
				</Flex>
			)}
			{errors.sixMonth && (
				<Flex marginLeft={1} marginTop={0.5}>
					<Text color={"red"}>{errors.sixMonth}</Text>
				</Flex>
			)}
			{errors.twelveMonth && (
				<Flex marginLeft={1} marginTop={0.5}>
					<Text color={"red"}>{errors.twelveMonth}</Text>
				</Flex>
			)}
		</Flex>
	);
}
