import React, { useEffect, useState } from "react";
import { Flex, Text, Box, Image, Grid, GridItem } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import imgType from "../../../interfaces/fileInput";
import { addFirstImg, addSortImg } from "../../../redux/addNewProduct/action";
import { useDispatch } from "react-redux";

interface CardSelectImgProps {
	error: boolean;
}

export default function CardSelectImg({ error }: CardSelectImgProps) {
	const dispatch = useDispatch();
	const state = useSelector((state: any) => state.arrayImg.images);
	const [images, setImages] = useState([]);
	const [imgSelected, setImgSelected] = useState<imgType>();

	useEffect(() => {
		setImages(state);

		const verifyImg = () => {
			let found = false;
			for (let i = 0; i < state.length; i++) {
				if (state[i] === imgSelected) {
					found = true;
				}
			}
			if (!found) {
				setImgSelected(undefined);
			}
		};

		verifyImg();
	}, [state]);

	useEffect(() => {
		const sortImg = () => {
			const newArrayImg = [];

			if (imgSelected === undefined) {
				dispatch(addFirstImg(false));
			} else {
				dispatch(addFirstImg(true));

				newArrayImg[0] = imgSelected;

				for (let i = 0; i < images.length; i++) {
					if (imgSelected !== images[i]) {
						newArrayImg.push(images[i]);
					}
				}
				dispatch(addSortImg(newArrayImg));
			}
		};
		sortImg();
	}, [imgSelected, state]);

	const handleClickImg = (img: imgType) => {
		setImgSelected(img);
	};

	const mostrarImg = () => {
		if (images.length > 0) {
			return (
				<>
					<Flex marginTop={"4"} paddingX={"6"}>
						<Text>
							En este apartado debes agregar varias imágenes de tu producto,
							esto hará que tu producto sea más vistoso.
						</Text>
					</Flex>

					<Flex justifyContent={"center"} alignItems={"center"} marginTop={"5"}>
						{imgSelected !== undefined ? (
							<Image
								src={imgSelected.preview}
								alt={imgSelected.img.name}
								w={"80%"}
								h={"50%"}
							/>
						) : (
							<Text>aun no se selecciona la imagen</Text>
						)}
					</Flex>

					<Grid
						paddingX={4}
						templateColumns="repeat(4, 1fr)"
						gap={6}
						marginTop={"6"}
					>
						{images.length > 0 ? (
							images.map((img: imgType) => (
								<GridItem key={img.preview} colSpan={1} h="12">
									{img === imgSelected ? (
										<Flex borderWidth={4} borderColor={"red"}>
											<Image
												src={img.preview}
												alt={img.img.name}
												onClick={() => handleClickImg(img)}
												w={"100%"}
												h={"100%"}
												objectFit={"contain"}
											/>
										</Flex>
									) : (
										<Flex>
											<Image
												src={img.preview}
												alt={img.img.name}
												onClick={() => handleClickImg(img)}
												w={"100%"}
												h={"100%"}
												objectFit={"contain"}
											/>
										</Flex>
									)}
								</GridItem>
							))
						) : (
							<Text></Text>
						)}
					</Grid>

					{error === true ? (
						<Flex w={"100%"} justifyContent={"center"}>
							<Flex w={"88%"} paddingX={3}>
								<Text color={"red"}>Por favor seleccione una imagen para la portada de su producto.</Text>
							</Flex>
						</Flex>
					) : (<Text></Text>)}
				</>
			);
		} else {
			return (
				<Flex marginTop={"4"} paddingX={"6"} justifyContent={{base: "start", md: "center"}}>
					<Text>Se necesita que ingrese por lo menos una imagen.</Text>
				</Flex>
			);
		}
	};

	return (
		<>
			<Flex marginTop={"5"} justifyContent={"center"}>
				<Box
					w={{base: "21em", md: "45vw" ,lg: "48vw"}}
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
						<Text fontSize={"xl"}>Escoger portada</Text>
					</Flex>

					{mostrarImg()}
				</Box>
			</Flex>
		</>
	);
}
