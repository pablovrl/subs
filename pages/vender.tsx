import React from "react";
import { Box, Flex, Text, Image } from "@chakra-ui/react";
import ButtonLink from "../components/ButtonLink";

import type { NextPage } from "next";

const Vender: NextPage = () => {
	return (
		<>
			<Box>
				<Flex justifyContent={"center"}>
					<Text
						fontSize={"3xl"}
						paddingTop={5}
						textColor={"black"}
						textAlign={"center"}
						paddingX={5}
						marginTop={1}
					>
						Miles de compradores están esperando para comprar tu caja.
					</Text>
				</Flex>
				<Flex justifyContent={"center"} marginTop={5}>
					<Image
						src="http://holamujer02.akamaized.net/wp-content/uploads/2019/08/Cajas-sorpresas.jpg"
						alt="Dan Abramov"
					/>
				</Flex>
				<Flex justifyContent={"center"}>
					<Text
						fontSize={"2xl"}
						textColor={"black"}
						textAlign={"center"}
						paddingX={5}
					>
						susCL es el primer y único Marketplace de chile para emprendedores
						de cajas de suscripción. Aprovecha ahora y concéntrate en tu pasión,
						nosotros haremos el resto. ! ES TOTALMENTE GRATIS ¡
					</Text>
				</Flex>
				<Flex justifyContent={"center"} marginTop={10} paddingBottom={10}>
					<ButtonLink text="Crear cuenta" href="/Registrar" fontSize={"2xl"} />
				</Flex>
			</Box>
			<Box backgroundColor={"white"}>
				<Flex justifyContent={"center"}>
					<Text
						fontSize={"3xl"}
						paddingTop={5}
						textAlign={"center"}
						paddingX={5}
						marginTop={1}
					>
						Vende tus cajas aquí y aprovecha las ventajas de la aplicación.
					</Text>
				</Flex>
				<Flex justifyContent={"center"} marginTop={5}>
					<Image
						src="https://areajugones.sport.es/wp-content/uploads/2017/10/UtraInstintoDragonBall.jpg.webp"
						alt="Dan Abramov"
					/>
				</Flex>
				<Flex justifyContent={"center"}>
					<Text
						fontSize={"3xl"}
						paddingTop={5}
						textAlign={"center"}
						paddingX={5}
						marginTop={1}
					>
						¡Unete a la aplicacion junto con varios comerciantes que hacen
						crecer sus negocios gracias a susCL.
					</Text>
				</Flex>
				<Flex justifyContent={"center"} marginTop={5} paddingBottom={5}>
					<ButtonLink
						text="Añadir Producto"
						href="/agregarProducto"
						fontSize={"2xl"}
					/>
				</Flex>
			</Box>
		</>
	);
};

export default Vender;
