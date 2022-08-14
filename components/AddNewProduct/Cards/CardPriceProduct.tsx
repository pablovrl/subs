import React from "react";
import { FormikErrors, FormikTouched } from "formik";
import MyFormValues from "../../../interfaces/MyFormValues";
import {
	Flex,
	Text,
	Box,
	Stack,
	Input,
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
					w={{ base: "21em", sm: "26em", md: "30em", lg: "48vw" }}
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
						<Text fontSize={"xl"}>Precios del producto</Text>
					</Flex>

					<Flex marginTop={"4"} w={"100%"} justifyContent={"center"}>
						<Text w={{ base: "100%", md: "80%" }} paddingX={"8"}>
							En esta sección se requiere que agregues los valores
							correspondientes según la cantidad de meses que se adquiera tu
							producto.
						</Text>
					</Flex>
					<Flex marginTop={"4"} paddingX={"6"} justifyContent={"center"}>
						<Stack w={{ base: "100%", md: "80%" }}>
							<Flex
								alignItems={"center"}
								justifyContent={{ base: "space-between", md: "space-around" }}
							>
								<Text marginLeft={{ base: 1, md: 3 }}>1 Mes</Text>
								<Input
									placeholder="Precio 1 mes"
									w={"60%"}
									onChange={handleChange}
									maxLength={7}
									name="oneMonth"
									onBlur={handleBlur}
								/>
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
								<Input
									placeholder="Precio 3 meses"
									w={"60%"}
									onChange={handleChange}
									maxLength={7}
									name="threeMonth"
									onBlur={handleBlur}
								/>
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
								<Input
									placeholder="Precio 6 meses"
									w={"60%"}
									onChange={handleChange}
									maxLength={7}
									name="sixMonth"
									onBlur={handleBlur}
								/>
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
								<Input
									placeholder="Precio 12 meses"
									w={"60%"}
									onChange={handleChange}
									maxLength={7}
									name="twelveMonth"
									onBlur={handleBlur}
								/>
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
