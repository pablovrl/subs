import React from "react";
import { Box, Flex, IconButton, useDisclosure, HStack } from "@chakra-ui/react";
import NavbarLink from "./NavbarLink";
import { FaBars, FaUserAlt } from "react-icons/fa";
import HamburgerMenu from "./HamburgerMenu";

export default function Navbar() {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Box px={2} mb={2}>
			<Flex alignItems={"center"} justifyContent={"space-between"}>
				<Box>Logo</Box>
				<HStack spacing={"20px"}>
					<NavbarLink text="Vender" href="/Vender" />
					<HStack>
						<NavbarLink text="Iniciar Sesión" href="/" icon={<FaUserAlt />} />
					</HStack>
					<IconButton
						bg={"white"}
						aria-label="Open Menu"
						icon={<FaBars />}
						onClick={onOpen}
					/>
				</HStack>
			</Flex>
			<HamburgerMenu isOpen={isOpen} onClose={onClose} />
		</Box>
	);
}
