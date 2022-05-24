import React from "react";
import { FormikErrors, FormikTouched } from "formik";
import MyFormValues from "../../../interfaces/MyFormValues";
import {
	Flex,
	Text,
	Box,
	NumberInput,
	NumberInputField,
	Stack,
} from "@chakra-ui/react";

interface CardProductQuantity {
	handleChange: React.ChangeEventHandler<HTMLInputElement>;
	errors: FormikErrors<MyFormValues>;
	touched: FormikTouched<MyFormValues>;
	handleBlur: React.FocusEventHandler<HTMLInputElement>;
}

export default function CardProductQuantify({
	handleChange,
	errors,
	touched,
	handleBlur,
}: CardProductQuantity) {
	return (
		<>
			<Flex marginTop={"5"} justifyContent={"center"}>
				<Box
					w={{base: "21em",sm:"26em", md: "30em" ,lg: "48vw"}}
					boxShadow={"md"}
					justifyContent={"center"}
					borderRadius={"10px"}
					borderWidth={"1px"}
					paddingBottom={"6"}
				>
					<Flex
						justifyContent={"center"}
						borderBottomWidth={"1px"}
						paddingY={"3"}
					>
						<Text fontSize={"xl"}>Inventario</Text>
					</Flex>
					<Flex justifyContent={"center"} marginTop={"3"}>
						<Stack w={{ base: "88%", md: "80%" }}>
							<Flex marginLeft={2} marginTop={2}>
								<Text>Cantidad de stock disponible</Text>
							</Flex>

							<NumberInput>
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
					</Flex>
				</Box>
			</Flex>
		</>
	);
}
