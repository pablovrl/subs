import React from "react";
import { Slide, Box, Flex, IconButton, Stack } from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa";
import NavbarLink from "./NavbarLink";

const categories = [
	"Entretenimiento",
	"Comida",
	"Hombre",
	"Mujer",
	"Niños",
	"Libros",
	"Hogar",
	"Adultos",
];

interface HamburgerMenuProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function HamburgerMenu({ isOpen, onClose }: HamburgerMenuProps) {
	return (
		<Box
			bg="white"
			w="full"
			h={"full"}
			p={2}
			position="absolute"
			top={0}
			left={0}
			zIndex={"overlay"}
		>
			<Box>
				<Flex justifyContent="end">
					<IconButton
						bg={"white"}
						size={"lg"}
						aria-label="Close menu"
						icon={<FaTimes />}
						onClick={onClose}
					/>
				</Flex>
			</Box>
			<Stack ml={8}>
				{categories.map((categorie) => (
					<NavbarLink
						key={categorie}
						text={categorie}
						href="/"
						fontSize={"2xl"}
					/>
				))}
			</Stack>
		</Box>
	);
}
