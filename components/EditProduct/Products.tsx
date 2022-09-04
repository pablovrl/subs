import React, { useState, useEffect } from "react";
import {
	Flex,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
	Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import Product from "../../interfaces/Product";
import GridItems from "./GridItems";
import EditProduct from "./index";

import Swal from "sweetalert2";

interface propsProduct {
	edit: boolean;
	setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Products({ edit, setEdit }: propsProduct) {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	const [newProducts, setNewsProducts] = useState<Product[]>([]);
	const [productEdit, setProductEdit] = useState<Product>();

	useEffect(() => {
		const getProducts = async () => {
			const prod = await axios.get("api/producto");
			setProducts(prod.data);
			setLoading(false);
		};

		getProducts();
	}, [newProducts]);

	function handleClickEdit(product: Product) {
		setEdit(true);
		setProductEdit(product);
	}

	function handleActivate(active: boolean, id: number) {
		if (active === true) {
			productActivate(true, id);
		} else {
			productActivate(false, id);
		}
	}

	const productActivate = async (active: boolean, id: number) => {
		if (active === false) {
			Swal.fire({
				title: "¿Está seguro que desea desactivar este producto?",
				icon: "warning",
				showCancelButton: true,
				confirmButtonText: "Si",
				confirmButtonColor: "green",
				cancelButtonColor: "red",
				cancelButtonText: "No",
			}).then((result) => {
				if (result.isConfirmed) {
					putActivateProduct(active, id);
					Swal.fire({
						position: "center",
						icon: "success",
						title: "El producto fue desactivado correctamente",
						showConfirmButton: false,
						timer: 1200,
					});
				}
			});
		} else {
			putActivateProduct(active, id);
			Swal.fire({
				position: "center",
				icon: "success",
				title: "El producto fue activado correctamente",
				showConfirmButton: false,
				timer: 1200,
			});
		}
	};

	const putActivateProduct = async (active: boolean, id: number) => {
		const body = {
			activo: active,
		};

		await axios.put("/api/producto/" + id, body);
		const prod = await axios.get("api/producto");
		setNewsProducts(prod.data);
	};

	if (loading) {
		return (
			<Flex h="40rem" alignItems="center" justifyContent="center">
				<Spinner size="xl" />
			</Flex>
		);
	}

	if (products.length === 0 && !loading)
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
					No se encontraron productos
				</AlertTitle>
				<AlertDescription maxWidth="sm">
					Lamentablemente no tenemos productos disponibles en estos momentos,
					puedes intentar recargando la página!.
				</AlertDescription>
			</Alert>
		);

	const handleClickDelete = async (product: any) => {
		Swal.fire({
			title: "¿Está seguro que desea eliminar este producto?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "Si",
			confirmButtonColor: "green",
			cancelButtonColor: "red",
			cancelButtonText: "No",
		}).then((result) => {
			if (result.isConfirmed) {
				deleteProduct(product.id);
				Swal.fire({
					position: "center",
					icon: "success",
					title: "El producto fue eliminado correctamente",
					showConfirmButton: false,
					timer: 1200,
				});
			}
		});
	};

	const deleteProduct = async (id: number) => {
		await axios.delete("/api/producto/" + id);
		const prod = await axios.get("api/producto");

		setNewsProducts(prod.data);
	};

	return (
		<Flex
			pt={4}
			justifyContent={"center"}
			direction={"column"}
			alignItems="center"
		>
			{edit === false ? (
				<GridItems
					products={products}
					handleEdit={handleClickEdit}
					handleDelete={handleClickDelete}
					handleActivate={handleActivate}
				/>
			) : (
				<EditProduct
					setNewsProducts={setNewsProducts}
					productEdit={productEdit}
				/>
			)}
		</Flex>
	);
}
