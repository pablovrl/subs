import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		const { suscriptorId, productoId } = req.body;
		const recordExists = await prisma.suscribe.findFirst({
			where: {
				suscriptorId: parseInt(suscriptorId, 10),
				productoId: parseInt(productoId, 10),
			},
		});

		if (recordExists)
			return res.status(200).json({ suscribed: recordExists.id });
		return res.status(200).json({ suscribed: false });
	}
}
