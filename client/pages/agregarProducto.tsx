import React from "react";
import { Flex, Text, Box } from "@chakra-ui/react";
import { Formik, Form } from "formik";

//*Components
import Button from "../components/AddNewProduct/Button";
import CardBasic from "../components/AddNewProduct/Cards/CardBasic";
import CardProductQuantity from "../components/AddNewProduct/Cards/CardProductQuantity";
import CardPriceProduct from "../components/AddNewProduct/Cards/CardPriceProduct";
import CardCategories from "../components/AddNewProduct/Cards/CardAddCategories";

import type { NextPage } from "next";
import Validations from "../components/AddNewProduct/Validations";

interface MyFormValues {
	name: string;
	description: string;
	category: string;
	labels: string[];
	stock: string;
	oneMonth: string;
	threeMonth: string;
	sixMonth: string;
	twelveMonth: string;
}

const AgregarProducto: NextPage = () => {
	const initialValues: MyFormValues = {
		name: "",
		description: "",
		category: "Animales",
		labels: [],
		stock: "",
		oneMonth: "",
		threeMonth: "",
		sixMonth: "",
		twelveMonth: "",
	};

	const submitForm = (values: MyFormValues) => {
		console.log(values);
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
