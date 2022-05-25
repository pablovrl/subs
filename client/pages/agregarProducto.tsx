import React, { useState, useEffect, useRef } from "react";
import { Flex, Text, Button } from "@chakra-ui/react";
import { Formik, Form, useFormikContext } from "formik";
import FormObserver from "../components/AddNewProduct/FormObserver";

import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import FormData from "form-data";
import imgType from "../interfaces/fileInput";
import Errors from "../components/AddNewProduct/Errors";

//*Components
import CardBasic from "../components/AddNewProduct/Cards/CardBasic";
import CardProductQuantity from "../components/AddNewProduct/Cards/CardProductQuantity";
import CardPriceProduct from "../components/AddNewProduct/Cards/CardPriceProduct";
import CardCategories from "../components/AddNewProduct/Cards/CardAddCategories";
import CardAddImg from "../components/AddNewProduct/Cards/CardAddImg";
import CardSelectImg from "../components/AddNewProduct/Cards/CardSelectImg";
import MyFormValues from "../interfaces/MyFormValues";
import CardRight from "../components/AddNewProduct/Cards/CardRight";
import type { NextPage } from "next";
import Validations from "../components/AddNewProduct/Validations";

const AgregarProducto: NextPage = () => {
	const router = useRouter();
	const [errorImg, setErrorImg] = useState(false);
	const [basicError, setBasicError] = useState();
	const [errorSelectedImg, setErrorSelectedImg] = useState(false);
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
	const formButton = useRef(null);

	useEffect(() => {
		if (state.arrayImg.images.length > 0) {
			setErrorImg(false);
		}

		if (state.arrayImg.firstImg === true) {
			setErrorSelectedImg(false);
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
		if (state.arrayImg.images.length > 0) {
			setErrorImg(false);

			if (state.arrayImg.firstImg === true) {
				postImg(values);
			} else {
				setErrorSelectedImg(true);
			}
		} else {
			setErrorImg(true);
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
			if (values.category === state.arrayCategories.categories[i].nombre) {
				categoriaId = state.arrayCategories.categories[i].id;
			}
		}

		const body = {
			nombre: values.name,
			detalles: values.description,
			stock: values.stock,
			categoriaId: categoriaId,
			imagenes: links,
		};

		try {
			await axios.post("/api/producto", body);
			setTimeout(redirect, 1000);
			Swal.fire({
				position: "center",
				icon: "success",
				title: "Se creo correctamente el producto",
				showConfirmButton: false,
				timer: 1500,
			});
		} catch (error: any) {
			if (error.response.status === 500) {
				Swal.fire({
					position: "center",
					icon: "error",
					title: "error",
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
			{/* <Flex position={"absolute"} zIndex={-1} bgColor={"red"} w={"40em"} h={"40em"}>
				<Flex  />
			</Flex> */}
			<Flex justifyContent={"center"} marginTop={"5"} id={"basic"}>
				<Text fontSize={"xx-large"}>Nuevo producto</Text>
			</Flex>
			<Flex flexDirection={"row"}>
				<Flex
					width={{ base: "100%", lg: "60%" }}
					justifyContent={{ base: "center", lg: "start" }}
					paddingLeft={{ base: "0vw", lg: "6vw" }}
					paddingBottom={"2em"}
				>
					<Formik
						initialValues={initialValues}
						validationSchema={Validations}
						onSubmit={submitForm}
					>
						{({
							values,
							errors,
							touched,
							handleSubmit,
							handleChange,
							handleBlur,
						}) => (
							<Form onSubmit={handleSubmit} id="form">
								<FormObserver
									setProductDatas={setProductDatas}
									setBasicError={setBasicError}
									basicError={basicError}
								/>

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
									name={values.category}
									handleChange={handleChange}
								/>

								<CardAddImg error={errorImg} />

								<CardProductQuantity
									errors={errors}
									touched={touched}
									handleBlur={handleBlur}
									handleChange={handleChange}
								/>

								<CardSelectImg error={errorSelectedImg} />

								<CardPriceProduct
									errors={errors}
									touched={touched}
									handleBlur={handleBlur}
									handleChange={handleChange}
								/>

								<Flex
									w={"100%"}
									marginTop={"5"}
									display={{ base: "flex", lg: "none" }}
									justifyContent="center"
									flexDirection={"column"}
								>
									<Errors
										errors={errors}
										errorImg={errorImg}
										errorSelectedImg={errorSelectedImg}
									/>

									<Button
										marginTop={6}
										type="submit"
										ref={formButton}
										variant="outline"
										borderColor="#e2e8f0"
										onClick={handleClickCrearProducto}
									>
										Crear producto
									</Button>
								</Flex>
							</Form>
						)}
					</Formik>
				</Flex>
				<CardRight
					productDatas={productDatas}
					imgs={state.arrayImg.images}
					firstImg={state.arrayImg.sortImg}
					refButton={formButton}
					errors={basicError}
					errorImg={errorImg}
					errorSelectedImg={errorSelectedImg}
				/>
			</Flex>
		</>
	);
};

export default AgregarProducto;
