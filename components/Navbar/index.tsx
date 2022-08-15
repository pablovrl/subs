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
	Image,
	Link as CLink,
	Container,
} from "@chakra-ui/react";
import NavbarLink from "./NavbarLink";
import { FaBars, FaTimes, FaUserAlt } from "react-icons/fa";
import Category from "../../interfaces/Category";
import axios from "axios";
import Link from "next/link";

export default function Navbar() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [categories, setCategories] = useState<Category[]>([]);

	useEffect(() => {
		const getCategories = async () => {
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
					<Box
						py={1}
						key={categorie.id}
						_hover={{ backgroundColor: "#B8F1B0" }}
					>
						<NavbarLink
							text={categorie.nombre}
							href={`/buscar/categoria?query=${categorie.id}`}
							fontSize={"2xl"}
						/>
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
		<Box
			px={2}
			borderColor={"gray.200"}
			borderBottomWidth={1}
			bgColor={"white"}
		>
			<Container maxW="container.xl">
				<Flex alignItems={"center"} justifyContent={"space-between"}>
					<Link href={"/"}>
						<CLink px={4} py={2}>
							<Image src={"../logoSus.png"} w={32} h={"auto"} />
						</CLink>
					</Link>
					<HStack spacing={"20px"}>
						<NavbarLink text="Agregar producto" href="/agregarProducto" />
						<NavbarLink text="Eliminar producto" href="/editarProducto" />
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
			</Container>
		</Box>
	);
}
