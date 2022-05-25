import React from "react";
import { Flex, Text, Box } from "@chakra-ui/react";
import InputText from "../TextInput";
import TextArea from "../TextArea";
import { FormikErrors, FormikTouched } from "formik";
import MyFormValues from "../../../interfaces/MyFormValues";

interface inputs {
	name: string;
	description: string;
	errors: FormikErrors<MyFormValues>;
	touched: FormikTouched<MyFormValues>;
	handleBlurInput: React.FocusEventHandler<HTMLInputElement>;
	handleBlurTextArea: React.FocusEventHandler<HTMLTextAreaElement>;
	handleChangeInput: React.ChangeEventHandler<HTMLInputElement>;
	handleChangeTextArea: React.ChangeEventHandler<HTMLTextAreaElement>;
}

export default function cardBasic({
	name,
	description,
	errors,
	touched,
	handleBlurInput,
	handleBlurTextArea,
	handleChangeInput,
	handleChangeTextArea,
}: inputs) {
	return (
		<>
			<Flex marginTop={"5"} justifyContent={"center"} >
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
						<Text fontSize={{base: "xl"}}>Información básica</Text>
					</Flex>
					<Flex alignItems={"center"} flexDirection={"column"}>
						<Flex marginTop={{base: 2, md: 3}} w={"88%"} justifyContent={"center"}>
							<InputText
								title="Nombre"
								name="name"
								placeHolder="Ingrese el nombre del producto"
								value={name}
								handleBlur={handleBlurInput}
								onChange={handleChangeInput}
							/>
						</Flex>
						{touched.name && errors.name && (
							<Flex w={"88%"} marginLeft={1} marginTop={0.5}>
								<Text color={"red"}>{errors.name}</Text>
							</Flex>
						)}
					</Flex>
					<Flex alignItems={"center"} flexDirection={"column"}>
						<Flex marginTop={{base: 1, md: 3}} w={"88%"} justifyContent={"center"}>
							<TextArea
								title="Descripción"
								name="description"
								placeHolder="Ingrese la descripción del producto"
								value={description}
								handleBlur={handleBlurTextArea}
								onChange={handleChangeTextArea}
							/>
						</Flex>
						{touched.description && errors.description && (
							<Flex w={"88%"} marginLeft={1} marginTop={0.5}>
								<Text color={"red"}>{errors.description}</Text>
							</Flex>
						)}
					</Flex>
				</Box>
			</Flex>
		</>
	);
}
