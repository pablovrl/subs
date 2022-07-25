import type { NextApiRequest, NextApiResponse } from "next";
import { Credencial } from "../../../config/db/models";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const credencial = await Credencial.create(req.body);
		return res.status(201).json(credencial);
	} catch (error) {
		return res.status(500).json(error);
	}
}
