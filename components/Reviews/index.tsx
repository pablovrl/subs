import React from "react";
import { Alert, AlertIcon, Box, Heading, Text } from "@chakra-ui/react";
import { Valoracion } from "../../interfaces/Valoraciones";
import StarsRating from "react-star-rate";

const Reviews = ({ valoraciones }: { valoraciones: Valoracion[] }) => {
	return (
		<Box>
			<Heading size="lg" my="4">
				Opiniones sobre el producto
			</Heading>
			{valoraciones.length === 0 ? (
				<Alert status="info">
					<AlertIcon />
					Aún no hay opiniones sobre el producto, suscríbete y deja la tuya para
					ayudar a otros compradores.{" "}
				</Alert>
			) : (
				<>
					{valoraciones.map((val) => (
						<Box key={val.id} mb={4} width="40rem">
							<StarsRating
								style={{
									style: { fontSize: "20px" },
								}}
								value={parseInt(val.estrellas, 10)}
								disabled={true}
							/>
							<Text fontWeight="bold">{val.titulo}</Text>
							<Text>{val.comentario}</Text>
						</Box>
					))}
				</>
			)}
		</Box>
	);
};

export default Reviews;
