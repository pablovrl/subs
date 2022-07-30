import React, { useState, useEffect } from "react";
import {
	Box,
	Button,
	Flex,
	Text,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
  Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure,
	SimpleGrid,
	Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import Image from "next/image";
import {Product} from "../../interfaces/Product";
import Link from "next/link";
import DrawerEdit from "./DrawerEdit"

export default function Products({
	filter,
	query,
}: {
	filter?: string | string[];
	query?: string | string[];
}) {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
	const [productEdit, setProductEdit] = useState()

	useEffect(() => {
		const getProducts = async () => {
			const prod = await axios.get("api/producto");
			setProducts(prod.data);
		};
		getProducts();
	}, []);



	function handleClickEdit( product: any){
		setProductEdit(product)
		onOpen()
	}


	if (loading) {
		return (
			<Flex h="40rem" alignItems="center" justifyContent="center">
				<Spinner size="xl" />
			</Flex>
		);
	}

	if (products.length === 0)
		return (
			<Alert
				mt={4}
				status="info"
				variant="subtle"
				flexDirection="column"
				alignItems="center"
				justifyContent="center"
				textAlign="center"
				height="200px"
			>
				<AlertIcon boxSize="40px" mr={0} />
				<AlertTitle mt={4} mb={1} fontSize="lg">
					No hay productos :(
				</AlertTitle>
				<AlertDescription maxWidth="sm">
					Lamentablemente no tenemos productos disponibles en estos momentos,
					puedes intentar recargando la página!.
				</AlertDescription>
			</Alert>
		);

    const editProduct = () => (
			<Drawer isOpen={isOpen} onClose={onClose} size="md" placement="left" >
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerEdit productEdit={productEdit}/>
				</DrawerContent>
			</Drawer>
		);


		const handleClickDelete = () => {
			
		}

	return (
		<Flex
			pt={4}
			justifyContent={"center"}
			direction={"column"}
			alignItems="center"
		>
			<SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ md: 3 }}>
				{products.map((product: Product) => (
						<Box mb={4} cursor="pointer">
														{product.images.length > 0 ? (
								<Box cursor={"pointer"}>
									<Image
										loader={() =>
											`${process.env.URL + "/" + product.images[0].ruta}`
										}
										src={`${process.env.URL + "/" + product.images[0].ruta}`}
										width="600"
										height="400"
										objectFit="cover"
									/>
								</Box>
							) : (
								<img
									src="https://profesional.tarkett.es/media/img/M/THH_25121917_25131917_25126917_25136917_001.jpg"
									style={{
										width: "320px",
										height: "200px",
										objectFit: "cover",
									}}
								/>
							)}
							<Text>{product.nombre}</Text>
							
							<Flex w={"100%"} justifyContent={"space-evenly"} mt={4}>
								<Button onClick={()=> {handleClickEdit(product)}}>
									Editar
								</Button>
								<Button onClick={()=> {handleClickDelete(product)}}>
									 Eliminar
								</Button>
							</Flex>
						</Box>
            
				))}
			</SimpleGrid>
      {editProduct()}
		</Flex>
	);
}
