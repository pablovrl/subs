import React from "react";
import { Flex, Text, Box } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

//*Components
import Button from "../components/AddNewProduct/Button";
import CardBasic from "../components/AddNewProduct/Cards/CardBasic";
import CardProductQuantity from "../components/AddNewProduct/Cards/CardProductQuantity";
import CardPriceProduct from "../components/AddNewProduct/Cards/CardPriceProduct";
import CardAddImg from "../components/AddNewProduct/Cards/CardAddImg";
import CardCategories from "../components/AddNewProduct/Cards/CardAddCategories";
import CardSelectImg from "../components/AddNewProduct/Cards/CardSelectImg";

import type { NextPage } from "next";
import Validations from "../components/AddNewProduct/Validations";
import MyFormValues from "../interfaces/MyFormValues";
import { setTimeout } from "timers";

const AgregarProducto: NextPage = () => {
	const router = useRouter();

	const initialValues: MyFormValues = {
		name: "",
		description: "",
		images: [],
		category: "1",
		labels: [],
		stock: "",
		oneMonth: "",
		threeMonth: "",
		sixMonth: "",
		twelveMonth: "",
	};

	const submitForm = (values: MyFormValues) => {
		axios.post("/api/producto", {
			nombre: values.name,
			detalles: values.description,
			categoriaId: values.category,
			stock: values.stock,
		});

		Swal.fire({
			position: "center",
			icon: "success",
			title: "Producto creado con éxito",
			showConfirmButton: false,
			timer: 1500,
		});

		setTimeout(redirect, 1500);
	};

	const redirect = () => {
		router.push("/");
	};

	return (
		<Box>
			<Flex justifyContent={"center"} marginTop={"5"}>
				<Text fontSize={"3xl"}>Nuevo producto</Text>
			</Flex>
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

						<CardAddImg />

						<CardSelectImg />

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
		</Box>
	);
};

export default AgregarProducto;
