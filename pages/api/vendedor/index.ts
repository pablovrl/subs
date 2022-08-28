import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const vendedor = prisma.vendedor.findMany();
		return res.status(201).json(vendedor);
	} catch (error) {
		return res.status(500).json(error);
	}
}
