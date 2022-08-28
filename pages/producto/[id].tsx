import { GetServerSideProps, NextPage } from "next";
import React, { useState } from "react";
import axios from "axios";
import Product from "../../interfaces/Product";
import PriceBox from "../../components/PriceBox";
import {
	Box,
	Flex,
	Heading,
	SimpleGrid,
	Text,
	Grid,
	GridItem,
	Button,
	Divider,
} from "@chakra-ui/react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import Layout from "../../components/Layout";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async (context) => {
	const id = context.params?.id;
	const { data } = await axios.get(`/api/producto/${id}`);
	const suscribed = await axios.post("/api/suscribe/check", {
		suscriptorId: 1,
		productoId: id,
	});

	if (!data) {
		return {
			notFound: true,
		};
	}
	return {
		props: { product: data, suscribed: suscribed.data.suscribed },
	};
};

interface Props {
	product: Product;
	suscribed: boolean;
}

const ProductDetails: NextPage<Props> = ({ product, suscribed }) => {
	const [selectedPrice, setSelectedPrice] = useState<number>();
	const router = useRouter();

	const handleChangePrice = (id: number) => {
		setSelectedPrice(id);
	};

	const onSuscribeClick = async () => {
		try {
			await axios.post("/api/suscribe", {
				suscriptorId: 1,
				productoId: product.id,
				periodoId: selectedPrice,
			});
			Swal.fire({
				position: "center",
				icon: "success",
				title: "Te has suscrito al producto!",
				showConfirmButton: false,
				timer: 2000,
			}).then(() => {
				router.push(`/producto/${product.id}`);
			});
		} catch {
			Swal.fire({
				position: "center",
				icon: "error",
				title: "Ha ocurrido un error, por favor inténtelo nuevamente.",
				showConfirmButton: false,
				timer: 2000,
			});
		}
	};

	return (
		<Layout>
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
						<Text color="gray.500">
							{product.categorias[0].categoria.nombre}
						</Text>
						<Heading>{product.nombre}</Heading>
						<Text>{product.detalles}</Text>
						<Divider my={4} />
						<SimpleGrid columns={2} gap={2}>
							{product.periodo.map((periodo) => (
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
						{!suscribed ? (
							<Button
								my="4"
								colorScheme={"green"}
								disabled={selectedPrice ? false : true}
								onClick={onSuscribeClick}
							>
								Suscribirse
							</Button>
						) : (
							<Button my="4" colorScheme={"red"} disabled>
								Ya estás suscrito a este producto
							</Button>
						)}
					</Flex>
				</GridItem>
			</Grid>
		</Layout>
	);
};

export default ProductDetails;
