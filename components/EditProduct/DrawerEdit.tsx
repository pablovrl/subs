import React, { useState, useEffect } from "react";
import {
	Flex,
	Text,
	Button,
	NumberInput,
	NumberInputField,
	Stack,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import valuesEditProduct from "../../interfaces/ValuesEditProduct";
import TextInput from "../AddNewProduct/TextInput";
import TextArea from "../AddNewProduct/TextArea";
import Select from "../AddNewProduct/Select";
import Categoria from "../../interfaces/Category";
import axios from "axios";
import Validations from "../AddNewProduct/Validations";

interface TypeProps {
	productEdit: any;
}

export default function DrawerEdit({ productEdit }: TypeProps) {
	useEffect(() => {
		const getCategoria = async () => {
			const res = await axios.get("/api/categoria");
			setCategories(res.data);
		};

		console.log(productEdit);
		getCategoria();
	}, []);

	const initialValues: valuesEditProduct = {
		name: productEdit.nombre,
		description: productEdit.detalles,
		category: productEdit.categoria[0],
		stock: productEdit.stock,
		oneMonth: productEdit.periodos[0].precio,
		threeMonth: productEdit.periodos[1].precio,
		sixMonth: productEdit.periodos[2].precio,
		twelveMonth: productEdit.periodos[3].precio,
	};

	const [categories, setCategories] = useState<Categoria[]>([]);

	const submitForm = (values: any) => {
		console.log(values);
	};

	const editProduct = (values: valuesEditProduct) => {
		console.log(values);
	};

	return (
		<Flex w={"100%"} direction={"column"}>
			<Flex w={"100%"} justifyContent={"center"} marginTop={"6"}>
				<Text fontSize={"x-large"}>Editar Producto</Text>
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
					<Form onSubmit={handleSubmit} id="form">
						<Stack w={"100%"} alignItems={"center"}>
							<Flex w={"75%"} direction={"column"}>
								<TextInput
									title="Nombre"
									name="name"
									placeHolder="Ingrese el nombre del producto"
									value={values.name}
									handleBlur={handleBlur}
									onChange={handleChange}
								/>
								{touched.name && errors.name && (
									<Flex w={"88%"} marginLeft={1} marginTop={0.5}>
										<Text color={"red"}>{errors.name}</Text>
									</Flex>
								)}
							</Flex>

							<Flex w={"75%"} direction={"column"}>
								<TextArea
									title="Descripción"
									name="description"
									placeHolder="Ingrese la descripción del producto"
									value={values.description}
									handleBlur={handleBlur}
									onChange={handleChange}
								/>
								{touched.description && errors.description && (
									<Flex w={"88%"} marginLeft={1} marginTop={0.5}>
										<Text color={"red"}>{errors.description}</Text>
									</Flex>
								)}
							</Flex>

							<Flex w={"90%"} justifyContent={"center"} marginTop={"3"}>
								<Select
									title="Categoría principal"
									categories={categories}
									text="Seleccione la categoría más relacionada con su producto."
									fontSizeText={"sm"}
									//value={values.category}
									onChange={handleChange}
								/>
							</Flex>

							<Stack w={"70%"}>
								<Flex marginLeft={2} marginTop={2}>
									<Text>Cantidad de stock disponible</Text>
								</Flex>

								<NumberInput defaultValue={values.stock}>
									<NumberInputField
										placeholder="Número de stock del producto"
										onChange={handleChange}
										maxLength={7}
										name="stock"
										onBlur={handleBlur}
									/>
								</NumberInput>

								{touched.stock && errors.stock && (
									<Flex w={"88%"} marginLeft={1} marginTop={0.5}>
										<Text color={"red"}>{errors.stock}</Text>
									</Flex>
								)}
							</Stack>

							<Stack w={"70%"}>
								<Flex paddingY={"3"} marginLeft={"3"}>
									<Text fontSize={"lg"}>Precios del producto</Text>
								</Flex>
								<Flex
									alignItems={"center"}
									justifyContent={{ base: "space-between", md: "space-around" }}
								>
									<Text marginLeft={{ base: 1, md: 3 }}>1 Mes</Text>
									<NumberInput w={"60%"} defaultValue={values.oneMonth}>
										<NumberInputField
											name="oneMonth"
											placeholder="Precio 1 mes"
											maxLength={7}
											onChange={handleChange}
											onBlur={handleBlur}
										/>
									</NumberInput>
								</Flex>
								{touched.oneMonth && errors.oneMonth && (
									<Flex
										w={"100%"}
										justifyContent={{
											base: "space-between",
											md: "space-around",
										}}
									>
										<Text opacity={0}>1 Meses</Text>
										<Text color={"red"} w={"60%"}>
											{errors.oneMonth}
										</Text>
									</Flex>
								)}
								<Flex
									alignItems={"center"}
									justifyContent={{ base: "space-between", md: "space-around" }}
								>
									<Text textAlign={"center"}>3 Meses</Text>
									<NumberInput w={"60%"} defaultValue={values.threeMonth}>
										<NumberInputField
											name="threeMonth"
											maxLength={7}
											placeholder="Precio 3 meses"
											onChange={handleChange}
											defaultValue={values.threeMonth}
											onBlur={handleBlur}
										/>
									</NumberInput>
								</Flex>
								{touched.threeMonth && errors.threeMonth && (
									<Flex
										w={"100%"}
										justifyContent={{
											base: "space-between",
											md: "space-around",
										}}
									>
										<Text opacity={0}>3 Meses</Text>
										<Text color={"red"} w={"60%"}>
											{errors.threeMonth}
										</Text>
									</Flex>
								)}
								<Flex
									alignItems={"center"}
									justifyContent={{ base: "space-between", md: "space-around" }}
								>
									<Text textAlign={"center"}>6 Meses</Text>
									<NumberInput w={"60%"} defaultValue={values.sixMonth}>
										<NumberInputField
											name="sixMonth"
											maxLength={7}
											placeholder="Precio 6 meses"
											onChange={handleChange}
											onBlur={handleBlur}
										/>
									</NumberInput>
								</Flex>
								{touched.sixMonth && errors.sixMonth && (
									<Flex
										w={"100%"}
										justifyContent={{
											base: "space-between",
											md: "space-around",
										}}
									>
										<Text opacity={0}>6 Meses</Text>
										<Text color={"red"} w={"60%"}>
											{errors.sixMonth}
										</Text>
									</Flex>
								)}
								<Flex
									alignItems={"center"}
									justifyContent={{ base: "space-between", md: "space-around" }}
								>
									<Text textAlign={"center"}>12 Meses</Text>
									<NumberInput w={"60%"} defaultValue={values.twelveMonth}>
										<NumberInputField
											name="twelveMonth"
											maxLength={7}
											placeholder="Precio 12 meses"
											onChange={handleChange}
											pattern="[0-9]*"
											onBlur={handleBlur}
										/>
									</NumberInput>
								</Flex>
								{touched.twelveMonth && errors.twelveMonth && (
									<Flex
										w={"100%"}
										justifyContent={{
											base: "space-between",
											md: "space-around",
										}}
									>
										<Text opacity={0}>12 Meses</Text>
										<Text color={"red"} w={"60%"}>
											{errors.twelveMonth}
										</Text>
									</Flex>
								)}
							</Stack>
						</Stack>

						<Flex w={"100%"} justifyContent={"center"} marginTop={"4"}>
							<Button
								marginTop={6}
								type="submit"
								variant="outline"
								borderColor="#e2e8f0"
								onClick={() => {
									editProduct(values);
								}}
							>
								Editar Producto
							</Button>
						</Flex>
					</Form>
				)}
			</Formik>
		</Flex>
	);
}
