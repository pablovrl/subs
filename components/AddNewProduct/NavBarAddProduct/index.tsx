import React, { useEffect, useState } from "react";
import {
	Box,
	Flex,
	HStack,
  Image,
	Text,
	Link as CLink,
	Container,
} from "@chakra-ui/react";
import NavbarLink from "../../Navbar/NavbarLink";
import Link from "next/link";
import { loadGetInitialProps } from "next/dist/shared/lib/utils";

export default function NavBarAddProduct() {

	return (
		<Box borderColor={"gray.200"} borderBottomWidth={1} bgColor={"white"}>
			<Container maxW="container.xl" >
				<Flex alignItems={"center"} justifyContent={"space-between"}>
					<Link href={"/"}>
						<CLink px={4} py={2} >
                <Image src={"logoSus.png"} w={32} h={"auto"}/>
						</CLink>
					</Link>
					<HStack spacing={"20px"}>
						<NavbarLink text="Volver" href="/" />
					</HStack>
				</Flex>
			</Container>
		</Box>
	);
}
