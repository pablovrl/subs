// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
	Producto,
	Categoria,
	Vendedor,
	Image,
	Periodo,
	Pertenece,
} from "../../../config/db/models";
import { Op } from "sequelize";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		const { nombre, detalles, stock, categoriaId, imagenes, periodos } =
			req.body;

		const producto = {
			nombre,
			detalles,
			stock,
		};

		try {
			const newProducto: any = await Producto.create({
				...producto,
				vendedorId: 1,
			});
			await Pertenece.create({
				categoriumId: categoriaId,
				productoId: newProducto.id,
			});

			imagenes.forEach((img: string, i: number) => {
				Image.create({
					ruta: img,
					posicion: i + 1,
					productoId: newProducto.id,
				});
			});

			if (periodos) {
				periodos.forEach((periodo: { duracion: string; precio: number }) => {
					Periodo.create({
						duracion: periodo.duracion,
						precio: periodo.precio,
						productoId: newProducto.id,
					});
				});
			}

			return res.status(201).json(newProducto);
		} catch (error) {
			return res.status(500).json(error);
		}
	}

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
