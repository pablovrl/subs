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
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
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
					if (files.length < 4) {
						let id = 0;
						for (let i = 0; i < acceptedFiles.length; i++) {
							if (files.length > 0) {
								id = files[files.length-1].id + i + 1;
							} else {
								id = i + 1;
							}

							setFile((old) => [
								...old,
								{
									id: id,
									img: acceptedFiles[i],
									preview: URL.createObjectURL(acceptedFiles[i]),
									state: false,
								},
							]);
						}
					} else {
						Swal.fire({
							icon: "error",
							title: "Error",
							text: "Alcanzaste el límite de imágenes",
							confirmButtonColor: "#3085d6",
							confirmButtonText: "Volver",
						});
					}
				} else {
					Swal.fire({
						icon: "error",
						title: "Error",
						text: "No se aceptan ese tipo de archivos",
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
			<Flex {...getRootProps({ style,})} width={{base: "84%", md: "22em"}} paddingY={{base: 5, md: 35}} marginX={{base: 10}} >
				<Flex>
					<input
						{...getInputProps()}
					/>
					<Flex flexDirection={"column"} alignItems={"center"} >
						<Image src="./addPhoto.png" w={14} h={14} />
						<Text marginTop={2} textAlign={"center"}>
							Suelte o haga clic aquí para cargar las imágenes de su producto.
						</Text>
					</Flex>
				</Flex>
			</Flex>
		</>
	);
}
