import React, { useEffect, useState } from "react";
import {
	Box,
	Flex,
	IconButton,
	useDisclosure,
	HStack,
	Stack,
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
} from "@chakra-ui/react";
import NavbarLink from "./NavbarLink";
import { FaBars, FaTimes, FaUserAlt } from "react-icons/fa";
import Category from "../../interfaces/Category";
import axios from "axios";

export default function Navbar() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [categories, setCategories] = useState<Category[]>([]);

	useEffect(() => {
		const getCategories = async () => {
			console.log("calling API");
			const res = await axios.get("/api/categoria");
			setCategories(res.data);
		};
		getCategories();
	}, []);

	const AllCategories = () => (
		<>
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
			<Stack>
				{categories.map((categorie) => (
					<Box key={categorie.id} _hover={{ backgroundColor: "#B8F1B0" }}>
						<NavbarLink text={categorie.nombre} href="/" fontSize={"2xl"} />
					</Box>
				))}
			</Stack>
		</>
	);

	const desktopCategories = () => (
		<Drawer isOpen={isOpen} onClose={onClose} size="md">
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton />
				<AllCategories />
			</DrawerContent>
		</Drawer>
	);

	return (
		<Box px={2}>
			<Flex alignItems={"center"} justifyContent={"space-between"}>
				<Box>Logo</Box>
				<HStack spacing={"20px"}>
					<NavbarLink text="Agregar producto" href="/agregarProducto" />
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
			{desktopCategories()}
		</Box>
	);
}
