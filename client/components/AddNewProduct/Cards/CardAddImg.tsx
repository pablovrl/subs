import React, { SetStateAction } from "react";
import { Flex, Text, Box } from "@chakra-ui/react";
import InputFile from "../InputFile";

export default function CardAddImg() {
	return (
		<>
			<Flex marginTop={"5"} justifyContent={"center"}>
				<Box
					w={"21em"}
					justifyContent={"center"}
					borderRadius={"10px"}
					borderWidth={"1px"}
					paddingBottom={"6"}
				>
					<Flex
						justifyContent={"center"}
						borderBottomWidth={"1px"}
						paddingY={"3"}
					>
						<Text fontSize={"xl"}>Imagenes</Text>
					</Flex>
					<Flex marginTop={"4"} paddingX={"6"}>
						<Text>
							En este apartado debes agregar varias imágenes de tu producto,
							esto hará que tu producto sea más vistoso.
						</Text>
					</Flex>

					<InputFile />
				</Box>
			</Flex>
		</>
	);
}
