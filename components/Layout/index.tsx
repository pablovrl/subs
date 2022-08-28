import { Box, Container } from "@chakra-ui/react";
import React from "react";
import Navbar from "../Navbar";
import FilterInput from "../FilterInput";

const Layout = ({ children }: { children: React.ReactNode }) => (
	<Box>
		<Navbar />
		<Container maxW="container.lg">
			<FilterInput />
			{children}
		</Container>
	</Box>
);
export default Layout;
