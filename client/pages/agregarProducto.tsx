import React, { useState, useEffect } from "react";
import { Flex, Text, Box } from "@chakra-ui/react";
import { Formik, Form } from "formik";

import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import FormData from "form-data";
import imgType from "../interfaces/fileInput";

//*Components
import Button from "../components/AddNewProduct/Button";
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
	const [errorImg, setErrorImg] = useState(false);
	const [errorSelectedImg, setErrorSelectedImg] = useState(false);
	const state = useSelector((state: any) => state);

	useEffect(() => {
		if (state.arrayImg.images.length > 0) {
			setErrorImg(false);
		}
	}, [state]);

	const initialValues: MyFormValues = {
		name: "",
		description: "",
		images: state.arrayImg.images,
		category: "1",
		stock: "",
		oneMonth: "",
		threeMonth: "",
		sixMonth: "",
		twelveMonth: "",
	};

	const submitForm = (values: MyFormValues) => {
		if (state.arrayImg.images.length > 0) {
			setErrorImg(false);

			if (state.arrayImg.firstImg === true) {
				postImg();

				/* 	axios
					.post("/api/producto", {
						nombre: values.name,
						detalles: values.description,
						categoriaId: values.category,
						stock: values.stock,
					})
					.then((res) => {
						console.log(res);
					});  */

				Swal.fire({
					position: "center",
					icon: "success",
					title: "Producto creado con éxito",
					showConfirmButton: false,
					timer: 1500,
				});

				//setTimeout(redirect, 1200);
			} else {
				setErrorSelectedImg(true);
			}
		} else {
			setErrorImg(true);
		}
	};

	const postImg = () => {
		const data = new FormData();
		const images = state.arrayImg.sortImg;
		let links = [];

		images.map((img: imgType, i: number) => {
			data.append("file", images[i].img);
		});

		axios
			.post("http://localhost:3001/api/uploads", data, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then((res) => {
				links = JSON.parse(res.request.response);
				console.log(links.paths);
			});
	};

	const redirect = () => {
		router.push("/");
	};

	return (
		<Box>
			<Flex justifyContent={"center"} marginTop={"5"}>
				<Text fontSize={"3xl"}>Nuevo producto</Text>
			</Flex>
			<Flex width={{base: "100%"}} justifyContent={{base: "center", md: "start"}} paddingLeft={{base: "0", md: "4.5vw"}}>
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
						<Form onSubmit={handleSubmit}>
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
								marginBottom={"5"}
								justifyContent="center"
							>
								<Button
									type="submit"
									variant="outline"
									text="Crear"
									borderColor="#e2e8f0"
								/>
							</Flex>
						</Form>
					)}
				</Formik>
			</Flex>
		</Box>
	);
};

export default AgregarProducto;
