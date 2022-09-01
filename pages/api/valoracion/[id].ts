import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "GET") {
		const productoId = req.query.id as string;
		try {
			const valoraciones = await prisma.valoracion.findMany({
				where: { suscribe: { productoId: parseInt(productoId, 10) } },
			});
			return res.json(valoraciones);
		} catch (error) {
			return res.status(500).json(error);
		}
	}
}
