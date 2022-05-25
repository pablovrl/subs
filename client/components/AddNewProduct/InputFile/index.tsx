import React, { useState, useEffect, MouseEventHandler } from "react";
import { Flex, Grid, GridItem, Image, Text, Button } from "@chakra-ui/react";
import DropZoneComponent from "./InputFile";
import FileInput from "../../../interfaces/fileInput";
import { useDispatch } from "react-redux";
import { addArrayImg } from "../../../redux/addNewProduct/action";

interface FileInputProps {
	error: boolean;
}

export default function fileInput({ error }: FileInputProps) {
	const [files, setFiles] = useState<FileInput[]>([]);
	const dispatch = useDispatch();

	useEffect(() => {
		if (files.length !== 0) {
			dispatch(addArrayImg(files));
		}
	}, [files]);

	const handleClick = (id: number) => {
		const newFiles: FileInput[] = [];

		files.map((file) => {
			if (file.id !== id) {
				newFiles.push(file);
			}
		});

		newFiles.map((file, i) => {
			file.id = i + 1;
		});
		setFiles(newFiles);
		dispatch(addArrayImg(newFiles));
	};

	return (
		<>
			<Flex
				width={"100%"}
				justifyContent={"center"}
				marginTop={"4"}
				paddingBottom={"4"}
			>
				<DropZoneComponent setFile={setFiles} files={files} />
			</Flex>

			<Grid
				marginX={4}
				templateColumns={{ base: "repeat(4, 2fr)", md: "repeat(4, 0.8fr)" }}
				marginTop={{ base: "1em", md: "0.5em" }}
				gap={6}
			>
				{files.length !== 0 ? (
					files.map((file) => (
						<GridItem key={file.id} colSpan={1} h={16}>
							<Flex w={"100%"} h={"100%"} justifyContent={"center"}>
								<Button
									bgColor={"red"}
									color={"white"}
									borderRadius={100}
									position={"absolute"}
									marginTop={{ base: "0.4em", sm: "-0.5", md: "-2" }}
									marginLeft={{ base: "3.8em", sm: "5.5em", md: "7em" }}
									size={"xs"}
									onClick={() => handleClick(file.id)}
								>
									x
								</Button>

								<Image key={file.id} src={file.preview} objectFit={"contain"} />
							</Flex>
						</GridItem>
					))
				) : (
					<Text></Text>
				)}
			</Grid>

			{error === true ? (
				<Flex w={"100%"} justifyContent={"center"}>
					<Flex w={"88%"} paddingX={3} justifyContent={"center"}>
						<Text color={"red"}>Por favor, introduzca una imagen.</Text>
					</Flex>
				</Flex>
			) : files.length === 0 ? (
				<Flex paddingX={2} w={"100%"} justifyContent={"center"}>
					<Text
						textAlign={"center"}
						color={"red"}
						width={{ base: "84%", md: "20em" }}
					>
						Solo se permiten un máximo de 4 imágenes que sean de tipo JPG, JPEG y PNG.
					</Text>
				</Flex>
			) : (
				<Text></Text>
			)}
		</>
	);
}
