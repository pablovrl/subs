import React from "react";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FaSistrix } from "react-icons/fa";

export default function SearchInput() {
	return (
		<InputGroup>
			<InputLeftElement>
				<FaSistrix size={20} />
			</InputLeftElement>
			<Input placeholder="Buscar ..." variant={"filled"} zIndex={1} />
		</InputGroup>
	);
}
