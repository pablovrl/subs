import React, { useEffect, useState } from "react";
import { Flex, Text, Box } from "@chakra-ui/react";
import Select from "../Select";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addCategories } from "../../../redux/addNewProduct/action";

interface CardAddCategoriesProps {
	name: string;
	handleChange: React.ChangeEventHandler<HTMLSelectElement>;
}
interface Categoria {
	id: number;
	nombre: string;
}

export default function CardAddCategories({
	name,
	handleChange,
}: CardAddCategoriesProps) {
	const [categories, setCategories] = useState<Categoria[]>([]);
	const dispatch = useDispatch();

	useEffect(() => {
		const getCategoria = async () => {
			const res = await axios.get("/api/categoria");
			setCategories(res.data);
			dispatch(addCategories(res.data));
		};

		getCategoria();
	}, []);
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
						<Text fontSize={"xl"}>Categoría</Text>
					</Flex>
					<Flex justifyContent={"center"} marginTop={"3"}>
						<Select
							title="Categoría principal"
							categories={categories}
							value={name}
							text="Seleccione la categoría más relacionada con su producto."
							fontSizeText={"sm"}
							onChange={handleChange}
						/>
					</Flex>
				</Box>
			</Flex>
		</>
	);
}
