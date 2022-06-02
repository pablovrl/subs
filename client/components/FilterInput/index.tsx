import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import React, { useState } from "react";
import Router from "next/router";

const FilterInput = () => {
	const [value, setValue] = useState("");

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		Router.push(`/buscar/nombre?query=${value}`);
	};

	return (
		<form onSubmit={handleSubmit}>
			<InputGroup>
				<InputLeftElement pointerEvents={"none"}>
					<AiOutlineSearch size="25" />
				</InputLeftElement>
				<Input
					value={value}
					type="text"
					onChange={(e) => setValue(e.target.value)}
					placeholder="Aquí puedes buscar productos de tu interés :)"
				/>
			</InputGroup>
		</form>
	);
};

export default FilterInput;
