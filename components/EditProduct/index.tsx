import React, { useState, useEffect } from "react";
import { Flex, Text, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import FormObserver from "../AddNewProduct/FormObserver";
import Product from "../../interfaces/Product";

import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import FormData from "form-data";
import imgType from "../../interfaces/fileInput";
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


const EditProduct = ({productEdit}: any) => {
	const router = useRouter();
	const dispatch = useDispatch();
	const [errorImg, setErrorImg] = useState(false);
	const [basicError, setBasicError] = useState();
	const [viewErrors, setViewError] = useState(false);
	const [errorSelectedImg, setErrorSelectedImg] = useState(false);
	const [createProduct, setCreateProduct] = useState(false);
	const state = useSelector((state: any) => state);
	/* const [productDatas, setProductDatas] = useState({
		name: "",
		description: "",
		images: state.arrayImg.images,
		category: "4",
		stock: "",
		oneMonth: "",
		threeMonth: "",
		sixMonth: "",
		twelveMonth: "",
	}); */

	useEffect(() => {
		if (state.arrayImg.images.length > 0) {
			setErrorImg(false);
		}

		if (state.arrayImg.firstImg === true) {
			setErrorSelectedImg(false);
			setCreateProduct(false);
		}
		//console.log(productEdit.categoria[0]);
	}, [state]);

	useEffect(() => {
		const files = productEdit.images;
		const addPreviewImg:any = [];

		files.map((img:any) => {
			addPreviewImg.push({
				id: img.id,
				productoId: img.productoId,
				preview: img.ruta
			});
		});

		dispatch(addArrayImg(addPreviewImg));
	}, []);
	
	const initialValues: MyFormValues = {
		name: productEdit.nombre,
		description: productEdit.detalles,
		images: state.arrayImg.images,
		category: productEdit.categoria[0].id,
		stock: productEdit.stock,
		oneMonth: productEdit.periodos[0].precio,
		threeMonth: productEdit.periodos[1].precio,
		sixMonth: productEdit.periodos[2].precio,
		twelveMonth: productEdit.periodos[3].precio,
	};

	const submitForm = (values: MyFormValues) => {
		if (errorSelectedImg === false) {
			if (createProduct === false) {
				if (state.arrayImg.images.length > 0) {
					setErrorImg(false);

					if (state.arrayImg.firstImg === true) {
						//postImg(values);
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

								<CardCategories handleChange={handleChange} value={values.category}/>

								<CardAddImg error={errorImg} />

								<CardSelectImg error={errorSelectedImg} />

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
											//onClick={handleClickCrearProducto}
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
