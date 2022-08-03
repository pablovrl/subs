import type { NextApiRequest, NextApiResponse } from "next";
import {
	Vendedor,
	Categoria,
	Producto,
	Periodo,
	Image,
} from "../../../config/db/models";
import { Identifier } from "sequelize/types";
import fs from "fs";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "GET") {
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

	if (req.method === "DELETE") {
		const id = req.query.id as Identifier;
		try {
			const producto: any = await Producto.findByPk(id, {
				include: [Image],
			});

			producto.images.forEach((element: any) => {
				try {
					const path = "./public/" + element.ruta;
					fs.unlinkSync(path);
				} catch (error) {
					console.error("la imagen no existe");
				}
			});

			await producto.destroy();

			return res.json({ mensaje: "producto eliminado correctamente" });
		} catch (error) {
			return res.status(404).json({ mensaje: "producto no existe" });
		}
	}
}
