// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		const { nombre, detalles, stock, categoriaId, imagenes, periodos } =
			req.body;

		const useImages: string[] = imagenes;
		const usePeriodos: { duracion: string; precio: number }[] = periodos;

		const imagesArray = useImages.map((img: string, i) => ({
			ruta: img,
			posicion: i,
		}));

		const periodosArray = usePeriodos.map((periodo) => ({
			duracion: periodo.duracion,
			precio: periodo.precio,
		}));

		const newProducto = await prisma.producto.create({
			data: {
				nombre,
				detalles,
				stock,
				vendedor: { connect: { id: 1 } },
				categorias: { create: { categoria: { connect: { id: categoriaId } } } },
				images: { create: imagesArray },
				periodo: { create: periodosArray },
			},
		});
		return res.status(201).json(newProducto);
	}

	const categoryId = req.query.categoria;
	const search = req.query.nombre;

	if (categoryId && typeof categoryId === "string") {
		const productos = await prisma.producto.findMany({
			where: {
				categorias: { some: { categoriaId: parseInt(categoryId, 10) } },
			},
			include: {
				vendedor: true,
				images: true,
				categorias: true,
			},
		});
		return res.json(productos);
	}

	if (search && typeof search === "string") {
		const productos = await prisma.producto.findMany({
			where: {
				nombre: {
					contains: search,
				},
			},
			include: {
				categorias: true,
				vendedor: true,
				images: true,
			},
		});
		return res.json(productos);
	}

	const productos = await prisma.producto.findMany({
		include: { images: true, categorias: true, periodo: true, vendedor: true },
	});
	return res.json(productos);
}
