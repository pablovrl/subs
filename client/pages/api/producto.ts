// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Producto from "../../config/db/models/producto";
import Categoria from "../../config/db/models/categoria";
import Vendedor from "../../config/db/models/vendedor";
import Image from "../../config/db/models/image";
import Periodo from "../../config/db/models/periodo";
import { Op } from "sequelize";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const categoryId = req.query.categoria;
	const search = req.query.nombre;

	if (categoryId) {
		const productos = await Producto.findAll({
			include: [
				{ model: Categoria, where: { id: categoryId } },
				Vendedor,
				Image,
			],
		});
		return res.json(productos);
	}

	if (search) {
		const productsByName = await Producto.findAll({
			include: [{ model: Categoria }, Vendedor, Image],
			where: {
				nombre: {
					[Op.substring]: `%${search}%`,
				},
			},
		});

		const productsByCategory = await Producto.findAll({
			include: [
				{
					model: Categoria,
					where: { nombre: { [Op.substring]: `%${search}%` } },
				},
				Vendedor,
				Image,
			],
		});

		const productos = [...productsByName, ...productsByCategory];
		return res.json(productos);
	}

	const productos = await Producto.findAll({
		include: [Categoria, Vendedor, Image, Periodo],
	});
	return res.json(productos);
}
