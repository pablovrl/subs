import React from "react";
import { Flex, Text, Grid, GridItem, Image, Button } from "@chakra-ui/react";
import porductType from "../../../interfaces/MyFormValues";
import Errors from "../Errors";

interface CardRightProps {
	productDatas: porductType;
	imgs: any;
	firstImg: any;
	refButton: any;
	errorImg: boolean,
	viewErrors: boolean,
	errorSelectedImg: boolean,
	errors: any

}

export default function CardRight({
	productDatas,
	imgs,
	firstImg,
	refButton,
	errorImg,
	viewErrors,
	errorSelectedImg,
	errors
}: CardRightProps) {
	
	const handleClick = () => {
		refButton.current.click();
	};


	return (
		<Flex
			w={{ base: "0%", md: "40%", lg: "40%" }}
			display={{ base: "none", lg: "flex" }}
			marginTop={4}
			justifyContent={"center"}
		>
			<Flex
				position={"fixed"}
				boxShadow={"2xl"}
				borderRadius={"15"}
				borderWidth={"1px"}
				w={{ base: "36vw", xl: "32vw" }}
				h={"40em"}
				overflowY={"scroll"}
				overflowX={"hidden"}
				justifyContent={"center"}
			>
				<Flex w={"92%"} flexDirection={"column"} h={"auto"}>
					<Flex
						justifyContent={"center"}
						borderBottomWidth={"1px"}
						paddingY={"3"}
					>
						<Text fontSize={"xl"}>Datos del producto</Text>
					</Flex>
					<Flex
						marginTop={4}
						w={"100%"}
						height={"auto"}
						wordBreak={"break-word"}
					>
						<Text fontSize={"lg"}>Nombre:</Text>
						<Flex marginLeft={"4"} w={"70%"}>
							<Text fontSize={"lg"}>{productDatas.name}</Text>
						</Flex>
					</Flex>
					<Flex
						marginTop={2}
						w={"100%"}
						height={"auto"}
						wordBreak={"break-word"}
						flexDirection={"column"}
					>
						<Text fontSize={"lg"} float={"left"}>
							Descripción:
						</Text>
						<Flex w={"100%"}>
							<Text fontSize={"lg"}>{productDatas.description}</Text>
						</Flex>
					</Flex>

					<Flex marginTop={2}>
						<Text fontSize={"lg"}>Categoría:</Text>
						<Text fontSize={"lg"} marginLeft={"4"}>
							{productDatas.category}
						</Text>
					</Flex>

					<Flex marginTop={2} height={"auto"} flexDirection={"column"}>
						<Text fontSize={"lg"}>Imágenes:</Text>
						<Flex>
							<Grid
								templateColumns={{
									md: "repeat(4, 0.8fr)",
								}}
								marginTop={{ base: "1em", md: "0.5em" }}
								gap={6}
							>
								{imgs.length !== 0 ? (
									imgs.map((img: any, i: number) => (
										<GridItem key={i} colSpan={1} h={16}>
											<Flex w={"100%"} h={"100%"} justifyContent={"center"}>
												<Image
													key={i}
													src={img.preview}
													objectFit={"contain"}
												/>
											</Flex>
										</GridItem>
									))
								) : (
									<GridItem colSpan={4}>
										<Text>No se han agregado imágenes.</Text>
									</GridItem>
								)}
							</Grid>
						</Flex>
					</Flex>
					<Flex marginTop={2}>
						<Text fontSize={"lg"}>Stock:</Text>
						<Text fontSize={"lg"} marginLeft={4}>
							{productDatas.stock}
						</Text>
					</Flex>
					<Flex marginTop={2} flexDirection={"column"}>
						<Text fontSize={"lg"}>Imagen de portada:</Text>
						<Flex>
							{firstImg.length !== 0 ? (
								<Image
									src={firstImg[0].preview}
									alt={firstImg[0].preview}
									w={180}
									h={"auto"}
								/>
							) : (
								<Text>Aún no se selecciona foto para la portada</Text>
							)}
						</Flex>
					</Flex>
					<Flex marginTop={2} flexDirection={"column"}>
						<Text fontSize={"lg"}>Precios del producto:</Text>
						<Flex marginLeft={2} marginTop={4} w={"100%"}>
							<Text fontSize={"lg"} marginLeft={6}>
								1 Mes:
							</Text>
							<Text fontSize={"lg"} marginLeft={4}>
								{productDatas.oneMonth}
							</Text>
						</Flex>
						<Flex marginLeft={2} marginTop={2} w={"100%"}>
							<Text fontSize={"lg"}>3 Meses: </Text>
							<Text fontSize={"lg"} marginLeft={4}>
								{productDatas.threeMonth}
							</Text>
						</Flex>
						<Flex marginLeft={2} marginTop={2} w={"100%"}>
							<Text fontSize={"lg"}>6 Meses</Text>
							<Text fontSize={"lg"} marginLeft={5}>
								{productDatas.sixMonth}
							</Text>
						</Flex>
						<Flex marginLeft={2} marginTop={2} w={"100%"}>
							<Text fontSize={"lg"}>12 Meses</Text>
							<Text fontSize={"lg"} marginLeft={4}>
								{productDatas.twelveMonth}
							</Text>
						</Flex>
					</Flex>
					<Flex w={"100%"} justifyContent={"center"} paddingY={"1em"} flexDir={"column"}>
						{
							(errors !== undefined && viewErrors === true) ? (
								<Errors errors={errors} errorImg={errorImg} errorSelectedImg={errorSelectedImg}/>
							):("")
						}
					
						<Flex justifyContent={"center"} >
						
							<Button type="submit" variant="outline" borderColor="#e2e8f0" onClick={handleClick}  marginTop={6}>
								Crear producto
							</Button>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
}
