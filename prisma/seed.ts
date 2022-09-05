import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
	const credencials = await prisma.credencial.createMany({
		data: [
			{
				email: "vendedor@vendedor.com",
				password: "vendedor",
				tipoUsuario: "vendedor",
			},
			{
				email: "cliente@cliente.com",
				password: "cliente",
				tipoUsuario: "cliente",
			},
		],
	});

	const seller = await prisma.vendedor.create({
		data: {
			nombreCompleto: "Pablo Villarroel",
			nombreTienda: "Pablo Shop",
			imagenTienda: "",
			credencialId: 1,
		},
	});

	const suscriptor = await prisma.suscriptor.create({
		data: {
			nombreCompleto: "Elvis Rodríguez",
			rut: "20255000-1",
			credencialId: 2,
		},
	});

	const categories = [
		"Mascotas",
		"Entretenimiento",
		"Videojuegos",
		"Juegos de Mesa",
		"Consumibles",
		"Libros",
		"Regalos",
		"Baño y Belleza",
		"Deporte",
		"Adulto",
	];

	const newCategories = await prisma.categoria.createMany({
		data: categories.map((el) => ({
			nombre: el,
		})),
	});

	console.log(credencials, seller, suscriptor, newCategories);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
