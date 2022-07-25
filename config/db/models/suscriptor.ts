import { db } from "../database";
import { DataTypes } from "sequelize";

const Suscriptor = db.define(
	"suscriptor",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		nombreCompleto: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		rut: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{ timestamps: false }
);

export default Suscriptor;
