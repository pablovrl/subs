import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		try {
			return res.status(201).json({});
		} catch (error) {
			return res.status(500).json(error);
		}
	} else {
		const categorias = await prisma.categoria.findMany();
		return res.status(200).json(categorias);
	}
}
