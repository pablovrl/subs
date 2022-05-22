import React, { useEffect, useState } from "react";
import { Flex, Text, Box } from "@chakra-ui/react";
import Select from "../Select";
import axios from "axios";

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

	useEffect(() => {
		const getCategoria = async () => {
			const res = await axios.get("/api/categoria");
			setCategories(res.data);
		};

		getCategoria();
	}, []);
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
						<Text fontSize={"xl"}>Categoria</Text>
					</Flex>
					<Flex justifyContent={"center"} marginTop={"3"}>
						<Select
							title="Categoria principal"
							categories={categories}
							value={name}
							text="Seleccione la categoria más relacionada con el producto."
							fontSizeText={"sm"}
							onChange={handleChange}
						/>
					</Flex>
				</Box>
			</Flex>
		</>
	);
}
