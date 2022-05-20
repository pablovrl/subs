import React, { useState, useEffect } from "react";
import { Flex, Grid, GridItem, Image, Text, Button } from "@chakra-ui/react";
import DropZoneComponent from "./InputFile";
import FileInput from "../../../interfaces/fileInput";
import { useDispatch } from "react-redux";
import { addImg, deleteImg } from "../../../redux/addNewProduct/action";
//import axios from "axios";
//import FormData from "form-data";
interface FileInputProps {
	error: boolean;
}

export default function fileInput({ error }: FileInputProps) {
	const [files, setFiles] = useState<FileInput[]>([]);
	const dispatch = useDispatch();

	useEffect(() => {
		if (files.length !== 0) {
			let newFiles: FileInput[] = [];

			newFiles = files;

			dispatch(addImg(newFiles));
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
		dispatch(deleteImg(newFiles));
	};

	const handleClickPost = () => {
		dispatch(addImg(files));
		//* post imagen
		/* const data = new FormData();
		data.append("file", files[0].img );

		axios.post("http://localhost:3001/api/uploads", data, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		}); */
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

			<Grid paddingX={4} templateColumns="repeat(4, 1fr)" gap={6}>
				{files.length !== 0 ? (
					files.map((file) => (
						<GridItem key={file.id} colSpan={1} h="12">
							<Button
								bgColor={"red"}
								color={"white"}
								position={"absolute"}
								marginLeft={10}
								marginTop={-2}
								borderRadius={100}
								size={"xs"}
								onClick={() => handleClick(file.id)}
							>
								x
							</Button>

							<Image
								key={file.id}
								src={file.preview}
								w={"100%"}
								h={"100%"}
								objectFit={"contain"}
							/>
						</GridItem>
					))
				) : (
					<Text></Text>
				)}
			</Grid>

			{error === true ? (
				<Flex w={"100%"} justifyContent={"center"} >
					<Flex w={"88%"} paddingX={3} >
						<Text color={"red"}>Por favor introduzca una imagen.</Text>
					</Flex>
				</Flex>
			):(
				files.length === 0 ? (
					<Flex paddingX={4}>
						<Text textAlign={"center"} color={"red"}>
							Solo se permiten un máximo de 6 imágenes de tipo jpg, jpeg y png
						</Text>
					</Flex>
				) : (
					<Text></Text>
				)
			)}

			

			<Button onClick={handleClickPost}>PostImg</Button>
		</>
	);
}
