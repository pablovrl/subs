import { Dialect, Sequelize } from "sequelize";
import { Credencial } from "../db/models/index";

const dbConfig = {
	DB: process.env.DB || "",
	USER: process.env.DB_USER || "",
	PASS: process.env.DB_PASS,
	HOST: process.env.DB_HOST,
	DIALECT: "mysql" as Dialect,
};

const db = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASS, {
	host: dbConfig.HOST,
	dialect: dbConfig.DIALECT,
	logging: false,
});

const checkDatabaseConnection = async () => {
	try {
		await db.authenticate();
		console.log("Connection has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
};

const insertData = async () => {
	await db.sync();
	const crenciales = await Credencial.findAll();
	if (crenciales.length === 0) {
		await db.query(
			"INSERT INTO credencials VALUES (null, 'pablovillarroel135@gmail.com', 'colocolo123', 'cliente');"
		);
		await db.query(
			"INSERT INTO vendedors VALUES (1, 'Pablo Villarroel', 'Pablo Shop', null, 1);"
		);
		await db.query(
			"INSERT INTO categoria VALUES (null, 'Mascotas'), (null, 'Entretenimiento'), (null, 'Videojuegos'),  (null, 'Juegos de Mesa'), (null, 'Consumibles'), (null, 'Libros'), (null, 'Regalos'), (null, 'Baño y Belleza'), (null, 'Deporte'), (null, 'Adulto');"
		);
	}
};

insertData();
export { db, checkDatabaseConnection };
