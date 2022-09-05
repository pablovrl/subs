import React from "react";
import {
	Box,
	Flex,
	HStack,
	Image,
	Button,
	Link as CLink,
	Container,
} from "@chakra-ui/react";
import NavbarLink from "../../Navbar/NavbarLink";
import Link from "next/link";
import {useDispatch} from "react-redux";
import {addArrayImg} from "../../../redux/addNewProduct/action";

interface propsNav {
	edit: boolean;
	setEdit?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NavBarAddProduct({ edit, setEdit }: propsNav) {

	const dispatch = useDispatch();
	
	return (
		<Box borderColor={"gray.200"} borderBottomWidth={1} bgColor={"white"}>
			<Container maxW="container.xl">
				<Flex alignItems={"center"} justifyContent={"space-between"}>
					<Link href={"/"}>
						<CLink px={4} py={2}>
							<Image src={"logoSus.png"} w={32} h={"auto"} />
						</CLink>
					</Link>
					<HStack spacing={"20px"}>
						{edit === false ? (
							<NavbarLink text="Volver" href="/" onClick={()=>{dispatch(addArrayImg([]));}}/>
						) : (
							<Button
								colorScheme="teal"
								variant="ghost"
								onClick={() => {
									if(setEdit !== undefined){
										dispatch(addArrayImg([]));
										setEdit(false);
									}
								}}
							>
								Volver
							</Button>
						)}
					</HStack>
				</Flex>
			</Container>
		</Box>
	);
}
