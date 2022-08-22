import type { NextApiRequest, NextApiResponse } from "next";
import { Suscribe, Valoracion } from "../../../config/db/models";
import { Identifier } from "sequelize/types";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "GET") {
		const productoId = req.query.id as Identifier;
		try {
			const valoraciones = await Valoracion.findAll({
				include: {
					model: Suscribe,
					where: {
						productoId,
					},
				},
			});
			return res.json(valoraciones);
		} catch (error) {
			return res.status(500).json(error);
		}
	}
}
