import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "GET") {
		const id = req.query.id;
		if (typeof id === "string") {
			try {
				const producto = await prisma.producto.findFirst({
					where: { id: parseInt(id, 10) },
					include: {
						categorias: { include: { categoria: true } },
						images: true,
						periodo: true,
						vendedor: true,
					},
				});
				return res.json(producto);
			} catch (error) {
				return res.status(500).json(error);
			}
		}
	}

	if (req.method === "PUT") {
		const id = req.query.id;
		const data = req.body;

		if (typeof id === "string") {
			const producto = await prisma.producto.update({
				where: { id: parseInt(id, 10) },
				data: { ...data },
			});
			return res.status(200).json(producto);
		}
	}

	if (req.method === "DELETE") {
		const id = req.query.id;
		console.log(id);
		if (typeof id === "string") {
			const producto = await prisma.producto.findUnique({
				where: { id: parseInt(id, 10) },
				include: { images: true },
			});

			if (producto) {
				producto.images.forEach((image) => {
					try {
						const path = "./public/" + image.ruta;
						fs.unlinkSync(path);
					} catch (error) {
						console.log("Image does not exist");
					}
				});

				await prisma.periodo.deleteMany({ where: { productoId: producto.id } });
				await prisma.pertenece.deleteMany({
					where: { productoId: producto.id },
				});
				await prisma.image.deleteMany({ where: { productoId: producto.id } });
				await prisma.producto.delete({ where: { id: producto.id } });
			}
		}
		return res.status(404).json({ mensaje: "producto no existe" });
	}
}
