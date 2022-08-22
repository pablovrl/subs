import { GetServerSideProps, NextPage } from "next";
import React from "react";
import axios from "axios";
import Product from "../../interfaces/Product";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import Layout from "../../components/Layout";
import SelectPlan from "../../components/SelectPlan";
import Reviews from "../../components/Reviews";
import { Valoracion } from "../../interfaces/Valoraciones";

export const getServerSideProps: GetServerSideProps = async (context) => {
	const id = context.params?.id;
	const { data } = await axios.get(`/api/producto/${id}`);
	const suscribed = await axios.post("/api/suscribe/check", {
		suscriptorId: 1,
		productoId: id,
	});
	const valoraciones = await axios.get(`/api/valoracion/${id}`);

	if (!data) {
		return {
			notFound: true,
		};
	}
	return {
		props: {
			product: data,
			suscribed: suscribed.data.suscribed,
			valoraciones: valoraciones.data,
		},
	};
};

interface Props {
	product: Product;
	suscribed: boolean;
	valoraciones: Valoracion[];
}

const ProductDetails: NextPage<Props> = ({
	product,
	suscribed,
	valoraciones,
}) => {
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
				<SelectPlan product={product} suscribed={suscribed} />
			</Grid>
			<Reviews valoraciones={valoraciones} />
		</Layout>
	);
};

export default ProductDetails;
