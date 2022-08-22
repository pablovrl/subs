import type { NextApiRequest, NextApiResponse } from "next";
import { Suscribe, Valoracion } from "../../../config/db/models";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "GET") {
		const valoraciones = await Valoracion.findAll();
		return res.status(200).json(valoraciones);
	} else if (req.method === "POST") {
		const { suscribeId, estrellas, titulo, comentario } = req.body;
		const valoracion = await Valoracion.create({
			suscribeId,
			estrellas,
			titulo,
			comentario,
		});
		return res.status(201).json(valoracion);
	}
}
