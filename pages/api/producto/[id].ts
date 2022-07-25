import type { NextApiRequest, NextApiResponse } from "next";
import {
	Vendedor,
	Categoria,
	Producto,
	Periodo,
	Image
} from "../../../config/db/models";
import { Identifier } from "sequelize/types";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const id = req.query.id as Identifier;
	try {
		const producto = await Producto.findByPk(id, {
			include: [Categoria, Vendedor, Image, Periodo],
		});
		return res.json(producto);
	} catch (error) {
		return res.status(500).json(error);
	}
}
