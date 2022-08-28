import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		const { suscriptorId, productoId, periodoId } = req.body;
		const recordExists = await prisma.suscribe.findFirst({
			where: { suscriptorId, productoId },
		});
		// const recordExists = await Suscribe.findOne({
		// 	where: { suscriptorId, productoId },
		// });

		if (recordExists)
			return res
				.status(400)
				.json({ messaeg: "can't suscribe twice to a product" });

		const record = await prisma.suscribe.create({
			data: {
				periodoId,
				suscriptorId,
				productoId,
			},
		});
		return res.status(201).json(record);
	}
}
