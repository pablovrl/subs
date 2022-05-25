import React from "react";
import { Flex, Text, Box } from "@chakra-ui/react";
import InputFile from "../InputFile";

interface CardAddImgProp {
	error: boolean
}

export default function CardAddImg({error}:CardAddImgProp) {
	return (
		<>
			<Flex marginTop={"5"} justifyContent={"center"}>
				<Box
					w={{base: "21em",sm:"26em", md: "30em" ,lg: "48vw"}}
					boxShadow={"md"}
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
						<Text fontSize={"xl"}>Imágenes</Text>
					</Flex>
					<Flex marginTop={"4"} paddingX={{base: 6, md: 8}} w={"100%"} justifyContent={"center"}>
						<Text width={{base: "84%", md: "24em"}} >
							En este apartado debes agregar las imágenes de tu producto.
						</Text>
					</Flex>

					<InputFile error={error} />
				</Box>
			</Flex>
		</>
	);
}
