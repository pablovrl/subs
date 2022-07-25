import type { NextApiRequest, NextApiResponse } from "next";
import { Vendedor } from "../../../config/db/models";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const vendedor = await Vendedor.create(req.body);
		return res.status(201).json(vendedor);
	} catch (error) {
		return res.status(500).json(error);
	}
}
