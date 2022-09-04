import React, { useState, useEffect } from "react";
import { Flex, Text, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";

import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import FormData from "form-data";
import Errors from "../AddNewProduct/Errors";
import { addArrayImg } from "../../redux/addNewProduct/action";

//*Components
import CardBasic from "../AddNewProduct/Cards/CardBasic";
import CardProductQuantity from "../AddNewProduct/Cards/CardProductQuantity";
import CardPriceProduct from "../AddNewProduct/Cards/CardPriceProduct";
import CardCategories from "../AddNewProduct/Cards/CardAddCategories";
import CardAddImg from "../AddNewProduct/Cards/CardAddImg";
import CardSelectImg from "../AddNewProduct/Cards/CardSelectImg";
import MyFormValues from "../../interfaces/MyFormValues";
import Validations from "../AddNewProduct/Validations";
import { useRouter } from "next/router";

const EditProduct = ({ productEdit, setNewsProducts }: any) => {
	const dispatch = useDispatch();
	const router = useRouter();
	const [errorImg, setErrorImg] = useState(false);

	const [viewErrors, setViewError] = useState(false);
	const [errorSelectedImg, setErrorSelectedImg] = useState(false);
	const [createProduct, setCreateProduct] = useState(false);
	const state = useSelector((state: any) => state);

	useEffect(() => {
		if (state.arrayImg.images.length > 0) {
			setErrorImg(false);
		}

		if (state.arrayImg.firstImg === true) {
			setErrorSelectedImg(false);
			setCreateProduct(false);
		}
	}, [state]);

	useEffect(() => {
		const files = productEdit.images;
		const addPreviewImg: any = [];

		files.map((img: any) => {
			addPreviewImg.push({
				id: img.id,
				productoId: img.productoId,
				preview: img.ruta,
			});
		});

		dispatch(addArrayImg(addPreviewImg));
	}, []);

	const initialValues: MyFormValues = {
		name: productEdit.nombre,
		description: productEdit.detalles,
		images: state.arrayImg.images,
		category: productEdit.categorias[0].categoriaId,
		stock: productEdit.stock,
		oneMonth: productEdit.periodo[0].precio,
		threeMonth: productEdit.periodo[1].precio,
		sixMonth: productEdit.periodo[2].precio,
		twelveMonth: productEdit.periodo[3].precio,
	};

	const submitForm = (values: MyFormValues) => {
		if (errorSelectedImg === false) {
			if (createProduct === false) {
				if (state.arrayImg.images.length > 0) {
					setErrorImg(false);

					if (state.arrayImg.firstImg === true) {
						postImg(values);
						setCreateProduct(true);
					} else {
						setErrorSelectedImg(true);
					}
				} else {
					setErrorImg(true);
				}
			}
		}
	};

	const postImg = async (values: MyFormValues) => {
		const data = new FormData();
		const images = state.arrayImg.sortImg;
		let links = [];
		const imgs = [];
		const imgOld = [];

		for (let i = 0; i < images.length; i++) {
			if (images[i].img !== undefined) {
				data.append("file", images[i].img);
			} else {
				imgOld.push(images[i].preview);
			}
		}

		const res = await axios.post("/api/uploads", data, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		links = res.data.paths;

		if (images[0].img !== undefined) {
			let cont = 0;
			for (let i = 0; i < links.length; i++) {
				imgs.push(links[i]);
			}
			for (let i = links.length; i < imgOld.length + links.length; i++) {
				imgs.push(imgOld[cont]);
				cont++;
			}
		} else {
			let cont = 0;
			for (let i = 0; i < imgOld.length; i++) {
				imgs.push(imgOld[i]);
			}
			for (let i = imgOld.length; i < links.length + imgOld.length; i++) {
				imgs.push(links[cont]);
				cont++;
			}
		}

		postSortImg(imgs, values);
	};

	const postSortImg = async (links: any, values: MyFormValues) => {
		let categoriaId = "";

		for (let i = 0; i < state.arrayCategories.categories.length; i++) {
			if (values.category == state.arrayCategories.categories[i].id) {
				categoriaId = state.arrayCategories.categories[i].id;
			}
		}

		const body = {
			nombre: values.name,
			detalles: values.description,
			stock: parseInt(values.stock, 10),
			categoriaId: categoriaId,
			imagenes: links,
			periodos: [
				{
					duracion: "1",
					precio: parseInt(values.oneMonth, 10),
				},
				{
					duracion: "3",
					precio: parseInt(values.threeMonth, 10),
				},
				{
					duracion: "6",
					precio: parseInt(values.sixMonth, 10),
				},
				{
					duracion: "12",
					precio: parseInt(values.twelveMonth, 10),
				},
			],
		};

		try {
			await axios.put("/api/producto/" + productEdit.id, body);
			const prod = await axios.get("api/producto");
			setNewsProducts(prod);
			router.push("/");
			Swal.fire({
				position: "center",
				icon: "success",
				title: "El producto se editó correctamente",
				showConfirmButton: false,
				timer: 1200,
			}).then(() => {
				dispatch(addArrayImg([]));
			});
		} catch (error: any) {
			if (error.response.status === 500) {
				Swal.fire({
					position: "center",
					icon: "error",
					title: "Hubo un error al editar el producto",
					showConfirmButton: false,
					timer: 1500,
				});
			}
		}
	};

	const handleClickEditarProducto = () => {
		setViewError(true);
		if (state.arrayImg.images.length > 0) {
			setErrorImg(false);
			if (state.arrayImg.firstImg === false) {
				setErrorSelectedImg(true);
			} else {
				setErrorSelectedImg(false);
			}
		} else {
			setErrorImg(true);
		}
	};

	return (
		<>
			<Flex w={"100%"} justifyContent={"center"}>
				<Flex
					width={{ base: "100%" }}
					justifyContent={{ base: "center", lg: "start" }}
					paddingLeft={{ base: "0vw" }}
					paddingBottom={"2em"}
					flexDirection={"column"}
				>
					<Flex
						justifyContent={"center"}
						marginTop={"5"}
						marginBottom={"4"}
						id={"basic"}
					>
						<Text fontSize={"xx-large"}>Editar producto</Text>
					</Flex>
					<Formik
						initialValues={initialValues}
						validationSchema={Validations}
						onSubmit={submitForm}
					>
						{({ values, errors, touched, handleChange, handleBlur }) => (
							<Form id="form">
					
								<CardBasic
									name={values.name}
									description={values.description}
									handleChangeInput={handleChange}
									handleChangeTextArea={handleChange}
									handleBlurInput={handleBlur}
									handleBlurTextArea={handleBlur}
									errors={errors}
									touched={touched}
								/>

								<CardCategories
									handleChange={handleChange}
									value={values.category}
								/>

								<CardAddImg error={errorImg} edit={true}/>

								<CardSelectImg error={errorSelectedImg} edit={true}/>

								<CardProductQuantity
									errors={errors}
									value={values.stock}
									touched={touched}
									handleBlur={handleBlur}
									handleChange={handleChange}
								/>

								<CardPriceProduct
									errors={errors}
									touched={touched}
									handleBlur={handleBlur}
									handleChange={handleChange}
									oneMounth={values.oneMonth}
									threeMounth={values.threeMonth}
									sixMounth={values.sixMonth}
									twelveMounth={values.twelveMonth}
								/>

								<Flex
									w={"100%"}
									marginTop={"5"}
									justifyContent="center"
									alignItems={"center"}
									flexDirection={"column"}
								>
									{viewErrors === true ? (
										<Errors
											errors={errors}
											errorImg={errorImg}
											errorSelectedImg={errorSelectedImg}
										/>
									) : (
										""
									)}

									<Flex w={"100%"} justifyContent={"center"}>
										<Button
											marginTop={6}
											type="submit"
											variant="outline"
											borderColor="#e2e8f0"
											onClick={handleClickEditarProducto}
										>
											Editar producto
										</Button>
									</Flex>
								</Flex>
							</Form>
						)}
					</Formik>
				</Flex>
			</Flex>
		</>
	);
};

export default EditProduct;
