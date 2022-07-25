import type { NextApiRequest, NextApiResponse } from "next";
import { Categoria } from "../../../config/db/models";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		try {
			const categoria = await Categoria.create(req.body);
			return res.status(201).json(categoria);
		} catch (error) {
			return res.status(500).json(error);
		}
	} else {
		const categorias = await Categoria.findAll();
		return res.status(200).json(categorias);
	}
}
