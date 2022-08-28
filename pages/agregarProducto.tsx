import React, { useState, useEffect } from "react";
import { Flex, Text, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import FormObserver from "../components/AddNewProduct/FormObserver";

import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import FormData from "form-data";
import imgType from "../interfaces/fileInput";
import Errors from "../components/AddNewProduct/Errors";
import { addArrayImg } from "../redux/addNewProduct/action";
import NavBar from "../components/AddNewProduct/NavBarAddProduct/index";

//*Components
import CardBasic from "../components/AddNewProduct/Cards/CardBasic";
import CardProductQuantity from "../components/AddNewProduct/Cards/CardProductQuantity";
import CardPriceProduct from "../components/AddNewProduct/Cards/CardPriceProduct";
import CardCategories from "../components/AddNewProduct/Cards/CardAddCategories";
import CardAddImg from "../components/AddNewProduct/Cards/CardAddImg";
import CardSelectImg from "../components/AddNewProduct/Cards/CardSelectImg";
import MyFormValues from "../interfaces/MyFormValues";
import type { NextPage } from "next";
import Validations from "../components/AddNewProduct/Validations";

const AgregarProducto: NextPage = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const [errorImg, setErrorImg] = useState(false);
	const [basicError, setBasicError] = useState();
	const [viewErrors, setViewError] = useState(false);
	const [errorSelectedImg, setErrorSelectedImg] = useState(false);
	const [createProduct, setCreateProduct] = useState(false);
	const state = useSelector((state: any) => state);
	const [productDatas, setProductDatas] = useState({
		name: "",
		description: "",
		images: state.arrayImg.images,
		category: "1",
		stock: "",
		oneMonth: "",
		threeMonth: "",
		sixMonth: "",
		twelveMonth: "",
	});

	useEffect(() => {
		if (state.arrayImg.images.length > 0) {
			setErrorImg(false);
		}

		if (state.arrayImg.firstImg === true) {
			setErrorSelectedImg(false);
			setCreateProduct(false);
		}
	}, [state]);

	const initialValues: MyFormValues = {
		name: "",
		description: "",
		images: state.arrayImg.images,
		category: "1",
		stock: "0",
		oneMonth: "0",
		threeMonth: "0",
		sixMonth: "0",
		twelveMonth: "0",
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

		images.map((img: imgType, i: number) => {
			data.append("file", images[i].img);
		});

		const res = await axios.post("/api/uploads", data, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		links = res.data.paths;

		postSortImg(links, values);
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

		console.log(body);
		try {
			await axios.post("/api/producto", body);
			Swal.fire({
				position: "center",
				icon: "success",
				title: "El producto se creó correctamente",
				showConfirmButton: false,
				timer: 1200,
			}).then(() => {
				redirect();
				dispatch(addArrayImg([]));
			});
		} catch (error: any) {
			if (error.response.status === 500) {
				Swal.fire({
					position: "center",
					icon: "error",
					title: "Hubo un error en la creación del producto",
					showConfirmButton: false,
					timer: 1500,
				});
			}
		} 
	};

	const redirect = () => {
		router.push("/");
	};

	const handleClickCrearProducto = () => {
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
			<NavBar edit={false} />
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
						<Text fontSize={"xx-large"}>Nuevo producto</Text>
					</Flex>
					<Formik
						initialValues={initialValues}
						validationSchema={Validations}
						onSubmit={submitForm}
					>
						{({ values, errors, touched, handleChange, handleBlur }) => (
							<Form id="form">
								<FormObserver setBasicError={setBasicError} />

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

								<CardCategories handleChange={handleChange} value={values.category} />

								<CardAddImg error={errorImg} />

								<CardSelectImg error={errorSelectedImg} />

								<CardProductQuantity
									errors={errors}
									touched={touched}
									handleBlur={handleBlur}
									handleChange={handleChange}
								/>

								<CardPriceProduct
									errors={errors}
									touched={touched}
									handleBlur={handleBlur}
									handleChange={handleChange}
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
											onClick={handleClickCrearProducto}
										>
											Crear producto
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

export default AgregarProducto;
