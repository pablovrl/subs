import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "GET") {
		const valoraciones = await prisma.valoracion.findMany();
		return res.status(200).json(valoraciones);
	} else if (req.method === "POST") {
		const { suscribeId, estrellas, titulo, comentario } = req.body;
		const valoracion = await prisma.valoracion.create({
			data: {
				estrellas,
				titulo,
				comentario,
				suscribe: { connect: { id: suscribeId } },
			},
		});
		return res.status(201).json(valoracion);
	}
}
