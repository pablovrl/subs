import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Provider } from "react-redux";
import axios from "axios";
import store from "../redux/store";
import "@fontsource/dm-sans";
axios.defaults.baseURL = process.env.URL;

const theme = extendTheme({
	fonts: {
		heading: "DM Sans",
		body: "DM Sans",
	},
});

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<Provider store={store}>
				<Component {...pageProps} />
			</Provider>
		</ChakraProvider>
	);
}

export default MyApp;
