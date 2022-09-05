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
	Text,
	Link as CLink,
	Container,
} from "@chakra-ui/react";
import NavbarLink from "./NavbarLink";
import { FaBars, FaTimes, FaUserAlt } from "react-icons/fa";
import Category from "../../interfaces/Category";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../redux/addNewProduct/action";
import axios from "axios";
import Link from "next/link";
import Swal from "sweetalert2";

export default function Navbar() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [categories, setCategories] = useState<Category[]>([]);
	//const [login, setLogin] = useState(false);
	const dispatch = useDispatch();
	const user = useSelector((state: any) => state.user);

	useEffect(() => {
		const getCategories = async () => {
			const res = await axios.get("/api/categoria");
			setCategories(res.data);
		};

		/* const isAdmin = async () => {
			const res = await axios.get("/api")
		} */

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
						pl={10}
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

	const handleClickLogin = () => {
		Swal.fire({
			title: "Login",
			showCloseButton: true,
			html: `<input type="text" id="email" class="swal2-input" placeholder="Email">
			<input type="password" id="password" class="swal2-input" placeholder="Password">`,
			confirmButtonText: "Iniciar Sesión",
			//focusConfirm: false,
			preConfirm: async () => {
				const email = (document.getElementById("email") as HTMLInputElement)
					.value;
				const password = (
					document.getElementById("password") as HTMLInputElement
				).value;

				if (!email || !password) {
					Swal.showValidationMessage("Introduzca su usuario y su contraseña");
				} else {
					const body = {
						email: email,
						password: password,
					};

					try {
						const user = await axios.post("/api/credencial", body);
						dispatch(
							addUser({
								email: user.data.email,
								typeUser: user.data.tipoUsuario,
							})
						);
					} catch (error) {
						Swal.fire({
							icon: "error",
							confirmButtonText: "Volver",
							title: "Usuario no encontrado",
						});
					}
				}
			},
		});
	};

	const handleClickSignOff = () => {
		Swal.fire({
			title: "Estás seguro que quieres cerrar sesión",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "green",
			cancelButtonColor: "red",
			cancelButtonText: "No",
			confirmButtonText: "Si",
			showCloseButton: true,
		}).then((result) => {
			if (result.isConfirmed) {
				dispatch(addUser({ email: "", typeUser: "" })),
				Swal.fire({
					position: "center",
					icon: "success",
					title: "Se cerró sesión correctamente",
					showConfirmButton: false,
					timer: 1500,
				});
			}
		});
	};

	const userLogin = () => {
		if (user.email !== "") {
			return (
				<Flex p={2} style={{ cursor: "pointer" }} onClick={handleClickSignOff}>
					<Text fontSize={{ base: "xs", sm: "sm", md: "md" }}>
						Cerrar Sesión
					</Text>
				</Flex>
			);
		} else {
			return (
				<Flex p={2} style={{ cursor: "pointer" }} onClick={handleClickLogin}>
					<Flex mr={3} alignItems={"center"}>
						{<FaUserAlt />}
					</Flex>
					<Text>Iniciar Sesión</Text>
				</Flex>
			);
		}
	};

	return (
		<Box
			px={2}
			borderColor={"gray.200"}
			borderBottomWidth={1}
			bgColor={"white"}
		>
			<Container maxW="container.xl">
				<Flex
					alignItems={"center"}
					justifyContent={
						user.typeUser !== "cliente" && user.typeUser !== ""
							? { base: "center", md: "space-between" }
							: { base: "center", sm: "space-between" }
					}
				>
					<Flex
						w={
							user.typeUser !== "cliente" && user.typeUser !== ""
								? { base: 0, md: 32 }
								: { base: 32 }
						}
						display={
							user.typeUser !== "cliente" && user.typeUser !== ""
								? { base: "none", md: "flex" }
								: { base: "none", sm: "flex" }
						}
					>
						<Link href={"/"}>
							<CLink px={{ base: 1, sm: 2, md: 4 }} py={2}>
								<Image src={"../logoSus.png"} h={"auto"} />
							</CLink>
						</Link>
					</Flex>
					<HStack spacing={"20px"} py={2}>
						{user.typeUser !== "cliente" && user.typeUser !== "" ? (
							<>
								<NavbarLink
									text="Agregar Producto"
									href="/agregarProducto"
									fontSize={{ base: "xs", sm: "sm", md: "md" }}
								/>
								<NavbarLink
									text="Editar Productos"
									href="/menuEditar"
									fontSize={{ base: "xs", sm: "sm", md: "md" }}
								/>
							</>
						) : (
							""
						)}

						{userLogin()}

						{user.typeUser !== "cliente" && user.typeUser !== "" ? (
							<IconButton
								bg={"white"}
								size={"sm"}
								aria-label="Open Menu"
								icon={<FaBars />}
								onClick={onOpen}
							/>
						) : (
							<IconButton
								bg={"white"}
								size={"md"}
								aria-label="Open Menu"
								icon={<FaBars />}
								onClick={onOpen}
							/>
						)}
					</HStack>
				</Flex>
				{desktopCategories()}
			</Container>
		</Box>
	);
}
