import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import axios from "axios";
import store from "../redux/store";
axios.defaults.baseURL = "http://localhost:3001";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider>
			<Provider store={store}>
				<Component {...pageProps} />
			</Provider>
		</ChakraProvider>
	);
}

export default MyApp;
