import React, { SetStateAction, useMemo } from "react";
import { Flex, Text, Image } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import fileInput from "../../../interfaces/fileInput";
import Swal from "sweetalert2";

interface FileInputProps {
	files: fileInput[];
	setFile: React.Dispatch<SetStateAction<fileInput[]>>;
}

const focusedStyle = {
	borderColor: "#2196f3",
};

const acceptStyle = {
	borderColor: "#00e676",
};

const rejectStyle = {
	borderColor: "#ff1744",
};

const baseStyle: React.CSSProperties = {
	width: "84%",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	padding: "20px 5px 20px 5px",
	marginTop: 10,
	borderWidth: 2,
	borderRadius: 10,
	borderColor: "#eeeeee",
	borderStyle: "dashed",
	backgroundColor: "#fafafa",
	color: "#bdbdbd",
	outline: "none",
	transition: "border .24s ease-in-out",
};

export default function FileInput({ setFile, files }: FileInputProps) {
	const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
		useDropzone({
			accept: {
				"image/jpeg": [],
				"image/png": [],
			},
			onDrop: (acceptedFiles: File[]) => {
				if (acceptedFiles[0] !== undefined) {
					//console.log(acceptedFiles);
					if (files.length < 2) {
						setFile((old) => [
							...old,
							{
								id: files.length + 1,
								img: acceptedFiles[0],
								preview: URL.createObjectURL(acceptedFiles[0]),
								state: false,
							},
						]);
					} else {
						Swal.fire({
							icon: "error",
							title: "Error :(",
							text: "Alcanzaste el limite de imagenes",
							confirmButtonColor: "#3085d6",
							confirmButtonText: "Volver",
						});
					}
				} else {
					Swal.fire({
						icon: "error",
						title: "Error :(",
						text: "No se aceptan este tipo de archivos :(",
						confirmButtonColor: "#3085d6",
						confirmButtonText: "Volver",
					});
				}
			},
		});

	const style = useMemo(
		() => ({
			...baseStyle,
			...(isFocused ? focusedStyle : {}),
			...(isDragAccept ? acceptStyle : {}),
			...(isDragReject ? rejectStyle : {}),
		}),
		[isFocused, isDragAccept, isDragReject]
	);

	return (
		<>
			<Flex {...getRootProps({ style })}>
				<Flex>
					<input
						{...getInputProps()}
						onChange={(e) => console.log(e.currentTarget)}
					/>
					<Flex flexDirection={"column"} alignItems={"center"} paddingX={8}>
						<Image src="./addPhoto.png" w={14} h={14} />
						<Text marginTop={2} textAlign={"center"}>
							Suelte o haga clic aquí para cargar las imagenes de su producto.
						</Text>
					</Flex>
				</Flex>
			</Flex>
		</>
	);
}
