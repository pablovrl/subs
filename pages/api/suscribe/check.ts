import type { NextApiRequest, NextApiResponse } from "next";
import { Suscribe } from "../../../config/db/models";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		const { suscriptorId, productoId } = req.body;
		const recordExists = await Suscribe.findOne({
			where: { suscriptorId, productoId },
		});

		const suscribed = recordExists ? true : false;

		return res.status(200).json({ suscribed });
	}
}
