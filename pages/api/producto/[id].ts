import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { PrismaClient, Periodo, Image } from "@prisma/client";
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
		const id = req.query.id as string;
		const data = req.body;
		const categoriaId = req.body.categoriaId;
		const periodos = req.body.periodos as Periodo[];
		const imagenes = req.body.imagenes as Image[];

		if (categoriaId === undefined) {
			const producto = await prisma.producto.update({
				where: { id: parseInt(id, 10) },
				data: { activo: data.activo },
			});

			return res.status(200).json(producto);
		} else {
			if (categoriaId !== undefined) {
				await prisma.producto.update({
					where: { id: parseInt(id, 10) },
					data: {
						nombre: data.nombre,
						detalles: data.detalles,
						stock: data.stock,
					},
				});
			}

			await prisma.pertenece.updateMany({
				where: { productoId: parseInt(id, 10) },
				data: {
					categoriaId: parseInt(categoriaId),
				},
			});

			if (periodos !== undefined && periodos.length === 4) {
				await prisma.periodo.updateMany({
					where: { productoId: parseInt(id), duracion: "1" },
					data: {
						precio: periodos[0].precio,
					},
				});

				await prisma.periodo.updateMany({
					where: { productoId: parseInt(id), duracion: "3" },
					data: {
						precio: periodos[1].precio,
					},
				});

				await prisma.periodo.updateMany({
					where: { productoId: parseInt(id), duracion: "6" },
					data: {
						precio: periodos[2].precio,
					},
				});

				await prisma.periodo.updateMany({
					where: { productoId: parseInt(id), duracion: "12" },
					data: {
						precio: periodos[3].precio,
					},
				});
			}

			if (imagenes !== undefined) {
				const imagesArray = imagenes.map((img: any, i: number) => ({
					ruta: img,
					posicion: i,
				}));

				await prisma.image.deleteMany({
					where: { productoId: parseInt(id, 10) },
				});

				for (let i = 0; i < imagesArray.length; i++) {
					await prisma.image.create({
						data: {
							ruta: imagesArray[i].ruta,
							posicion: imagesArray[i].posicion,
							productoId: parseInt(id),
						},
					});
				}
			}

			return res.status(200).json({ mensaje: "producto editado" });
		}
	}

	if (req.method === "DELETE") {
		const id = req.query.id;

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

				return res
					.status(200)
					.json({ mensaje: "producto eliminado correctamente" });
			}
		}
		return res.status(404).json({ mensaje: "producto no existe" });
	}
}
