import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		const { email, password } = req.body;
		const userArray = [];

		for (let i = 1; i < 3; i++) {
			const user = await prisma.credencial.findFirst({
				where: { id: i },
			});
			userArray.push(user);
		}

		if (email !== undefined && password !== undefined) {
			for (let i = 0; i < userArray.length; i++) {
				if (
					email === userArray[i]?.email &&
					password === userArray[i]?.password
				) {
          
					return res.status(200).json(userArray[i]);
				}
			}
		} else {
			return res.status(404).json({ mensaje: "usuario no existe" });
		}
		return res.status(404).json({ mensaje: "usuario no existe" });
	}
}
