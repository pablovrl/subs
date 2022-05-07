import React from "react";
import { Box, Flex, Text, Image } from "@chakra-ui/react";
import ButtonLink from "../components/ButtonLink/index";

import type { NextPage } from "next";

const Vender: NextPage = () => {
	return (
		<Box backgroundColor={"black"}>
			<Flex justifyContent={"center"}>
				<Text
					fontSize={"3xl"}
					paddingTop={5}
					textColor={"white"}
					textAlign={"center"}
					paddingX={5}
					marginTop={1}
				>
					Miles de compradores están esperando para comprar tu caja
				</Text>
			</Flex>
			<Flex justifyContent={"center"} marginTop={5}>
				<Image
					boxSize="full"
					src="https://w0.peakpx.com/wallpaper/561/739/HD-wallpaper-box-machine-tec-abstract-black-blue-ios-lg-red-samsung-technology-vivid.jpg"
					alt="Dan Abramov"
				/>
			</Flex>
			<Flex justifyContent={"center"}>
				<Text
					fontSize={"2xl"}
					textColor={"white"}
					textAlign={"center"}
					paddingX={5}
					marginTop={1}
				>
					xxxxxxx es el primer y unico Marketplace de chile para emprendedores
					de cajas de suscripción. Aprovecha ahora y concentrate en tu pasión,
					nosotros haremos el resto. !ES TOTALMENTE GRATIS¡
				</Text>
			</Flex>
			<Flex justifyContent={"center"} marginTop={10} paddingBottom={10}>
				<ButtonLink key={1} text="Añadir Producto" href="/" fontSize={"2xl"} />
			</Flex>
		</Box>
	);
};

export default Vender;
