import { Dialect, Sequelize } from "sequelize";
const dbConfig = {
  DB: "G11taller_bd",
  USER: "G11taller",
  PASS: "G11taller1097",
  HOST: "mysqltrans.face.ubiobio.cl",
  DIALECT: "mysql" as Dialect,
};

const db = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASS, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
});

const checkDatabaseConnection = async () => {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { db, checkDatabaseConnection };
