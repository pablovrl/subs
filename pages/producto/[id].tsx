import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Product from "../../interfaces/Product";
import PriceBox from "../../components/PriceBox";
import {
	Box,
	Container,
	Flex,
	Heading,
	SimpleGrid,
	Text,
	Grid,
	GridItem,
	Button,
	Divider,
} from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import FilterInput from "../../components/FilterInput";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

const ProductDetails: NextPage = () => {
	const router = useRouter();
	const { id } = router.query;
	const [product, setProduct] = React.useState<Product>();
	const [loading, setLoading] = React.useState(false);
	const [selectedPrice, setSelectedPrice] = useState<number>();

	const handleChangePrice = (id: number) => {
		setSelectedPrice(id);
	};

	useEffect(() => {
		const getProduct = async () => {
			setLoading(true);
			const res = await axios.get(`/api/producto/${id}`);
			setProduct(res.data);
			setLoading(false);
		};
		getProduct();
	}, [id]);

	if (loading || !product) {
		return (
			<Box>
				<h1>Loading...</h1>
			</Box>
		);
	}

	return (
		<Box>
			<Navbar />
			<Container maxW="container.lg">
				<FilterInput />
				<Grid templateColumns="repeat(5, 1fr)" mt={8} gap={4}>
					<GridItem colSpan={{ base: 5, md: 3 }}>
						<Swiper
							navigation={true}
							modules={[Navigation]}
							loop={product.images.length > 1}
						>
							{product.images.map((image) => (
								<SwiperSlide key={image.id}>
									<Box px={14}>
										<Image
											loader={() => `${process.env.URL}/${image.ruta}`}
											src={`${process.env.URL}/${image.ruta}`}
											width={720}
											height={700}
											objectFit="cover"
											style={{ borderRadius: "8px", padding: "100px" }}
										/>
									</Box>
								</SwiperSlide>
							))}
						</Swiper>
					</GridItem>
					<GridItem colSpan={{ base: 5, md: 2 }}>
						<Flex
							border={"2px"}
							p={4}
							borderRadius="lg"
							borderColor={"gray.200"}
							flexDir={"column"}
						>
							<Heading>{product.nombre}</Heading>
							<Text>{product.detalles}</Text>
							<Divider my={4} />
							<SimpleGrid columns={2} gap={2}>
								{product.periodos.map((periodo) => (
									<PriceBox
										key={periodo.id}
										id={periodo.id}
										currentSelected={selectedPrice}
										handleChangePrice={handleChangePrice}
										months={periodo.duracion}
										price={periodo.precio}
									/>
								))}
							</SimpleGrid>
							<Button
								my="4"
								colorScheme={"green"}
								disabled={selectedPrice ? false : true}
							>
								Comprar ahora
							</Button>
						</Flex>
					</GridItem>
				</Grid>
			</Container>
		</Box>
	);
};

export default ProductDetails;
