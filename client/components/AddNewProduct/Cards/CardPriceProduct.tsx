import React from "react";
import { FormikErrors, FormikTouched } from "formik";
import MyFormValues from "../../../interfaces/MyFormValues";
import {
	Flex,
	Text,
	Box,
	NumberInput,
	Stack,
	NumberInputField,
} from "@chakra-ui/react";

interface CardPriceProductProps {
	handleChange: React.ChangeEventHandler<HTMLInputElement>;
	errors: FormikErrors<MyFormValues>;
	touched: FormikTouched<MyFormValues>;
	handleBlur: React.FocusEventHandler<HTMLInputElement>;
}

export default function CardPricesProduct({
	handleChange,
	errors,
	touched,
	handleBlur,
}: CardPriceProductProps) {
	return (
		<>
			<Flex marginTop={"5"} justifyContent={"center"}>
				<Box
					w={{ base: "21em", md: "45vw", lg: "48vw" }}
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
						<Text fontSize={"xl"}>Precios del producto</Text>
					</Flex>

					<Flex marginTop={"4"} paddingX={"6"}>
						<Text>
							En este apartado debes introducir el valor de tu producto
							dependiendo los meses de suscripción.
						</Text>
					</Flex>
					<Flex marginTop={"4"} paddingX={"6"} justifyContent={"center"}>
						<Stack w={{ base: "100%", md: "80%" }}>
							<Flex
								alignItems={"center"}
								justifyContent={{ base: "space-between", md: "space-around" }}
							>
								<Text marginLeft={{ base: 1, md: 3 }}>1 Mes</Text>
								<NumberInput w={"60%"}>
									<NumberInputField
										name="oneMonth"
										placeholder="Precio 1 mes"
										onChange={handleChange}
										onBlur={handleBlur}
									/>
								</NumberInput>
							</Flex>
							{touched.oneMonth && errors.oneMonth && (
								<Flex
									w={"100%"}
									justifyContent={{ base: "space-between", md: "space-around" }}
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
								<NumberInput w={"60%"}>
									<NumberInputField
										name="threeMonth"
										placeholder="Precio 3 meses"
										onChange={handleChange}
										onBlur={handleBlur}
									/>
								</NumberInput>
							</Flex>
							{touched.threeMonth && errors.threeMonth && (
								<Flex
									w={"100%"}
									justifyContent={{ base: "space-between", md: "space-around" }}
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
								<NumberInput w={"60%"}>
									<NumberInputField
										name="sixMonth"
										placeholder="Precio 6 meses"
										onChange={handleChange}
										onBlur={handleBlur}
									/>
								</NumberInput>
							</Flex>
							{touched.sixMonth && errors.sixMonth && (
								<Flex
									w={"100%"}
									justifyContent={{ base: "space-between", md: "space-around" }}
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
								<NumberInput w={"60%"}>
									<NumberInputField
										name="twelveMonth"
										placeholder="Precio 12 meses"
										onChange={handleChange}
										onBlur={handleBlur}
									/>
								</NumberInput>
							</Flex>
							{touched.twelveMonth && errors.twelveMonth && (
								<Flex
									w={"100%"}
									justifyContent={{ base: "space-between", md: "space-around" }}
								>
									<Text opacity={0}>12 Meses</Text>
									<Text color={"red"} w={"60%"}>
										{errors.twelveMonth}
									</Text>
								</Flex>
							)}
						</Stack>
					</Flex>
				</Box>
			</Flex>
		</>
	);
}
