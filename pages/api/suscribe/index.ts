import type { NextApiRequest, NextApiResponse } from "next";
import { Suscribe } from "../../../config/db/models";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		const { suscriptorId, productoId, periodoId } = req.body;
		const recordExists = await Suscribe.findOne({
			where: { suscriptorId, productoId },
		});

		if (recordExists)
			return res
				.status(400)
				.json({ messaeg: "can't suscribe twice to a product" });

		const record = await Suscribe.create({
			suscriptorId,
			productoId,
			periodoId,
		});

		return res.status(201).json(record);
	}
}
